export default interface BuildControlProps {
  label: string;
  onMoreClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onLessClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
