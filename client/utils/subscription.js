/*
* This subscription is about IOT Device Gateway only!
* It wasn't about GraphQl subscription at all (of-course it have some relation).
* */

import { createEndpoint } from './request';
import { uniqueClientId } from './helpers';

let subscriptions = {};
const endpoint = createEndpoint(
	'us-west-2',
	'a2xygykkoj5mgz.iot.us-west-2.amazonaws.com',
	'AKIAIIC5WKF7EX3VBMRA',
	'XAaiCtNYkl8H1zYKUkqiqqpjqzyudvAi1azSGNHU'),
	clientId = uniqueClientId(),
	client = new Paho.MQTT.Client(endpoint, clientId);

client.connect({
	useSSL: true,
	timeout: 3,
	mqttVersion: 4,
	onSuccess: onConnectSuccess,
});

client.onMessageArrived = onMessage;
client.onConnectionLost = function(e) { console.log(e) };

function onConnectSuccess () {
	client.subscribe("Test/chat");
	console.log("Connected to Gateway!");
}

export function subscribe (topic, callback) {
	const fullTopic = `subscription@${topic}:${clientId}`;
	client.subscribe(fullTopic);
	subscriptions[fullTopic] = callback;
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

function onMessage(message) {
	const messageCallback = subscriptions[message.destinationName];
	messageCallback && messageCallback(message.payloadString);
}