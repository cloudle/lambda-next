import * as Actions from '../actions';

export function increaseCounter (volume = 1) {
	return { type: Actions.IncreaseCounter, volume };
}

export function updateUserName (value) {
	return { type: Actions.UpdateUserName, value };
}

export function loadMessages (messages) {
	return { type: Actions.LoadMessages, messages };
}

export function addMessage (message, remote = false) {
	return { type: Actions.AddMessage, message };
}