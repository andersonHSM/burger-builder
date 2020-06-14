import React from 'react';

import styles from './CheckoutSummary.module.css';

import Burger from 'components/Burger/Burger';
import Button from 'components/UI/Button/Button';

import CheckoutSummaryProps from 'shared/models/props/checkoutSummary-props.model';

const CheckoutSummary = (props: CheckoutSummaryProps) => {
  return (
    <div className={styles['CheckoutSummary']}>
      <h1>Hope it tastes well.</h1>
      <div style={{ display: 'flex', width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>

      <div>
        <Button type='Danger' clicked={props.onCheckoutCancelled}>
          Cancel
        </Button>
        <Button type='Success' clicked={props.onCheckoutConfirmed}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
