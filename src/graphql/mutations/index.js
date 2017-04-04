import { GraphQLObjectType } from 'graphql';
import addMessage from './addMessage';

export default new GraphQLObjectType({
	name: 'Mutations',
	fields: {
		addMessage,
	}
});