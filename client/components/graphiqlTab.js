import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { colors } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class GraphiQlTab extends Component {
	static propTypes = {
		active: React.PropTypes.bool,
	};

	render () {
  	const activeContainerStyle = this.props.active
				? { backgroundColor: activeTabBackground } : {},
			activeTextStyle = this.props.active
				? { color: '#ffffff' }: {};

    return <View
			className="touchable"
			style={[styles.container, activeContainerStyle]}>
			<View style={styles.titleContainer}>
				<Text style={[styles.title, activeTextStyle]}>
					{this.props.title || 'Untitled'}
				</Text>
			</View>
			<View style={styles.iconContainer}>
				<TouchableOpacity style={styles.iconWrapper}>
					<Icon name="times" color="#666666" size={14} style={{left: -1}}/>
				</TouchableOpacity>
			</View>
    </View>
  }
}

export const tabRadius = 2,
	tabContainerBackground = colors.darken(colors.darkBackground, 4),
	activeTabBackground = colors.lighten(colors.darkBackground, 10),
	inActiveTabBackground = colors.lighten(colors.darkBackground, 4);

const styles = StyleSheet.create({
  container: {
  	flexDirection: 'row',
  	paddingLeft: 18,
		marginLeft: 8, marginTop: 15,
		backgroundColor: inActiveTabBackground,
		borderTopRightRadius: tabRadius, borderTopLeftRadius: tabRadius,
	},
	titleContainer: {
		justifyContent: 'center',
	},
	title: {
		color: '#a0a0a0', fontSize: 15,
	},
	iconContainer: {
  	alignItems: 'center',
		justifyContent: 'center',
	},
	iconWrapper: {
		padding: 14, paddingLeft: 10,
	},
});