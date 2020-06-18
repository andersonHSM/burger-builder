import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutProps from 'shared/models/props/checkout-props.model';
import { RouteComponentProps, Route } from 'react-router-dom';

import CheckoutState from 'shared/models/states/checkout-state.model';
import { Ingredients } from 'shared/models/props/ingredients-props.model';
import ContactData from './ContactData/ContactData';
import IngredientsReducer from 'shared/store/ingredientsReducer';

class Checkout extends Component<IngredientsReducer & CheckoutProps & RouteComponentProps> {
  state: CheckoutState = {
    ingredients: {} as Ingredients,
    totalPrice: 0,
  };

  componentDidMount() {
    if (!this.props.ingredients || !(Object.keys(this.props.ingredients).length > 0)) {
      this.props.history.replace('/');
    }
  }

  checkoutConfirmedHandler = () => {
    const { path } = this.props.match;
    this.props.history.push({ pathname: `${path}/contact-data` });
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          onCheckoutConfirmed={this.checkoutConfirmedHandler}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          ingredients={this.props.ingredients}
        />

        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData {...props} price={this.props.price} ingredients={this.props.ingredients} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IngredientsReducer) => state;

export default connect(mapStateToProps)(Checkout);
