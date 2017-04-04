import { Relay } from '../utils';

export const messages = Relay.QL`
	query messages {
		messages {
			owner
			message
		}		
	}
`;