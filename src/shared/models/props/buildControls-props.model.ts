import { IngredientsTypes } from './ingredients-props.model';
import BurgerBuildState from '../states/burgerBuilder-state.model';

export default interface BuildControlsProps {
  onAdd: (type: IngredientsTypes) => void;
  onRemove: (type: IngredientsTypes) => void;
  disabled: { [key in keyof BurgerBuildState['ingredients']]: boolean };
}
