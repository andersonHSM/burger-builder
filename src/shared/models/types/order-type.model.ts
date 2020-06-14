import { Ingredients } from '../props/ingredients-props.model';

type OrderType = {
  id: any;
  totalPrice: number;
  ingredients: Ingredients;
  costumer: any;
  deliveryMode: string;
};

export default OrderType;
