import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios-orders';

import styles from './ContactData.module.css';

import Button from 'components/UI/Button/Button';
import ContactDataProps from 'shared/models/props/contactData-props.model';
import ContactDataState from 'shared/models/states/contactData-state.model';
import Spinner from 'components/UI/Spinner/Spinner';
import Input from 'components/UI/Input/Input';
import { clone } from 'ramda';
import BuiltinValidators from 'shared/forms/validators/builtInValidators';
import FormGroup from 'containers/FormGroup/FormGroup';

class ContactData extends Component<ContactDataProps & RouteComponentProps> {
  state: ContactDataState = {
    orderForm: {
      costumer: {
        name: {
          elType: 'input',
          elConfig: {
            type: 'text',
            placeholder: 'Your name',
            name: 'name',
          },
          value: '',
          valid: false,
          validators: { required: true },
        },
        email: {
          elType: 'input',
          elConfig: {
            type: 'text',
            placeholder: 'Your e-mail',
            name: 'email',
          },
          value: '',
          valid: false,
          validators: { required: true },
        },
      },
      address: {
        street: {
          elType: 'input',
          elConfig: {
            type: 'text',
            placeholder: 'Your street',
            name: 'street',
          },
          value: '',
          valid: false,
          validators: { required: true },
        },
        zipCode: {
          elType: 'input',
          elConfig: {
            type: 'text',
            placeholder: 'Your ZIP code',
            name: 'zipCode',
          },
          value: '',
          valid: false,
          validators: { required: true, maxLength: 6, minLength: 2 },
        },
      },
      deliveryMode: {
        elType: 'select',
        elConfig: {
          placeholder: 'Select...',
          name: 'deliveryMode',
        },
        options: [
          { value: 'fastest', display: 'Fastest' },
          { value: 'cheapest', display: 'Cheapest' },
        ],
        value: '',
        valid: false,
        validators: { required: true },
      },

      valid: false,
    },

    loading: false,
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    this.setState({ loading: true });

    const addressData: { [key: string]: string } = {};
    for (let identifier in this.state.orderForm.address) {
      addressData[identifier] = this.state.orderForm.address[identifier].value;
    }
    const costumerData: { [key: string]: string } = {};
    for (let identifier in this.state.orderForm.costumer) {
      costumerData[identifier] = this.state.orderForm.costumer[identifier].value;
    }

    const order = {
      totalPrice: this.props.price,
      ingredients: this.props.ingredients,
      custumer: { address: addressData, ...costumerData },
      deliveryMode: this.state.orderForm.deliveryMode.value,
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

  validateFormFields = (rules: { [key: string]: any }, value: string) => {
    let isValid = true;

    Object.keys(rules).forEach((key) => {
      isValid = BuiltinValidators[key](value, rules[key]) && isValid;
    });

    return isValid;
  };

  structureForm = () => {
    const { address: addressState } = this.state.orderForm;
    const { deliveryMode: deliveryModeState } = this.state.orderForm;
    const { costumer: costumerState } = this.state.orderForm;

    const addressForm = Object.entries(addressState).map(([stateField, field], index) => {
      return (
        <Input
          changed={(ev: any) => {
            const { value } = ev.target as HTMLInputElement;
            const clonedOrderForm = clone(this.state.orderForm);
            clonedOrderForm.address[stateField].value = value;

            const validField = this.validateFormFields(field.validators as any, value);
            clonedOrderForm.address[stateField].valid = validField;

            this.setState({ orderForm: clonedOrderForm });
          }}
          valid={addressState[stateField].valid}
          inputType={field.elType}
          value={field.value}
          errorMessage='Invalid input, verify your data.'
          attributes={{
            ...field.elConfig,
          }}
          key={stateField + index}
        />
      );
    });

    const costumerForm = Object.entries(costumerState).map(([stateField, field], index) => {
      return (
        <Input
          changed={(ev: any) => {
            const { value } = ev.target;
            const clonedOrderForm = clone(this.state.orderForm);
            clonedOrderForm.costumer[stateField].value = ev.target.value;

            const validField = this.validateFormFields(field.validators as any, value);
            clonedOrderForm.costumer[stateField].valid = validField;

            this.setState({ orderForm: clonedOrderForm });
          }}
          valid={costumerState[stateField].valid}
          inputType={field.elType}
          value={field.value}
          errorMessage='Invalid input, verify your data.'
          attributes={{
            ...field.elConfig,
          }}
          key={stateField + index}
        />
      );
    });

    const modeForm = (
      <Input
        value={deliveryModeState.value}
        changed={(ev: any) => {
          const { value } = ev.target;
          const clonedOrderForm = clone(this.state.orderForm);
          clonedOrderForm.deliveryMode.value = value;

          const validField = this.validateFormFields(
            clonedOrderForm.deliveryMode.validators as any,
            value
          );

          clonedOrderForm.deliveryMode.valid = validField;

          this.setState({ orderForm: clonedOrderForm });
        }}
        key={deliveryModeState.elType}
        inputType={deliveryModeState.elType}
        valid={deliveryModeState.valid}
        classes={styles['Input']}
        errorMessage='Invalid input, verify your data.'
        attributes={{ ...deliveryModeState.elConfig }}
        options={deliveryModeState.options}
      />
    );

    return (
      <>
        <FormGroup formChange={(val) => this.updateFormValidty(val)}>
          {costumerForm}
          {addressForm}
          {modeForm}
        </FormGroup>
      </>
    );
  };

  updateFormValidty = (value: boolean) => {
    const clonedForm = clone(this.state.orderForm);

    clonedForm.valid = value;
    this.setState({ orderForm: clonedForm });
  };

  render() {
    const form = this.structureForm();
    return (
      <div className={styles['ContactData']}>
        <h1>Return your contact data</h1>
        <form autoComplete='off'>
          {form}

          <Button disable={!this.state.orderForm.valid} type='Success' clicked={this.submitHandler}>
            {this.state.loading ? <Spinner size='24px' /> : 'Order'}
          </Button>
        </form>
      </div>
    );
  }
}
export default ContactData;
