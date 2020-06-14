import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { clone } from 'ramda';
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

const INGREDIENTS_COSTS: { [key: string]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component<RouteComponentProps> {
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
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.total,
    //   costumer: {
    //     name: 'Anderson',
    //     address: {
    //       street: 'Tv Santa Isabel',
    //       number: 667,
    //       code: '49900-000',
    //     },
    //     email: 'anderson@mail.com',
    //   },
    //   deliveryMode: 'fastest',
    // };

    // axios
    //   .post('/orders.json', order)
    //   .then((response) => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false, purchasing: false });
    //   });
    let ingredientsQueryParams = Object.entries(this.state.ingredients).map(([ig, qtd]) => {
      return encodeURIComponent(ig) + '=' + encodeURIComponent(qtd);
    });

    ingredientsQueryParams = ingredientsQueryParams.concat(`price=${this.state.total}`);

    this.props.history.push({
      pathname: '/checkout',
      search: `?${ingredientsQueryParams.join('&')}`,
    });
  };

  render() {
    const { ingredients } = this.state;
    const disabledInfo: { [key in keyof BurgerBuildState['ingredients']]: number | boolean } = {
      ...ingredients,
    };

    for (let key in ingredients) {
      disabledInfo[key] = ingredients[key] <= 0;
    }

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

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            onAdd={this.addIngredientHandler}
            onRemove={this.removeIngredientHandler}
            onOrderClick={() => this.setState({ purchasing: true })}
            disabled={disabledInfo}
            price={this.state.total}
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

export default withErrorHandler(BurgerBuilder, axios);
