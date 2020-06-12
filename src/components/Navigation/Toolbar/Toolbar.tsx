import React from 'react';

import styles from './Toolbar.module.css';
import Logo from 'components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleDrawerButton from 'components/UI/ToggleDrawerButton/ToggleDrawerButton';

const Toolbar = (props: { openDrawer: () => void }) => (
  <header className={styles['Toolbar']}>
    {/* <div onClick={props.openDrawer}>Menu</div> */}
    <ToggleDrawerButton
      clicked={() => {
        if (window.innerWidth > 499) return;
        props.openDrawer();
      }}
    />
    <div className={styles['Logo']}>
      <Logo />
    </div>
    <nav className={styles['DesktopOnly']}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
