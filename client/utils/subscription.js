/*
* This subscription is about IOT Device Gateway only!
* It wasn't about GraphQl subscription at all (of-course it have some relation).
* */

import { createEndpoint, getEndpoint } from './request';
import { uniqueClientId, guid } from './helpers';

export const clientId = guid();
let client, clientReady = false,
	subscriptionQueue = [],
	iotRegion = 'us-west-2',
	iotEndpoint = 'a2xygykkoj5mgz.iot.us-west-2.amazonaws.com',
	subscriptions = {};

getEndpoint(iotRegion, iotEndpoint, (error, endpoint) => {
	if (error) { console.log(error); return }

	client = new Paho.MQTT.Client(endpoint, clientId);
	client.connect({
		useSSL: true,
		timeout: 3,
		mqttVersion: 4,
		onSuccess: onConnectSuccess,
	});

	client.onMessageArrived = onMessageArrived;
	client.onConnectionLost = function(e) { console.log(e) };
});

//Catch up subscriptions made when connection wasn't ready yet!
function onConnectSuccess () {
	console.log("Successfully connect to Device Gateway!");
	clientReady = true;

	for (let topic of subscriptionQueue) {
		topic && client.subscribe(topic);
	}
}

export function subscribe (topic, callback) {
	const fullTopic = `subscription@${topic}:${clientId}`;
	subscribeOrQueuing(fullTopic);
	subscriptions[fullTopic] = callback;
}

export function subscribeOrQueuing (topic) {
	if (clientReady) {
		client.subscribe(topic);
	} else {
		subscriptionQueue.push(topic);
	}
}

/*TODO: Recheck this with server-side logic*/
export function unSubscribe (topic, callback) {
	client.unsubscribe(topic);
	delete subscriptions[topic];
}

export function publish (topic, content) {
	const message = new Paho.MQTT.Message(content);
	message.destinationName = topic;
	client.send(message);
}

function onMessageArrived(message) {
	const messageCallback = subscriptions[message.destinationName];
	messageCallback && messageCallback(message.payloadString);
}