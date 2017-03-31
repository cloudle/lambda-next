import {
	GraphQLString as String,
	GraphQLInt as Int
} from 'graphql';

let counter = 0;

export default {
	type: Int,
	resolve () {
		return increaseCounter()
			.then(next => next);
	}
};