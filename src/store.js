import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

 
const initialState = {};
const middleware = [thunk];

let store;
const reduxReactStoreExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && 
window.__REDUX_DEVTOOLS_EXTENSION__() ;

if (window.navigator.userAgent.includes("Chrome") && reduxReactStoreExtension) {
    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middleware),
        reduxReactStoreExtension
    ));
} else {
    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middleware)));
}

export default store;