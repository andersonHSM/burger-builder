import { Ingredients } from './ingredients-props.model';

export default interface ContactDataProps {
  ingredients: { [key: string]: number };
  price: number;
}
