import { IngredientsTypes } from './ingredients-props.model';

export default interface CheckoutSummaryProps {
  onCheckoutCancelled: () => void;
  onCheckoutConfirmed: () => void;
  ingredients: { [key in IngredientsTypes]: number };
}
