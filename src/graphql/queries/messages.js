import { GraphQLString, GraphQLList } from 'graphql';
import { increaseCounter } from '../../cache';
import { publish } from '../../utils/subscriptionManager';

import { Message } from '../types/message';

export default {
	type: new GraphQLList(Message),
	resolve () {
		return [{
			owner: 'Chat bot',
			message: 'Welcome to stateless messenger!',
		}, {
			owner: 'Chat bot',
			message: `Cause I'm stateless - I won't store message history anywhere (not in DB as well)`,
		}, ]
	}
}