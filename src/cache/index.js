import { createClient } from 'redis';

const endpoint = 'werner-cache.e2nrtw.0001.usw2.cache.amazonaws.com',
	client = createClient(endpoint, {});

export function increaseCounter () {
	return new Promise((resolve, reject) => {
		client.get("counter", (error, value) => {
			console.log(error, value);
			const next = error ? 0 : value + 1;
			client.set("counter", next);

			resolve(next);
		});
	});
}