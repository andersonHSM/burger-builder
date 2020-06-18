import {} from './ingredients-props.model';

export interface BurgerProps {
  ingredients: {
    [key: string]: number;
  };
}
