import React from 'react';

import styles from './Logo.module.css';
import burgerLogo from 'assets/images/burger-logo.png';

const Logo = (props: any) => (
  <div className={styles['Logo']}>
    <img src={burgerLogo} alt='Application logo' />
  </div>
);

export default Logo;
