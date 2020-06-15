type orderInput = {
  elType: string;
  elConfig: { [key: string]: string };
  value: string;
  validators?: Validators;
  valid: boolean;
};

type composedOrderInputType = {
  [key: string]: orderInput;
};

type Validators = { [key: string]: any } | { [key: string]: any }[];

export default interface ContactDataState {
  orderForm: {
    [key: string]: any;
    costumer: composedOrderInputType;
    address: composedOrderInputType;
    deliveryMode: orderInput & {
      options: { value: string; display: string }[];
    };
    valid: boolean;
  };
  loading: boolean;
}
