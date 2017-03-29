import { User } from '../types';

export default {
	type: User,
	description: 'An account with profile and authentication stuffs',
	resolve () {
		return {
			id: "0001",
			name: "Cloud",
		}
	}
}