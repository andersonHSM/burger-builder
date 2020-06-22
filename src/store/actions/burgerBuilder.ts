import * as actionTypes from './actionsTypes';
import { AxiosInstance } from 'axios';
import { Dispatch } from 'redux';
import { Ingredients } from 'shared/models/props/ingredients-props.model';

export const addIngredient = (type: string, qtd: number) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: { type, qtd },
  };
};

export const removeIngredient = (type: string) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: { type },
  };
};

export const addIngredientsToStore = (ingredients: { [key: string]: number }) => {
  return {
    type: actionTypes.ADD_INGREDIENTS_TO_STORE,
    ingredients,
  };
};

export const initIngredients = (axios: AxiosInstance) => {
  return (dispatch: Dispatch) => {
    return axios
      .get<Ingredients>('/ingredients.json')
      .then((response) => {
        dispatch(addIngredientsToStore(response.data));
      })
      .catch(() => {});
  };
};
