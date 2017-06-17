import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
// import from the common and index.js files, these import are tags we created from scratch and customized it to our needs
import { Button, Card, CardSection, Input, Spinner } from './common'

class LoginForm extends Component {
    // state allows us to recieve some type of feedback from the user
    // THe following names are created by us
     state = { email: '', password: '', error: '', loading: false };

     // Authentication 
      onButtonPress() {
    const { email, password } = this.state;

    // when user presses button again after error corrected, error message clears 
    this.setState({ error: '', loading: true });

     firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      }   );
    }

    onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }


  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

    render() {
    return(
      <View style={{backgroundColor: '#DD2C00', height: 640}}>
       <Card>
           <CardSection>
               <Input 
                    placeholder="user@gmail.com"
                    label="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
               />
            </CardSection>
            <CardSection>
                <Input
                    secureTextEntry
                    placeholder="password"
                    label="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
            </CardSection>

            {/*detect the error and display it*/}
            <Text style={styles.styleError}>
                {this.state.error}
            </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
        </Card>   
        </View>
    );
}
}

const styles = {
    styleError: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#fff'
    }
}

export default LoginForm;