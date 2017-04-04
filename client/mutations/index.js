import { Relay } from '../utils';

export const addMessage = Relay.QL`
	mutation addMessage($owner: String, $message: String) {
		addMessage(owner: $owner, message: $message) {
			owner, message
		}
	}
`;