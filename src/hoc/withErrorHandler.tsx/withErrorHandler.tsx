import React, { Component } from 'react';
import Modal from 'components/UI/Modal/Modal';
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
  return class extends Component<{}, { error: any }> {
    reqInterceptor: number;
    resInterceptor: number;
    constructor(props: any) {
      super(props);

      // setting interceptors here
      // instead of placing inside componentDidMount
      // because it's called after WrappedComponent componentDidMout
      // which would cause the interceptor do be setted after
      // the HTTP com inside WrappedComponent
      this.reqInterceptor = axios.interceptors.request.use(
        (request) => request,
        (error) => {
          return Promise.reject(error);
        }
      );

      this.resInterceptor = axios.interceptors.response.use(
        (response: AxiosResponse) => {
          this.setState({ error: null });
          return response;
        },
        (error: AxiosError) => {
          this.setState({ error: error.message });
          return Promise.reject(error);
        }
      );

      this.state = {
        error: null,
      };
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <>
          <Modal
            closeModal={() => this.setState({ error: null })}
            visible={this.state.error !== null}
          >
            {this.state.error}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
