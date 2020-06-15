import React from 'react';

import styles from './Button.module.css';

const Button = (props: {
  disable?: boolean;
  type: string;
  children?: any;
  clicked: (event?: any) => void;
}) => {
  const classesArray = [styles['Button'], styles[props.type]];
  return (
    <button disabled={props.disable} className={classesArray.join(' ')} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
