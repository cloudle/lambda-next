import { Relay } from '../utils';

export const messages = Relay.QL`
	query messages {
		messages {
			ownerId
			owner
			message
		}		
	}
`;