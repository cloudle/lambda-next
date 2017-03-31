import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class GraphiQlTab extends Component {
	static propTypes = {
		active: React.PropTypes.bool,
	};

	render () {
  	const activeStyle = this.props.active ? {
			backgroundColor: '#ffffff',
			marginBottom: -1,
		} : {};

    return <View
			className="touchable"
			style={[styles.container, activeStyle]}>
			<View style={styles.titleContainer}>
				<Text>{this.props.title || 'Untitled'}</Text>
			</View>
			<View style={styles.iconContainer}>
				<TouchableOpacity style={styles.iconWrapper}>
					<Icon name="times" color="#666666" size={14} style={{left: -1}}/>
				</TouchableOpacity>
			</View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
  	flexDirection: 'row',
  	paddingLeft: 18,
		borderRightWidth: 1,
		borderColor: '#dddddd',
	},
	titleContainer: {
		justifyContent: 'center',
	},
	iconContainer: {
  	alignItems: 'center',
		justifyContent: 'center',
	},
	iconWrapper: {
		padding: 18, paddingLeft: 10,
	},
});