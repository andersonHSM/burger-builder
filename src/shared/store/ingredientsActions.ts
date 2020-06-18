export default interface IngredientsActions {
  type: string;
  ingredient: { [key: string]: number | string; type: string; qtd: number };
}
