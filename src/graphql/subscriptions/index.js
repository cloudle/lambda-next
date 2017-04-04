import { GraphQLObjectType } from 'graphql';
import counterIncrease from './counterIncrease';
import newMessengerMessage from './newMessengerMessage';

export default new GraphQLObjectType({
	name: 'Subscriptions',
	fields: {
		counterIncrease,
		newMessengerMessage,
	}
});