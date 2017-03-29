import { GraphQLSchema, GraphQLObjectType, GraphQLString, } from 'graphql';
import query from './queries';
import subscription from './subscriptions';

export default new GraphQLSchema({
	query,
	subscription,
});