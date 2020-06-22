import { createStore, applyMiddleware, compose } from 'redux';
import ingredientsReducer from './reducers/burgerBuilder';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

const store = createStore(ingredientsReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default store;
