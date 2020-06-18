import { createStore } from 'redux';
import ingredientsReducer from './reducers/ingredients.reducers';

const store = createStore(ingredientsReducer);

export default store;
