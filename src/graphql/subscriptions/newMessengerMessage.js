import { GraphQLString as String, GraphQLInt as Int } from 'graphql';
import { registerSubscription } from '../../utils/subscriptionManager';
import { Message } from '../types/message';

export default {
	type: Message,
	resolve (root, args, context, ast) {
		registerSubscription(root, ast);
		return {};
	}
};