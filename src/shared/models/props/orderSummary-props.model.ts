export default interface OrderSummaryProps {
  onCancel: () => void;
  onConfirm: () => void;
  ingredients: {
    [key: string]: number;
  };
  totalPrice: number;
  showSummary: boolean;
}
