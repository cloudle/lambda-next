import 'babel-polyfill';
import React, { Component } from 'react';
import ReactNative, { View, Text, AsyncStorage } from 'react-native';
import { AppContainer } from 'react-hot-loader';

import app from './client';
import configureStore from './client/store';
import * as appActions from './client/store/action/app';
const store = configureStore();

let render = Component => {
	const rootEl = document.getElementById('root');
	setTimeout(() => {
		ReactNative.render(
			<AppContainer>
				<Component store={store}/>
			</AppContainer>,
			rootEl
		);
	}, 0);
};

render(app);

if(module.hot) {
	module.hot.accept('./client', () => {
		const nextApp = require('./client').default;
		render(nextApp);

		/* Beautiful workaround:
		 Force update unrelated modules in the next execution loop.*/
		setTimeout(() => store.dispatch(appActions.increaseCounter()), 0);
	});
}