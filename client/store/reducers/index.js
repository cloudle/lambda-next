import { combineReducers } from 'redux';
import appReducer from './app';
import { routerReducer, routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export const routerMiddleware = createRouterMiddleware(history);

export default combineReducers({
	app: appReducer,
	router: routerReducer,
});