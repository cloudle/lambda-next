import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store/reducers';

import Welcome from './pages/welcome';
import Messenger from './pages/messenger';
import Navigation from './components/navigation';
import GraphiQl from './components/graphiql';
import { Button } from 'react-universal-ui';
import * as appActions from './store/action/app';

export default function AppContainer ({store}) {
	return <Provider store={store}>
		<App/>
	</Provider>
}

@connect(({app}) => {
	return {
		counter: app.counter,
	}
})

class App extends Component {
	render() {
		return <ConnectedRouter history={history}>
			<View style={styles.container}>
				<Navigation/>
				<View style={styles.mainArea}>
					<Route component={Messenger}/>
					<Route exact path="/api" component={GraphiQl}/>
					<Route exact path="/graphiql" component={GraphiQl}/>
				</View>
			</View>
		</ConnectedRouter>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, flexDirection: 'row',
	},
	mainArea: {
		flex: 1,
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