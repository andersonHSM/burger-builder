import React from 'react';

import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props: any) => {
  return (
    <>
      {props.visible ? <Backdrop closeBackdrop={props.closeModal} /> : null}
      <div
        style={{
          transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.visible ? '1' : '0',
        }}
        className={styles['Modal']}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
