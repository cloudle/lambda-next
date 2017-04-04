import { GraphQLObjectType } from 'graphql';
import greeting from './greeting';
import user from './user';
import messages from './messages';

export default new GraphQLObjectType({
	name: 'Queries',
	fields: {
		greeting,
		user,
		messages,
	}
});