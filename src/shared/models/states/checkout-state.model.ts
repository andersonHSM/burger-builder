import { Ingredients } from '../props/ingredients-props.model';

export default interface CheckoutState {
  ingredients: Ingredients;
  totalPrice: number;
}
