import React, { Component } from 'react';
import { View } from 'react-native';
import GraphiQL from 'graphiql';

import fetch from 'isomorphic-fetch';
import 'graphiql/graphiql.css';

function onClickToolbarButton (event) {
	alert('Clicked toolbar button!');
}

export default function () {
	return <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}>
			<GraphiQL fetcher={graphQLFetcher}>
				<GraphiQL.Toolbar>
					{/*<GraphiQL.ToolbarButton*/}
					{/*onClick={onClickToolbarButton}*/}
					{/*title="ToolbarButton"*/}
					{/*label="Click Me as well!"*/}
					{/*/>*/}
				</GraphiQL.Toolbar>
			</GraphiQL>
		</View>
}

function graphQLFetcher(graphQLParams) {
	let token = localStorage.getItem("sysConfigs"),
		headers = {'Content-Type': 'application/json'};

	if (token) headers['Authorization'] = token;

	return fetch('https://u602208hbb.execute-api.us-west-2.amazonaws.com/dev/graphql', {
		method: 'POST',
		headers,
		body: JSON.stringify(graphQLParams),
	}).then(response => response.json());
}