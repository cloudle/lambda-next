import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import 'graphiql/graphiql.css';

import { Input, Button } from 'react-universal-ui';
import Tab from './graphiqlTab';

export default class GraphWorkspace extends Component {
	constructor (props) {
	  super(props);
	  this.state = {
	    urlVisible: true,
	  }
	}

	render () {
		const visibleUrlStyle = this.state.urlVisible ? {
			backgroundColor: '#999999',
		} : {};

		return <View style={styles.container}>
			<View style={styles.headingContainer}>
				<View style={styles.tabContainer}>
					<View style={styles.tabItemContainer}>
						<Tab title="Query 1" active={true}/>
						<Tab title="Query 2"/>
						<Tab title="Query 3"/>
					</View>
					<View style={styles.tabCommandContainer}>
						<Button
							onPress={() => this.setState({urlVisible: !this.state.urlVisible})}
							wrapperStyle={[{margin: 8,}, visibleUrlStyle]}
							title="url"/>
					</View>
				</View>
				{this.renderUrl()}
			</View>
			<GraphiQL fetcher={graphQLFetcher}>
				<GraphiQL.Toolbar>
					<GraphiQL.ToolbarButton
						title="ToolbarButton"
						label="History"/>
				</GraphiQL.Toolbar>
			</GraphiQL>
		</View>
	}

	renderUrl () {
		if (this.state.urlVisible) {
			return <View style={styles.urlContainer}>
				<Input
					wrapperStyle={styles.urlWrapper}
					floatingLabel="GraphQL endpoint"
					value="https://u602208hbb.execute-api.us-west-2.amazonaws.com/dev/graphql"/>
			</View>
		}
	}
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

const styles = StyleSheet.create({
	container: {
		position: 'absolute', top: 0, right: 0, left: 0, bottom: 0,
	},
	headingContainer: {
		borderBottomWidth: 1, borderColor: '#dddddd',
	},
	tabContainer: {
		flexDirection: 'row',
		backgroundColor: '#f6f6f6',
		borderBottomWidth: 1, borderColor: '#dddddd',
	},
	tabItemContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	tabCommandContainer: {
		flexDirection: 'row',
	},
	urlContainer: {
		paddingTop: 10,
	},
	urlWrapper: {
		paddingLeft: 18, paddingRight: 18,
	},
});