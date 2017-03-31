import { GraphQLString as String, GraphQLInt as Int } from 'graphql';
import { increaseCounter } from '../../cache';

let counter = 0;

export default {
	type: Int,
	resolve (root, args, ast) {
		console.log(root, args, ast);
		return increaseCounter().then(next => next);
	}
};