import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { sizes, colors } from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

@connect(({app}) => {
	return {

	}
})

export default class NavigationComponent extends Component {
  render () {
    return <View style={styles.container}>
			{menuItems.map((menu, i) => {
				return <TouchableOpacity
					key={i} style={styles.menuItemWrapper}
					onPress={navigatePage.bind(this, menu)}>
					<Icon name={menu.icon} style={styles.menuIcon}/>
				</TouchableOpacity>
			})}
    </View>
  }
}

function navigatePage (route) {
	this.props.dispatch(push(route.path));
}

const styles = StyleSheet.create({
	container: {
		width: sizes.navigationWidth,
		backgroundColor: colors.darken(colors.darkBackground, 5),
		paddingTop: 62,
	},
	menuItemWrapper: {
		alignItems: 'center', justifyContent: 'center',
		height: sizes.navigationWidth,
		backgroundColor: colors.darken(colors.darkBackground, 2),
	},
	menuIcon: {
		color: '#ffffff',
		fontSize: 22,
	},
});

const menuItems = [{
	icon: 'chat',
	path: '/chat',
}, {
	icon: 'import-contacts',
	path: '/api',
}];