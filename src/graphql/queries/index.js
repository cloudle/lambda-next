import { GraphQLObjectType } from 'graphql';
import greeting from './greeting';
import user from './user';

export default new GraphQLObjectType({
	name: 'Queries',
	fields: {
		greeting,
		user,
	}
});