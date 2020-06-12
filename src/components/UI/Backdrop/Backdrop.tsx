import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = (props: { closeBackdrop: () => void; show: boolean }) =>
  props.show ? <div onClick={props.closeBackdrop} className={styles['Backdrop']}></div> : null;

export default Backdrop;
