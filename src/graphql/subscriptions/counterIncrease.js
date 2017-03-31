import { GraphQLString as String, GraphQLInt as Int } from 'graphql';
import { registerSubscription } from '../../utils/subscriptionManager';
import { increaseCounter } from '../../cache';

let counter = 0;

export default {
	type: Int,
	resolve (root, args, context, ast) {
		registerSubscription(root, ast);
		return increaseCounter().then(next => next);
	}
};