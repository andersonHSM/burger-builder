import React, { AllHTMLAttributes, Component } from 'react';

import styles from './Input.module.css';

class Input extends Component<{
  classes?: string;
  inputType?: string;
  label?: string;
  attributes?: AllHTMLAttributes<any>;
  value?: string;
  options?: Array<{ value: string; display: string }>;
  errors?: {} | { [key: string]: boolean };
  valid?: boolean;
  errorMessage?: string;
  focused?: (ev: any) => void;
  changed: (ev: any) => void;
}> {
  state = {
    touched: false,
    dirty: false,
  };

  handleFocus = () => {
    console.log('oi');
    if (!this.state.touched) {
      this.setState({
        touched: true,
      });
    }
  };

  handleChange = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  render() {
    let inputElement = null;
    let inputClasses = [styles['InputElement']];

    let errorMessage = null;

    if (!this.props.valid && this.props.errorMessage && this.state.touched && this.state.dirty) {
      errorMessage = (
        <div className={styles['ErrorMessage']}>
          <small>{this.props.errorMessage}</small>
        </div>
      );
      inputClasses = inputClasses.concat([styles['Invalid']]);
    } else if (this.props.valid && this.state.touched && this.state.dirty) {
      inputClasses = inputClasses.concat(styles['Valid']);
    }

    switch (this.props.inputType) {
      case 'input':
        inputElement = (
          <input
            onFocus={this.handleFocus}
            onChange={(event) => {
              this.props.changed(event);
              this.handleChange();
            }}
            value={this.props.value}
            {...this.props.attributes}
            className={(this.props.classes || '') + ' ' + inputClasses.join(' ')}
          />
        );
        break;
      case 'textarea':
        inputElement = (
          <textarea
            onFocus={this.handleFocus}
            onChange={(event) => {
              this.props.changed(event);
              this.handleChange();
            }}
            value={this.props.value}
            className={(this.props.classes || '') + ' ' + inputClasses.join(' ')}
            {...this.props.attributes}
          />
        );
        break;
      case 'select':
        inputElement = (
          <select
            onFocus={this.handleFocus}
            value={this.props.value}
            onChange={(event) => {
              this.props.changed(event);
              this.handleChange();
            }}
            className={`${this.props.classes || ''} ${inputClasses.join(' ')}`}
            {...this.props.attributes}
          >
            <option value=''>Select...</option>
            {this.props.options?.map((option, index) => (
              <option key={option.value + index} value={option.value}>
                {option.display}
              </option>
            ))}
          </select>
        );
        break;
      default:
        inputElement = (
          <input
            onFocus={this.handleFocus}
            onChange={(event) => {
              this.props.changed(event);
              this.handleChange();
            }}
            value={this.props.value}
            className={(this.props.classes || '') + ' ' + inputClasses.join(' ')}
            {...this.props.attributes}
          />
        );
        break;
    }

    return (
      <div className={styles['Input']}>
        <label className={styles['Label']}>{this.props.label}</label>
        {inputElement}
        {errorMessage}
      </div>
    );
  }
}

export default Input;
