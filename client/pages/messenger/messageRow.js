import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class MessageRow extends Component {
  render () {
    return <View className="message-row" style={styles.container}>
			<View style={styles.avatarContainer}>
				<Text style={styles.avatarCharacter}>
					{avatarCharacter(this.props.owner)}
				</Text>
			</View>

			<View/>
			<View style={styles.messageContainer}>
				<Text style={styles.userName}>{this.props.owner}</Text>
				<Text
					numberOfLines={5}
					style={styles.message}>{this.props.message}</Text>
			</View>
    </View>
  }
}

function avatarCharacter (userName = '?') {
	return userName.substring(0, 1);
}

const styles = StyleSheet.create({
  container: {
		flexDirection: 'row',
		padding: 10,
	},
	avatarContainer: {
  	width: 50, height: 50, borderRadius: 5,
		backgroundColor: '#f2f2f2',
		alignItems: 'center', justifyContent: 'center',
	},
	avatarCharacter: {
		fontSize: 20, fontWeight: '200', color: '#ffffff',
	},
	messageContainer: {
		marginLeft: 10,
	},
	userName: {
  	fontWeight: '600',
	},
	message: {

	},
});