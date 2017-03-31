import { User } from '../types';

export default {
	type: User,
	description: 'An account with profile and authentication stuffs',
	resolve (root, args, ast) {
		return {
			id: root['clientId'],
			name: "Cloud",
		}
	}
}