import { GraphQLString } from 'graphql';
import { increaseCounter } from '../../cache';

let counter = 0;

export default {
	type: GraphQLString,
	resolve () {
		counter++;
		return increaseCounter()
			.then(next => `Hello world, ${next}.${counter}!`);
	}
}