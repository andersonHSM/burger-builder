export default interface BurgerBuildState {
  ingredients: {
    salad: number;
    cheese: number;
    meat: number;
    bacon: number;
    [key: string]: number;
  };
  total: number;
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
}
