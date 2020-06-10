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
        disableControl={props.disabled[controlInfo.type]}
        onLessClick={() => props.onRemove(controlInfo.type)}
        onMoreClick={() => props.onAdd(controlInfo.type)}
        key={controlInfo.type + index}
        label={controlInfo.label}
      />
    );
  });
  return <div className={styles['BuildControls']}>{transformedControls}</div>;
};

export default BuildControls;
