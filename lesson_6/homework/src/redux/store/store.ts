import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import { cartSaga } from '../sagas/cart';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(cartSaga);

export type StateT = ReturnType<typeof store.getState>;
