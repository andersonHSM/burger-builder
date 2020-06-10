export type IngredientsTypes = 'meat' | 'cheese' | 'salad' | 'bacon';

export interface IngredientsProps {
  type: IngredientsTypes | 'bread-bottom' | 'bread-top';
}
