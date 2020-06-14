import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios-orders';

import styles from './ContactData.module.css';

import Button from 'components/UI/Button/Button';
import ContactDataProps from 'shared/models/props/contactData-props.model';
import Spinner from 'components/UI/Spinner/Spinner';

class ContactData extends Component<ContactDataProps & RouteComponentProps> {
  state = {
    name: 'Anderson',
    email: 'anderson@contact.com',
    address: {
      street: 'Qualquer uma',
      code: 'testando',
    },
    deliveryMode: 'fastest',
    loading: false,
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      totalPrice: this.props.price,
      ingredients: this.props.ingredients,
      custumer: this.state,
      deliveryMode: this.state.deliveryMode,
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className={styles['ContactData']}>
        <h1>Return your contact data</h1>
        <form>
          <input className={styles['Input']} type='text' name='name' placeholder='Your name' />
          <input className={styles['Input']} type='text' name='email' placeholder='Your email' />
          <input className={styles['Input']} type='text' name='street' placeholder='Your street' />
          <input
            className={styles['Input']}
            type='text'
            name='code'
            placeholder='Your postal code'
          />

          <Button type='Success' clicked={this.submitHandler}>
            {this.state.loading ? <Spinner size='24px' /> : 'Order'}
          </Button>
        </form>
      </div>
    );
  }
}
export default ContactData;
