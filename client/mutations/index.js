import { Relay } from '../utils';

export const addMessage = Relay.QL`
	mutation addMessage($ownerId: String, $owner: String, $message: String) {
		addMessage(ownerId: $ownerId, owner: $owner, message: $message) {
			owner, message
		}
	}
`;