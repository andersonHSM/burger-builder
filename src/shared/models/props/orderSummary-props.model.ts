import { IngredientsTypes } from './ingredients-props.model';

export default interface OrderSummaryProps {
  onCancel: () => void;
  onConfirm: () => void;
  ingredients: {
    [key in IngredientsTypes]: number;
  };
  totalPrice: number;
  showSummary: boolean;
}
