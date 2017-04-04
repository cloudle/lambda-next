import { GraphQLString as String } from 'graphql';
import { increaseCounter } from '../../cache';
import { publish } from '../../utils/subscriptionManager';
import { Message } from '../types/message';

export default {
	type: Message,
	args: {
		owner: { type: String, },
		message: { type: String, },
	},
	resolve (root, args, ast) {
		publish('newMessengerMessage', args);
		return args;
	}
}