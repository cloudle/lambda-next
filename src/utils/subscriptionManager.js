import { execute } from '../cache';

/* *
 * 1st param is GraphQl's root,
 * destruct it for clientId (TODO: change to more accurate id)
 * 2nd params is GraphQl's ast
 * */
export function registerSubscription ({clientId}, {fieldName}, query = 'not-yet') {
	return execute((client) => {
		return new Promise((resolve, reject) => {
			const groupKey = `subscription@${fieldName}`,
				subKey = `subscription@${fieldName}:${clientId}`;

			client.get(subKey, (error, value) => {
				if (error) {
					reject(error);
				} else if (value) {
					subscribingHandler(client, resolve, reject, subKey);
				} else {
					newSubscribeHandler(client, resolve, reject, clientId, subKey, groupKey);
				}
			});
		})
	})
}

function subscribingHandler (client, resolve, reject, subKey) {
	writeSubscribe(client, resolve, reject, subKey);
}

function newSubscribeHandler (client, resolve, reject, clientId, subKey, groupKey) {
	client.sadd(groupKey, clientId, (error, reply) => {
		if (error) { reject(error) } else	writeSubscribe(client, resolve, reject, subKey);
	});
}

function writeSubscribe (client, resolve, reject, subKey) {
	client.set(subKey, 'query', 'EX', fiveMinute, (error, reply) => {
		if (error) { reject(error) } else resolve(reply);
	});
}

export function publish (eventName) {
	return execute((client) => {
		return new Promise((resolve, reject) => {
			client.smembers(`subscription@${eventName}`, (error, results) => {
				if (error) reject(error);

				console.log("publishing..", results);
				resolve();
			})
		});
	})
}

export function unSubscribe () {
	//For now, it just expire after 5 minute inactivity.
}

const fiveMinute = 4000;