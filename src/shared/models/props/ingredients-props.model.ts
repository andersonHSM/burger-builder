export type IngredientsTypes = 'meat' | 'cheese' | 'salad' | 'bacon';

export type Ingredients = { [key in IngredientsTypes]: number };

export interface IngredientsProps {
  type: IngredientsTypes | 'bread-bottom' | 'bread-top';
}
