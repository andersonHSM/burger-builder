import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { clone } from 'ramda';
import { connect } from 'react-redux';
import axios from 'axios-orders';

import Aux from 'hoc/Aux/Aux';
import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';

import BurgerBuildState from 'shared/models/states/burgerBuilder-state.model';
import { IngredientsTypes } from 'shared/models/props/ingredients-props.model';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler.tsx/withErrorHandler';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from 'store/actions/ingredients.actions';
import BurgerBuilderMappedProps from 'shared/store/mapped-props/burgerBuilder.mapped-props';

class BurgerBuilder extends Component<BurgerBuilderMappedProps & RouteComponentProps> {
  state: BurgerBuildState;
  constructor(props: any) {
    super(props);

    this.state = {
      ingredients: null as any,
      total: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    type Ingredients = BurgerBuildState['ingredients'];
    axios
      .get<Ingredients>('/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  checkIfPurchasable = () => {
    const ingredients = clone(this.props.ingredients);

    const ingredientsSum = Object.values(ingredients).reduce((count, value) => count + value, 0);
    ingredientsSum > 0
      ? this.setState({ purchasable: true })
      : this.setState({ purchasable: false });
  };

  addIngredientHandler = (type: IngredientsTypes) => {
    this.props.addIngredient(type, 1);
    // const clonedState = clone(this.state);
    // const ingredientCountUpdated = clonedState.ingredients[type] + 1;
    // clonedState.ingredients[type] = ingredientCountUpdated;
    // clonedState.total += INGREDIENTS_COSTS[type];
    // this.setState({ ...clonedState }, () => {
    //   this.checkIfPurchasable();
    // });
  };

  removeIngredientHandler = (type: IngredientsTypes) => {
    this.props.removeIngredient(type);
    // if (this.state.ingredients[type] > 0) {
    //   const clonedState = clone(this.state);
    //   const ingredientCountUpdated = clonedState.ingredients[type] - 1;
    //   clonedState.ingredients[type] = ingredientCountUpdated;
    //   clonedState['total'] -= INGREDIENTS_COSTS[type];
    //   this.setState({ ...clonedState }, () => {
    //     this.checkIfPurchasable();
    //   });
    // }
  };

  handleCanceling = () => {
    this.setState({ purchasing: false });
  };

  handleConfirm = () => {
    let ingredientsQueryParams = Object.entries(this.state.ingredients).map(([ig, qtd]) => {
      return encodeURIComponent(ig) + '=' + encodeURIComponent(qtd);
    });

    ingredientsQueryParams = ingredientsQueryParams.concat(`price=${this.props.price}`);

    this.props.history.push({
      pathname: '/checkout',
      search: `?${ingredientsQueryParams.join('&')}`,
    });
  };

  render() {
    const summary =
      this.state.loading || !this.state.ingredients ? (
        <Spinner />
      ) : (
        <OrderSummary
          showSummary={this.state.purchasing}
          onCancel={this.handleCanceling}
          onConfirm={this.handleConfirm}
          ingredients={this.state.ingredients}
          totalPrice={this.state.total}
        />
      );

    let burger = this.state.error ? (
      <p>Couldn't reach the server.</p>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
        <Spinner />/
      </div>
    );

    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients as any} />
          <BuildControls
            ingredients={this.props.ingredients}
            onAdd={this.addIngredientHandler}
            onRemove={this.removeIngredientHandler}
            onOrderClick={() => this.setState({ purchasing: true })}
            price={this.props.price}
            purchasable={this.state.purchasable}
          />
        </>
      );
    }

    return (
      <Aux>
        <Modal closeModal={this.handleCanceling} visible={this.state.purchasing}>
          {summary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state: any) => {
  return state;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addIngredient: (type: string, qtd: number) =>
      dispatch({ type: ADD_INGREDIENT, ingredient: { type, qtd } }),
    removeIngredient: (type: string) => dispatch({ type: REMOVE_INGREDIENT, ingredient: { type } }),
  };
};

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios);
