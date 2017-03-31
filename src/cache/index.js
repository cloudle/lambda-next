import { createClient } from 'redis';

const emulateMode = process.env.emulate === 'true',
	endpoint = emulateMode
		? 'localhost'
		: 'werner-cache.e2nrtw.0001.usw2.cache.amazonaws.com';

export function increaseCounter () {
	const client = createClient({ host: endpoint, port: 6379 });

	return new Promise((resolve, reject) => {
		client.get("counter", (error, value) => {
			if (error) handleFail(reject, error, client);

			const next = value ? parseInt(value) + 1 : 0;
			client.set("counter", next, (error, reply) => {
				if (error) handleFail(reject, error);
				client.quit(); //!Important, to release lambda function.
			});

			resolve(next);
		});
	});
}

function handleFail (reject, error, client) {
	client && client.quit();
	reject(error);
}