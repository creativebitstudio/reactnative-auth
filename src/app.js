import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase'
// no need to specify header.js since react native knows to find it under the commons folder in the index.js file
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    state = { loggedIn: null };

    // a life cycle method
    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyB5CXUMVNLucRyFqPlK2bxclW6LVyNyU6M",
            authDomain: "authapp-4bd7d.firebaseapp.com",
            databaseURL: "https://authapp-4bd7d.firebaseio.com",
            projectId: "authapp-4bd7d",
            storageBucket: "authapp-4bd7d.appspot.com",
            messagingSenderId: "1064447964842"
        });

        firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
}
    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                <LoginForm style={{backgroundColor: '#311B92'}}/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;