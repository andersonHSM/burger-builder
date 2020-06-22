import { AxiosInstance } from 'axios';

export default interface BurgerBuilderMappedProps {
  addIngredient: (type: string, qtd: number) => void;
  removeIngredient: (ingredient: string) => void;
  initIngredients: (axios: AxiosInstance) => void;
  ingredients: { [key: string]: number };
  price: number;
}
