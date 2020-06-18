import { IngredientsTypes } from './ingredients-props.model';

export default interface BuildControlsProps {
  ingredients: { [key: string]: number };
  onAdd: (type: IngredientsTypes) => void;
  onRemove: (type: IngredientsTypes) => void;
  onOrderClick: () => void;
  price: number;
  purchasable: boolean;
}
