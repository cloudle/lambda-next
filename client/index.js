import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Button } from 'react-universal-ui';
import * as appActions from './store/action/app';

@connect(({app}) => {
	return {
		counter: app.counter,
	}
})

export default class app extends Component {
	render() {
		return <View style={styles.container}>
			<Text>Open your Chrome console!</Text>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	counterButton: {
		backgroundColor: '#00bcd4',
		width: 120, marginTop: 10,
	}
});