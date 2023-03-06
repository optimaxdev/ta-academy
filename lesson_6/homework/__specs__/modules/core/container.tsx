import type { RenderResult } from '@testing-library/react';
import { render, cleanup } from '@testing-library/react';
import { debug } from '@Utils/debug';
import { delay } from '@Utils/delay';
import React from 'react'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { Provider } from 'react-redux'; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { Store } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { cartSaga } from 'frontend/redux/sagas/cart';
import { rootReducer } from 'frontend/redux/reducers';
import App from 'frontend/App';
import createSagaMiddleware from 'redux-saga';
import { Mock } from '@Core/mock';

const sagaMiddleware = createSagaMiddleware();

export class Container {
    private page: RenderResult;
    private store: Store;

    // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
    public addDefaultMocks(): void {}

    public debug(): void {
        debug();
    }

    public async destroy(): Promise<void> {
        await cleanup();
        this.page && this.page.unmount();
    }

    public async fulfill(initialState = {}): Promise<void> {
        Mock.getInstance();
        const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(cartSaga);
        this.store = store;
        this.page = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        await delay(100);
    }

    public getStore(): Store {
        return this.store;
    }
}
