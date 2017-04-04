import * as Actions from '../actions';

export function push (path, params = {}) {
	return { type: Actions.BrowserRouterNavigate, path, params };
}