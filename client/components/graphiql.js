import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GraphiQL from './graphiql-src';
import fetch from 'isomorphic-fetch';
import './graphiqlStyle.css';

import { colors } from '../utils';
import { clientId } from '../utils/subscription';
import { Input, Button } from 'react-universal-ui';
import Tab, { activeTabBackground, inActiveTabBackground, tabContainerBackground } from './graphiqlTab';

export default class GraphWorkspace extends Component {
	constructor (props) {
	  super(props);
	  const url = localStorage.getItem('apiUrl') || 'https://32xqpeyll5.execute-api.us-east-1.amazonaws.com/dev/graphql';
	  this.state = {
	    urlVisible: false,
			urlInput: url,
			url,
	  }
	}

	render () {
		const visibleUrlStyle = this.state.urlVisible ? {
				backgroundColor: '#999999',
			} : {},
			graphQLFetcher = (graphQLParams) => {
				let token = localStorage.getItem('sysConfigs'),
					headers = { 'Content-Type': 'application/json', };

				headers['clientId'] = clientId;
				if (token) headers['Authorization'] = token;

				return fetch(this.state.url, {
					method: 'POST',
					headers,
					body: JSON.stringify(graphQLParams),
				}).then(response => response.json());
			};

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
							innerStyle={{padding: 4, paddingLeft: 8, paddingRight: 8}}
							title="url"/>
					</View>
				</View>
				{this.renderUrl()}
			</View>
			<GraphiQL fetcher={graphQLFetcher}/>
		</View>
	}

	renderUrl () {
		if (this.state.urlVisible) {
			return <View style={styles.urlContainer}>
				<Input
					wrapperStyle={styles.urlWrapper}
					floatingLabel="GraphQL endpoint"
					value={this.state.urlInput}
					onChangeText={this.urlChange.bind(this)}
					onBlur={this.updateEndpoint.bind(this)}/>
			</View>
		}
	}

	urlChange (next) {
		this.setState({urlInput: next});
	}

	updateEndpoint () {
		localStorage.setItem('apiUrl', this.state.urlInput);
		this.setState({url: this.state.urlInput});
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute', top: 0, right: 0, left: 0, bottom: 0,
		backgroundColor: tabContainerBackground,
		paddingLeft: 6,
	},
	headingContainer: {

	},
	tabContainer: {
		flexDirection: 'row',
	},
	tabItemContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 40,
	},
	tabCommandContainer: {
		flexDirection: 'row',
	},
	urlContainer: {
		paddingTop: 10,
		backgroundColor: '#ffffff',
	},
	urlWrapper: {
		paddingLeft: 18, paddingRight: 18,
	},
});