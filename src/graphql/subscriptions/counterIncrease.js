import { GraphQLString as String, GraphQLInt as Int } from 'graphql';
import { increaseCounter } from '../../cache';

let counter = 0;

export default {
	type: Int,
	resolve () {
		console.log("It actually just relove!");
		return increaseCounter()
			.then(next => next);
	}
};