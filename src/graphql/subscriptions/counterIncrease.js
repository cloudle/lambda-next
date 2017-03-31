import {
	GraphQLString as String,
	GraphQLInt as Int
} from 'graphql';

let counter = 0;

export default {
	type: Int,
	start (subscriptionId) {
		console.log("Start subscribe!");
		return increaseCounter()
			.then(next => next);
	},
	stop () {
		console.log("Stop subscribe");
		return increaseCounter()
			.then(next => next);
	},
	resolve () {
		console.log("It actually just relove!");
		return increaseCounter()
			.then(next => next);
	}
};