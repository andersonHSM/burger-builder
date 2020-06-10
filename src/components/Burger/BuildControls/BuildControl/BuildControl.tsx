import React from 'react';

import styles from './BuildControl.module.css';

import BuildControlProps from 'shared/models/props/buildControl-props.model';

const BuildControl = (props: BuildControlProps) => {
  return (
    <div className={styles['BuildControl']}>
      <div className={styles['Label']}>{props.label}</div>
      <button onClick={props.onLessClick} className={styles['Less']}>
        Less
      </button>
      <button onClick={props.onMoreClick} className={styles['More']}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
