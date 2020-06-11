import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = (props: any) => (
  <div onClick={props.closeBackdrop} className={styles['Backdrop']}></div>
);

export default Backdrop;
