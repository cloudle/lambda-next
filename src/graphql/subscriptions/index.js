import { GraphQLObjectType } from 'graphql';
import counterIncrease from './counterIncrease';

export default new GraphQLObjectType({
	name: 'Subscriptions',
	fields: {
		counterIncrease,
	}
});