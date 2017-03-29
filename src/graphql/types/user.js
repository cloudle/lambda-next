import {
	GraphQLObjectType,
	GraphQLString as String,
} from 'graphql';

export const User = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: String, },
		name: { type: String, }
	}
});