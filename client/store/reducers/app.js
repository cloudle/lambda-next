import * as Actions from '../actions';
import { utils } from 'react-universal-ui';
import { collectionInsert } from '../../utils';
const initialState = {
	counter: 0,
	userName: 'Anonymous',
	messages: [],
};

export default utils.appReducer((state = initialState, action) => {
	switch (action.type) {
		case Actions.IncreaseCounter:
			return {...state, counter: state.counter + action.volume};
		case Actions.UpdateUserName:
			return {...state, userName: action.value };
		case Actions.LoadMessages:
			return {...state, messages: [...state.messages, ...action.messages] };
		case Actions.AddMessage:
			return handleMessageAdd(state, action);
		default:
			return state;
	}
})

function handleMessageAdd (state, action) {
	const message = action.message || {};
	if (action.remote && message.owner === state.userName) {
		return state;
	} else {
		return {...state, messages: collectionInsert(state.messages, action.message, false) };
	}
}