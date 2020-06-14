import OrderType from '../types/order-type.model';

export default interface OrdersState {
  orders: null | OrderType[];
  loading: boolean;
}
