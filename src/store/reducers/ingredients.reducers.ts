import { ADD_INGREDIENT } from 'store/actions/ingredients.actions';
import IngredientsActions from 'shared/store/ingredientsActions';
import { clone } from 'ramda';

const INGREDIENTS_COSTS: { [key: string]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialIngredientsState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
  },
  price: 4,
};

const ingredients = (state = {} as any, action: IngredientsActions) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      const newState = { ...state };
      newState[action.ingredient.type] = newState[action.ingredient.type]
        ? +newState[action.ingredient.type] + action.ingredient.qtd
        : 1;
      return newState;

    default:
      return state;
  }
};

const price = (
  ingredients: { [key: string]: number },
  totalPrice: number,
  action: IngredientsActions
): number => {
  switch (action.type) {
    case ADD_INGREDIENT:
      totalPrice += INGREDIENTS_COSTS[action.ingredient.type];
      return totalPrice;
    default:
      return totalPrice;
  }
};

const ingredientsReducer = (state = initialIngredientsState, action: IngredientsActions) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      const newState = clone(state);
      newState.ingredients = ingredients(state.ingredients, action);
      newState.price = price(newState.ingredients, newState.price, action);

      return newState;
    default:
      return state;
  }
};

export default ingredientsReducer;
