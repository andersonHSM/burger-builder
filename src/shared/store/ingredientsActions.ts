export default interface IngredientsActions {
  type: string;
  ingredient: { [key: string]: number | string | undefined; type: string; qtd?: number };
}
