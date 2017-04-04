import {
	GraphQLObjectType,
	GraphQLString as String,
} from 'graphql';

export const Message = new GraphQLObjectType({
	name: 'ChatMessage',
	fields: {
		owner: { type: String, },
		message: { type: String, },
	}
});