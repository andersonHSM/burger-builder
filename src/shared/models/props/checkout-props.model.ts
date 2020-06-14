import { ReactNode } from 'react';

import { IngredientsTypes } from './ingredients-props.model';

export default interface CheckoutProps {
  children?: ReactNode;
  ingredients: { [key in IngredientsTypes]: number };
}
