import React, { Component } from 'react';

class FormGroup extends Component<{
  children?: React.ReactNode[];
  formChange: (val: boolean) => void;
}> {
  state = {
    validtityArray: [],
    isValid: false,
  };

  checkFormValidity = () => {
    const formsValids = this.props.children
      ?.flat()
      .map((input) => (input as React.ReactElement).props?.valid);

    if (JSON.stringify(formsValids) !== JSON.stringify(this.state.validtityArray)) {
      this.setState({ validtityArray: formsValids, isValid: !formsValids?.includes(false) }, () => {
        this.props.formChange(this.state.isValid);
      });
    }
  };

  componentDidMount() {
    this.checkFormValidity();
  }

  componentDidUpdate() {
    this.checkFormValidity();
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default FormGroup;
