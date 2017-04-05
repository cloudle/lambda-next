const moment = require('moment');
const CryptoJS = require('crypto-js');
function SigV4Utils () { }

SigV4Utils.sign = function(key, msg){
	const hash = CryptoJS.HmacSHA256(msg, key);
	return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.sha256 = function(msg) {
	const hash = CryptoJS.SHA256(msg);
	return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.getSignatureKey = function(key, dateStamp, regionName, serviceName) {
	const kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
	const kRegion = CryptoJS.HmacSHA256(regionName, kDate);
	const kService = CryptoJS.HmacSHA256(serviceName, kRegion);
	return CryptoJS.HmacSHA256('aws4_request', kService);
};

function createEndpoint(regionName, awsIotEndpoint, accessKey, secretKey) {
	const time = moment.utc();
	const dateStamp = time.format('YYYYMMDD');
	const amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
	const service = 'iotdevicegateway';
	const region = regionName;
	const algorithm = 'AWS4-HMAC-SHA256';
	const method = 'GET';
	const canonicalUri = '/mqtt';
	const host = awsIotEndpoint;

	const credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
	let canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
	canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
	canonicalQuerystring += '&X-Amz-Date=' + amzdate;
	canonicalQuerystring += '&X-Amz-SignedHeaders=host';

	const canonicalHeaders = 'host:' + host + '\n';
	const payloadHash = SigV4Utils.sha256('');
	const canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;

	const stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils.sha256(canonicalRequest);
	const signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
	const signature = SigV4Utils.sign(signingKey, stringToSign);

	canonicalQuerystring += '&X-Amz-Signature=' + signature;
	return 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
}

function getCredentials(done) {
	AWS.config.region = 'us-east-1';
	const cognitoIdentity = new AWS.CognitoIdentity(),
		params = { IdentityPoolId: 'us-east-1:e85ef246-0217-4472-82a0-d6104e047dbf' };

	cognitoIdentity.getId(params, function(err, objectHavingIdentityId) {
		if (err) return done(err);
		cognitoIdentity.getCredentialsForIdentity(objectHavingIdentityId, function(err, data) {
			if (err) return done(err);
			const credentials = {
				accessKey: data.Credentials.AccessKeyId,
				secretKey: data.Credentials.SecretKey,
				sessionToken: data.Credentials.SessionToken
			};
			console.log('CognitoIdentity has provided temporary credentials successfully.');
			done(null, credentials);
		});
	});
}

function getEndpoint(regionName, awsIotEndpoint, done) {
	getCredentials(function (err, creds) {
		if (err) return done(err);

		const time = moment.utc();
		const dateStamp = time.format('YYYYMMDD');
		const amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
		const service = 'iotdevicegateway';
		const region = regionName;
		const secretKey = creds.secretKey;
		const accessKey = creds.accessKey;
		const algorithm = 'AWS4-HMAC-SHA256';
		const method = 'GET';
		const canonicalUri = '/mqtt';
		const host = awsIotEndpoint;
		const sessionToken = creds.sessionToken;

		const credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
		let canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
		canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
		canonicalQuerystring += '&X-Amz-Date=' + amzdate;
		canonicalQuerystring += '&X-Amz-SignedHeaders=host';

		const canonicalHeaders = 'host:' + host + '\n';
		const payloadHash = SigV4Utils.sha256('');
		const canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;

		const stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils.sha256(canonicalRequest);
		const signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
		const signature = SigV4Utils.sign(signingKey, stringToSign);

		canonicalQuerystring += '&X-Amz-Signature=' + signature;

		let wssEndpoint = 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
		wssEndpoint += '&X-Amz-Security-Token=' + encodeURIComponent(sessionToken);
		done(null, wssEndpoint);
	});
}

function formatRequestUrl (options) {
	const time = moment.utc();
	const dateStamp = time.format('YYYYMMDD');
	const amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
	const service = 'iotdevicegateway';
	const region = options.regionName;
	const secretKey = options.secretKey;
	const accessKey = options.accessKey;
	const algorithm = 'AWS4-HMAC-SHA256';
	const method = 'GET';
	const canonicalUri = '/mqtt';
	const host = options.endpoint;

	const credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
	let canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
	canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
	canonicalQuerystring += '&X-Amz-Date=' + amzdate;
	canonicalQuerystring += '&X-Amz-SignedHeaders=host';

	const canonicalHeaders = 'host:' + host + '\n';
	const payloadHash = SigV4Utils.sha256('');
	const canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;
	console.log('canonicalRequest ' + canonicalRequest);

	const stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils.sha256(canonicalRequest);
	const signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
	const signature = SigV4Utils.sign(signingKey, stringToSign);

	canonicalQuerystring += '&X-Amz-Signature=' + signature;
	const sessionToken = options.sessionToken ? "&X-Amz-Security-Token=" + options.sessionToken : "";

	return 'wss://' + host + canonicalUri + '?' + canonicalQuerystring + sessionToken;
}

/**
 Function to initiate the websocket connection using the Paho MQTT client
 **/

function initClient (requestUrl) {
	const clientId = String(Math.random()).replace('.', '');
	const client = new Paho.MQTT.Client(requestUrl, clientId);
	const connectOptions = {
		onSuccess: function () {
			console.log('connected');

			// subscribe to the drawing
			client.subscribe("blog/drawing/iot-demo");

			// publish a lifecycle event
			message = new Paho.MQTT.Message('{"id":"' + credentials.identityId + '"}');
			message.destinationName = 'blog/drawing/usage';
			console.log(message);
			client.send(message);
		},
		useSSL: true,
		timeout: 3,
		mqttVersion: 4,
		onFailure: function () {
			console.error('connect failed');
		}
	};
	client.connect(connectOptions);

	client.onMessageArrived = function (message) {
		try {
			console.log("msg arrived: " +  message.payloadString);
			draw(JSON.parse(message.payloadString));
		} catch (e) {
			console.log("error! " + e);
		}
	};
}

/**
 Function to create a HTTP GET request
 **/

function ajaxGetRequest (url, callback) {
	const httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", url, true);
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				callback(httpRequest.responseText);
			} else {
				console.log('There was a problem with the request.');
			}
		}
	};
	httpRequest.send(null);
}

module.exports = {
	formatRequestUrl,
	initClient,
	ajaxGetRequest,
	createEndpoint,
	getEndpoint,
};