import React from 'react';

import styles from './OrderSummary.module.css';

import OrderSummaryProps from 'shared/models/props/orderSummary-props.model';
import Button from 'components/UI/Button/Button';

const OrderSummary = (props: OrderSummaryProps) => {
  const ingredientSummary = props.ingredients;

  const items = Object.entries(ingredientSummary).map(([ingredient, qtd]) => {
    return (
      <li key={ingredient}>
        <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{ingredient}</span>: {qtd}
      </li>
    );
  });

  return (
    <div className={styles['OrderSummary']}>
      <h1>Order Summary</h1>
      <p>A delicious burger with the following ingredients:</p>
      <div className={styles['IngList']}>
        <ul>{items}</ul>
      </div>
      <p>
        Total Price:{' '}
        <strong>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
            props.totalPrice
          )}
        </strong>
      </p>
      <p>Continue to checkout?</p>
      <div className={styles['ButtonWrapper']}>
        <Button type='Success' clicked={props.onConfirm}>
          Continue
        </Button>
        <Button type='Danger' clicked={props.onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
