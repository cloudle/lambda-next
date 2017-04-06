import aws from 'aws-sdk';
import { execute } from '../cache';
import { execute as graphqlExecute } from '../index';
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

export function publish (eventName, payload = {}) {
	return execute((client) => {
		return new Promise((resolve, reject) => {
			client.smembers(`subscription@${eventName}`, (error, results) => {
				if (error) reject(error);

				const iotData = new aws.IotData({
					region: 'us-west-2',
					endpoint: 'a2xygykkoj5mgz.iot.us-west-2.amazonaws.com', });

				for (let clientId of results) {
					/*TODO: Check for dead-connection and clean-up group.
					* Query subKey, if it wasn't there => kill it's parent :p (in the group).
					* TODO: Run stored graphql query (in Redis) with payload as args,
					* => Result of that Graphql query is the publishData client did expected.
					* */

					if (clientId && clientId !== 'undefined') {
						iotData.publish({
							topic: `subscription@${eventName}:${clientId}`,
							payload: new Buffer(JSON.stringify(payload)),
							qos: 0,
						}, (error, response) => {
							if (error) console.log(error);
							console.log(response);
						});
					}
				}

				resolve(); //!Important, this will close Redis connection!
			})
		});
	})
}

export function unSubscribe () {
	//For now, it just expire after 5 minute inactivity.
}

const fiveMinute = 4000;