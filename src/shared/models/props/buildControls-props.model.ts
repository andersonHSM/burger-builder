import { IngredientsTypes } from './ingredients-props.model';
import BurgerBuildState from '../states/burgerBuilder-state.model';

export default interface BuildControlsProps {
  onAdd: (type: IngredientsTypes) => void;
  onRemove: (type: IngredientsTypes) => void;
  onOrderClick: () => void;
  disabled: { [key in keyof BurgerBuildState['ingredients']]: number | boolean };
  price: number;
  purchasable: boolean;
}
