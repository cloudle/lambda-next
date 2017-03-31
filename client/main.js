import React, { Component } from 'react';
import { render } from 'react-dom';

import { createEndpoint } from './utils/request';
import { guid, query, Relay } from './utils';

const endpoint = createEndpoint(
	'us-west-2',
	'a2xygykkoj5mgz.iot.us-west-2.amazonaws.com',
	'AKIAIZS43HB57SPETYPQ',
	'Ye7OSqhUpOoafF1i9hmx7BZnceCuzW1K1jTqqYNz');

const clientId = Math.random().toString(36).substring(7);
const client = new Paho.MQTT.Client(endpoint, clientId);
client.connect({
	useSSL: true,
	timeout: 3,
	mqttVersion: 4,
	onSuccess: subscribe
});

client.onMessageArrived = onMessage;
client.onConnectionLost = function(e) { console.log(e) };

function subscribe() {
	client.subscribe("Test/chat");
	console.log("subscribed");
}

function send (content) {
	const message = new Paho.MQTT.Message(content);
	message.destinationName = "Test/chat";
	client.send(message);
	console.log("sent");
}

function onMessage(message) {
	// data.messages.push(message.payloadString);
	console.log("message received: " + message.payloadString);
}

global.send = send;
global.query = query;
