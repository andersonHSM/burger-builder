import storeObject from './store';

const storeObservable = (store: typeof storeObject) => {
  return {
    subscribe({ onNext }: any) {
      let dispose = store.subscribe(() => onNext(store.getState()));
      onNext(store.getState());
      return { dispose };
    },
  };
};

export default storeObservable;
