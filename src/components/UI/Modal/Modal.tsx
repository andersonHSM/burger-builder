import React, { Component } from 'react';

import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import ModalProps from 'shared/models/props/modal-props.model';

class Modal extends Component<ModalProps> {
  shouldComponentUpdate(nextProps: ModalProps, nextState: any) {
    return nextProps.visible !== this.props.visible;
  }
  render() {
    return (
      <>
        <Backdrop show={this.props.visible} closeBackdrop={this.props.closeModal} />
        <div
          style={{
            transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.visible ? '1' : '0',
          }}
          className={styles['Modal']}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

// const Modal = (props: { visible: boolean; closeModal: () => void; children?: any }) => {
//   return (
//     <>
//       <Backdrop show={props.visible} closeBackdrop={props.closeModal} />
//       <div
//         style={{
//           transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
//           opacity: props.visible ? '1' : '0',
//         }}
//         className={styles['Modal']}
//       >
//         {props.children}
//       </div>
//     </>
//   );
// };

export default Modal;
