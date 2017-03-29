import { GraphQLString } from 'graphql';

export default {
	type: GraphQLString,
	resolve () {
		return 'Hello world!';
	}
}