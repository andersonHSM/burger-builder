import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import ControlInterface from 'shared/models/buildControl-control.model';

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

const BuildControls = (props: any) => {
  const transformedControls = controls.map((controlInfo: ControlInterface, index) => {
    return <BuildControl key={controlInfo.type + index} label={controlInfo.label} />;
  });
  return <div className={styles['BuildControls']}>{transformedControls}</div>;
};

export default BuildControls;
