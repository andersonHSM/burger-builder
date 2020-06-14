import React, { Component } from 'react';
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutProps from 'shared/models/props/checkout-props.model';
import { RouteComponentProps, Route } from 'react-router-dom';

import CheckoutState from 'shared/models/states/checkout-state.model';
import { Ingredients } from 'shared/models/props/ingredients-props.model';
import ContactData from './ContactData/ContactData';

class Checkout extends Component<CheckoutProps & RouteComponentProps> {
  state: CheckoutState = {
    ingredients: {} as Ingredients,
    totalPrice: 0,
  };

  componentDidMount() {
    const params = this.props.location.search;

    if (!params) {
      this.props.history.replace('/');
    }
    let ingredients = {};
    let totalPrice = 0;
    params
      .slice(1)
      .split('&')
      .forEach((param) => {
        const [prop, value] = param.split('=');
        if (prop !== 'price') {
          ingredients = { ...ingredients, [prop]: value };
        } else {
          totalPrice = +value;
        }
      });
    this.setState({ ingredients, totalPrice });
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
          ingredients={this.state.ingredients}
        />

        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              {...props}
              price={this.state.totalPrice}
              ingredients={this.state.ingredients}
            />
          )}
        />
      </div>
    );
  }
}
export default Checkout;
