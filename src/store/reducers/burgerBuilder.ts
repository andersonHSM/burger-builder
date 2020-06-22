import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_INGREDIENTS_TO_STORE,
} from 'store/actions/actionsTypes';
import IngredientsActions from 'shared/store/ingredientsActions';
import { clone } from 'ramda';
import IngredientsReducer from 'shared/store/ingredientsReducer';

const INGREDIENTS_COSTS: { [key: string]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialIngredientsState: IngredientsReducer = {
  ingredients: {},
  price: 4,
};

const ingredients = (state = {} as any, action: IngredientsActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const newState = { ...state };
      newState[action.ingredient.type] = newState[action.ingredient.type]
        ? +newState[action.ingredient.type] + action.ingredient.qtd!
        : 1;
      return newState;
    }
    case REMOVE_INGREDIENT: {
      const newState = { ...state };
      if (newState[action.ingredient.type] && newState[action.ingredient.type] > 0) {
        newState[action.ingredient.type] -= 1;
      }

      return newState;
    }

    default:
      return state;
  }
};

const price = (totalPrice: number, action: IngredientsActions): number => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      totalPrice += INGREDIENTS_COSTS[action.ingredient.type];
      return totalPrice;
    }
    case REMOVE_INGREDIENT: {
      totalPrice -= INGREDIENTS_COSTS[action.ingredient.type];

      return totalPrice;
    }
    default:
      return totalPrice;
  }
};

const ingredientsReducer = (state = initialIngredientsState, action: IngredientsActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const newState = clone(state);
      newState.ingredients = ingredients(state.ingredients, action);
      newState.price = price(newState.price, action);

      return newState;
    }
    case REMOVE_INGREDIENT: {
      const newState = clone(state);
      newState.ingredients = ingredients(newState.ingredients, action);
      newState.price = price(newState.price, action);
      return newState;
    }
    case ADD_INGREDIENTS_TO_STORE: {
      const newState = clone(state);

      newState.ingredients = action.ingredients;

      return newState;
    }

    default:
      return state;
  }
};

export default ingredientsReducer;