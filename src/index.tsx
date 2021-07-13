import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import App from './controllers/App/App';
import { RootReducer } from './_reducers';
import { IS_MOBILE, IS_EMBED } from './config'
import "./main.scss";

const enhancers = compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
export const store = createStore(RootReducer, undefined, enhancers);
declare var process: {
    env: {
        NODE_ENV: string
    }
}

(function () {

    if (IS_MOBILE) {
        document.querySelector("body").classList.add("mobile");
    }
    if (IS_EMBED) {
        document.querySelector("body").classList.add("embed");
    }
    if (typeof document !== "undefined") {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>
            , document.getElementById('SiteContainer'), () => {
            });
    } else {
        return App;
    }

}());
