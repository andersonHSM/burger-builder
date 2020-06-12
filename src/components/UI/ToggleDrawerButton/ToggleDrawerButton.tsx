import React from 'react';

import styles from './ToggleDrawerButton.module.css';

const ToggleDrawerButton = (props: { clicked: () => void }) => (
  <button onClick={props.clicked} className={styles['ToggleDrawerButton']}>
    <i className='fas fa-hamburger fa-xl'></i>
  </button>
);

export default ToggleDrawerButton;
