import React from 'react';

import styles from './SideDrawer.module.css';

import Logo from 'components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from 'components/UI/Backdrop/Backdrop';

const SideDrawer = (props: { closeSideDrawer: () => void; opened: boolean }) => {
  return (
    <>
      <Backdrop show={props.opened} closeBackdrop={props.closeSideDrawer} />
      <div className={[styles['SideDrawer'], styles[props.opened ? 'Open' : 'Close']].join(' ')}>
        <div className={styles['Logo']}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
