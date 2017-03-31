import { GraphQLString } from 'graphql';
import { increaseCounter } from '../../cache';
import { publish } from '../../utils/subscriptionManager';

export default {
	type: GraphQLString,
	resolve () {
		return increaseCounter()
			.then(next => {
				publish('counterIncrease');
				return `Hello world, ${next}!`;
			});
	}
}