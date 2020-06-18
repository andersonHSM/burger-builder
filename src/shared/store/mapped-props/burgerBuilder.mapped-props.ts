export default interface BurgerBuilderMappedProps {
  addIngredient: (type: string, qtd: number) => void;
  removeIngredient: (ingredient: string) => void;
  ingredients: { [key: string]: number };
  price: number;
}
