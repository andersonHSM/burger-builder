export default interface BurgerBuildState {
  ingredients: {
    salad: number;
    cheese: number;
    meat: number;
    bacon: number;
    [key: string]: number | boolean;
  };
  total: number;
}
