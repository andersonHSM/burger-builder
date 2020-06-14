import React, { Component } from 'react';
import axios from 'axios-orders';

import Order from 'components/Order/Order';
import withErrorHandler from 'hoc/withErrorHandler.tsx/withErrorHandler';
import OrdersState from 'shared/models/states/orders-state.model';
import OrderType from 'shared/models/types/order-type.model';
import Spinner from 'components/UI/Spinner/Spinner';

class Orders extends Component {
  state: OrdersState = {
    orders: null,
    loading: true,
  };

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = () => {
    axios
      .get<{ id: any; order: OrderType }>('/orders.json')
      .then((response) => {
        const orders = Object.entries(response.data).map(([id, order]) => {
          return { ...order, id };
        });
        this.setState({ orders, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let orders = null;

    if (!this.state.orders && this.state.loading) {
      orders = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner />
        </div>
      );
    }
    if (this.state.orders) {
      orders = this.state.orders.map((order) => {
        return <Order key={order.id} order={order} />;
      });
    }

    return <div>{orders}</div>;
  }
}
export default withErrorHandler(Orders, axios);
