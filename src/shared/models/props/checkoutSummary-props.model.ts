export default interface CheckoutSummaryProps {
  onCheckoutCancelled: () => void;
  onCheckoutConfirmed: () => void;
  ingredients: { [key: string]: number };
}
