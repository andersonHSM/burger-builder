import { createStore } from 'redux';
import ingredientsReducer from './reducers/ingredients.reducers';

const store = createStore(
  ingredientsReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
