import { GraphQLString } from 'graphql';
import { increaseCounter } from '../../cache';

export default {
	type: GraphQLString,
	resolve () {
		return increaseCounter().then(next => `Hello world, ${next}!`);
	}
}