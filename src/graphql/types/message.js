import {
	GraphQLObjectType,
	GraphQLString as String,
} from 'graphql';

export const Message = new GraphQLObjectType({
	name: 'ChatMessage',
	fields: {
		ownerId: { type: String, },
		owner: { type: String, },
		message: { type: String, },
	}
});