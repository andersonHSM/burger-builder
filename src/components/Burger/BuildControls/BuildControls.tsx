import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import ControlInterface from 'shared/models/buildControl-control.model';
import BuildControlsProps from 'shared/models/props/buildControls-props.model';

const controls: ControlInterface[] = [
  {
    label: 'Salad',
    type: 'salad',
  },
  {
    label: 'Cheese',
    type: 'cheese',
  },
  {
    label: 'Bacon',
    type: 'bacon',
  },
  {
    label: 'Meat',
    type: 'meat',
  },
];

const BuildControls = (props: BuildControlsProps) => {
  const transformedControls = controls.map((controlInfo: ControlInterface, index) => {
    return (
      <BuildControl
        disableControl={
          !props.ingredients[controlInfo.type] || props.ingredients[controlInfo.type] <= 0
        }
        onLessClick={() => props.onRemove(controlInfo.type)}
        onMoreClick={() => props.onAdd(controlInfo.type)}
        key={controlInfo.type + index}
        label={controlInfo.label}
      />
    );
  });
  return (
    <div className={styles['BuildControls']}>
      <p>
        Current Price:{' '}
        <strong>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
            props.price
          )}
        </strong>
      </p>
      {transformedControls}

      <button
        onClick={props.onOrderClick}
        disabled={!props.purchasable}
        className={styles['OrderButton']}
      >
        Order Now
      </button>
    </div>
  );
};

export default BuildControls;
