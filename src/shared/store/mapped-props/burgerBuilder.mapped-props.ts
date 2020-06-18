export default interface BurgerBuilderMappedProps {
  addIngredient: (type: string, qtd: number) => void;
  ingredients: { [key: string]: number };
  price: number;
}
