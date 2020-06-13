import React, { Component } from 'react';
import Aux from 'hoc/Aux/Aux';

import styles from './Layout.module.css';
import Toolbar from 'components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer';
import LayoutState from 'shared/models/states/layout-state.model';

class Layout extends Component {
  state: LayoutState = {
    sideDrawerOpened: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ sideDrawerOpened: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState: LayoutState) => {
      return {
        sideDrawerOpened: !prevState.sideDrawerOpened,
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar openDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer
          opened={this.state.sideDrawerOpened}
          closeSideDrawer={this.sideDrawerCloseHandler}
        />

        <main className={styles['content']}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
