import { IngredientsTypes } from './ingredients-props.model';

export interface BurgerProps {
  ingredients: {
    [key in IngredientsTypes]: number;
  };
}
