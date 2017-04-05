import * as Actions from '../actions';
import { utils } from 'react-universal-ui';
import { collectionInsert } from '../../utils';
import { clientId } from '../../utils/subscription';

const initialState = {
	counter: 0,
	userName: localStorage.getItem('userName') || 'Anonymous',
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
	console.log(action.remote, action.message, action.message.ownerId === clientId);

	const message = action.message || {};
	if (action.remote && message.ownerId === clientId) {
		return state;
	} else {
		return {...state, messages: collectionInsert(state.messages, action.message, false) };
	}
}