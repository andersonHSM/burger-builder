import React from 'react';

import styles from './Order.module.css';
import OrderType from 'shared/models/types/order-type.model';

const Order = (props: { order: OrderType }) => {
  const ingredientsList = Object.entries(props.order.ingredients).map(([ig, qtd], index) => (
    <span style={{ textTransform: 'capitalize' }} key={ig + index}>
      {ig} - {`${qtd} `}
    </span>
  ));
  return (
    <div className={styles['Order']}>
      <div>
        <p>Ingredients: {ingredientsList}</p>
        <p>
          Price:
          <strong>
            {' ' +
              new Intl.NumberFormat('pt-BR', {
                currency: 'BRL',
                style: 'currency',
                currencyDisplay: 'symbol',
              }).format(props.order.totalPrice)}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Order;
