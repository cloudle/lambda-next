import React, { Component } from 'react';
import { ScrollView, TextInput, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { subscribe, query, Relay, colors } from '../../utils';
import { clientId } from '../../utils/subscription';
import * as queries from '../../queries';
import * as mutations from '../../mutations';
import * as appActions from '../../store/action/app';
import MessageRow from './messageRow';

@connect(({app}) => {
	return {
		userName: app.userName,
		messages: app.messages,
	}
})

export default class MessengerPage extends Component {
	constructor (props) {
	  super(props);
	  this.state = {
	    message: '',
	  }
	}

	componentWillMount () {
		query(queries.messages)
			.then(response => this.props.dispatch(appActions.loadMessages(response.messages)))
			.catch(error => console.log(error));

		subscribe('newMessengerMessage', `subscription {
				newMessengerMessage {
					owner
					message
				}
			}`, {}, (message) => {
			if (!message.newMessengerMessage) {
				this.props.dispatch(appActions.addMessage(JSON.parse(message), true));
				this.messageContainer.scrollTo({y: 9999999});
			}
		});
	}

  render () {
    return <View style={styles.container}>
			<View style={styles.toolbarArea}>
				<View style={styles.toolbarMainWrapper}/>
				<View style={styles.toolbarRightWrapper}>
					<View style={styles.userNameInputWrapper}>
						<TextInput
							style={styles.userNameInput}
							value={this.props.userName}
							onChangeText={this::onUserNameChange}
							placeholder="Your name"/>
					</View>
				</View>
			</View>

			<ScrollView
				ref={(ref) => this.messageContainer = ref}
				style={styles.messageArea}>
				{this.props.messages.map((message, i) => {
					return <MessageRow key={i} {...message}/>
				})}
			</ScrollView>

			<View style={styles.inputArea}>
				<View style={styles.inputWrapper}>
					<TextInput
						autoFocus={true} blurOnSubmit={false}
						style={styles.messengerInput}
						placeholder="Enter your message and press Enter to send.."
						value={this.state.message}
						onKeyPress={this::onMessengerInputKeyPress}
						onChangeText={this::onMessengerTextChange}/>
				</View>
			</View>
    </View>
  }
}

function onMessengerInputKeyPress ({nativeEvent}) {
	if (nativeEvent.charCode === 13) {
		const newMessage = {
			ownerId: clientId,
			owner: this.props.userName,
			message: this.state.message,
		};

		this.setState({message: ''});
		this.props.dispatch(appActions.addMessage(newMessage));
		query(mutations.addMessage, newMessage);
		this.messageContainer.scrollTo({y: 9999999});
	}
}

function onMessengerTextChange (nextValue) {
	this.setState({message: nextValue});
}

function onUserNameChange (nextValue) {
	localStorage.setItem('userName', nextValue);
	this.props.dispatch(appActions.updateUserName(nextValue));
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	toolbarArea: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: '#f2f2f2',
	},
	toolbarMainWrapper: {
		flex: 1,
	},
	toolbarRightWrapper: {
		margin: 6, marginRight: 15,
		borderColor: '#f0f0f0', borderWidth: 1, borderRadius: 5,
	},
	userNameInputWrapper: {
		padding: 8,
	},
	userNameInput: {

	},
	messageArea: {
		flex: 1,
	},
	inputArea: {

	},
	inputWrapper: {
		borderWidth: 2, borderColor: '#f2f2f2', borderRadius: 5,
		margin: 10, marginTop: 0,
	},
	messengerInput: {
		padding: 8, fontSize: 15,
	},
});

const messages = [{
	owner: "Cloud Le",
	message: "Hi there?",
}, {
	owner: "Anonymous",
	message: "Yay, what's up?",
}];