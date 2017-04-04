import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from './reducers';
import reducers from './reducers';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
	composeEnhancers = window[DEVTOOLS] || compose,
	logger = createLogger();

export default function configureStore (initialState) {
	const enhancers = composeEnhancers(
		applyMiddleware(logger),
		applyMiddleware(routerMiddleware),
	);

	const store = initialState
		? createStore(reducers, initialState, enhancers)
		: createStore(reducers, enhancers);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}