import React, { Component } from 'react';
import { clone } from 'ramda';

import Aux from 'hoc/Aux';
import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';

import BurgerBuildState from 'shared/models/states/burgerBuilder-state.model';
import { IngredientsTypes } from 'shared/models/props/ingredients-props.model';

const INGREDIENTS_COSTS: { [key: string]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state: BurgerBuildState = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    total: 4,
  };

  addIngredientHandler = (type: IngredientsTypes) => {
    const clonedState = clone(this.state);

    const ingredientCountUpdated = clonedState.ingredients[type] + 1;
    clonedState.ingredients[type] = ingredientCountUpdated;

    clonedState.total += INGREDIENTS_COSTS[type];

    this.setState({ ...clonedState }, () => console.log(this.state));
  };

  removeIngredientHandler = (type: IngredientsTypes) => {};

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls onAdd={this.addIngredientHandler} onRemove={this.removeIngredientHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
