import { IngredientsTypes } from './ingredients-props.model';

export default interface BuildControlsProps {
  onAdd: (type: IngredientsTypes) => void;
  onRemove: (type: IngredientsTypes) => void;
  onOrderClick: () => void;
  disabled: { [key: string]: number | boolean };
  price: number;
  purchasable: boolean;
}
