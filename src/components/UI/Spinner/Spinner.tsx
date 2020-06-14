import React from 'react';

import styles from './Spinner.module.css';

const Spinner = (props: { size?: string; color?: string }) => (
  <div style={{ width: props.size, height: props.size }} className={styles['Spinner']}></div>
);

export default Spinner;
