import React, { Component } from 'react';
import { clone } from 'ramda';
import axios from 'axios-orders';

import Aux from 'hoc/Aux/Aux';
import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';

import BurgerBuildState from 'shared/models/states/burgerBuilder-state.model';
import { IngredientsTypes } from 'shared/models/props/ingredients-props.model';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_COSTS: { [key: string]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state: BurgerBuildState;
  constructor(props: any) {
    super(props);

    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      total: 4,
      purchasable: false,
      purchasing: false,
    };
  }

  checkIfPurchasable = () => {
    const ingredients = clone(this.state.ingredients);

    const ingredientsSum = Object.values(ingredients).reduce((count, value) => count + value, 0);
    ingredientsSum > 0
      ? this.setState({ purchasable: true })
      : this.setState({ purchasable: false });
  };

  addIngredientHandler = (type: IngredientsTypes) => {
    const clonedState = clone(this.state);

    const ingredientCountUpdated = clonedState.ingredients[type] + 1;
    clonedState.ingredients[type] = ingredientCountUpdated;

    clonedState.total += INGREDIENTS_COSTS[type];

    this.setState({ ...clonedState }, () => {
      this.checkIfPurchasable();
    });
  };

  removeIngredientHandler = (type: IngredientsTypes) => {
    if (this.state.ingredients[type] > 0) {
      const clonedState = clone(this.state);

      const ingredientCountUpdated = clonedState.ingredients[type] - 1;
      clonedState.ingredients[type] = ingredientCountUpdated;
      clonedState['total'] -= INGREDIENTS_COSTS[type];

      this.setState({ ...clonedState }, () => {
        this.checkIfPurchasable();
      });
    }
  };

  handleCanceling = () => {
    this.setState({ purchasing: false });
  };

  handleConfirm = () => {
    // window.alert('Confirmed');
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.total,
      costumer: {
        name: 'Anderson',
        address: {
          street: 'Tv Santa Isabel',
          number: 667,
          code: '49900-000',
        },
        email: 'anderson@mail.com',
      },
      deliveryMode: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  render() {
    const { ingredients } = this.state;
    const disabledInfo: { [key in keyof BurgerBuildState['ingredients']]: number | boolean } = {
      ...ingredients,
    };

    for (let key in ingredients) {
      disabledInfo[key] = ingredients[key] <= 0;
    }

    return (
      <Aux>
        <Modal closeModal={() => this.handleCanceling()} visible={this.state.purchasing}>
          <OrderSummary
            showSummary={this.state.purchasing}
            onCancel={this.handleCanceling}
            onConfirm={this.handleConfirm}
            ingredients={this.state.ingredients}
            totalPrice={this.state.total}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onAdd={this.addIngredientHandler}
          onRemove={this.removeIngredientHandler}
          onOrderClick={() => this.setState({ purchasing: true })}
          disabled={disabledInfo}
          price={this.state.total}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
