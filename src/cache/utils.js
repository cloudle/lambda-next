import { createClient } from 'redis';

const emulateMode = process.env.emulate === 'true';

export const endpoint = emulateMode
		? 'localhost'
		: 'werner.dl0cwy.0001.use1.cache.amazonaws.com';

/*Managed Redis executor, which open and close connection safely*/
export function execute (callback) {
	const client = createClient({ host: endpoint, port: 6379 })
		.on("connect", () => console.log("connection open!"))
		.on("end", (error) => console.log("connection safely closed."));

	return new Promise((resolve, reject) => {
		callback(client)
			.then((result) => { client.quit(); resolve(result) })
			.catch((error) => { client.quit(); reject(error) });
	});
}

export function increaseCounter () {
	return execute((client) => {
		return new Promise((resolve, reject) => {
			client.get("counter", (error, value) => {
				if (error) reject(error);

				const next = value ? parseInt(value) + 1 : 0;
				client.set("counter", next, (error, reply) => {
					if (error) { reject(error) } else resolve(next);
				})
			})
		});
	});
}