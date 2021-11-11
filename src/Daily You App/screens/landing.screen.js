import axios from 'axios';
import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { BACKEND_URL } from '../constants';
import { SignUp } from './signup.screen';

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
  landingImage: {
    minWidth: '100%',
    minHeight: '35%',
  },
  headLineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '7%',
  },
  headLine: {
    fontSize: 40,
    fontWeight: '600',
  },
  subHeadline: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: '400',
    color: '#eb8a90',
  },
  actionArea: {
    display: 'flex',
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginArea: {
    marginTop: 20,
    marginBottom: 40,
    width: '90%',
    marginLeft: '5%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    padding: 10,
  },
});

const Landing = ({ login }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [screen, setScreen] = useState('Login');

  if (screen === 'SignUp') return <SignUp goBack={() => setScreen('Login')} />;

  const doLogin = async () => {
    const data = { phone, password };
    try {
      const response = await axios.post(BACKEND_URL + 'auth/login', data);
      const { data: respData } = response;
      const { user, token } = respData;
      login(user, token);
    } catch (err) {
      Alert.alert('', 'Invalid Phone Number and Password.', [
        {
          text: 'Ok',
        },
      ]);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/Landing_Image.jpeg')}
          style={styles.landingImage}
        />
        <View style={styles.headLineContainer}>
          <Text style={styles.headLine}>Daily You</Text>
          <Text style={styles.subHeadline}>Your Medical Assistant</Text>
        </View>
        <View style={styles.loginArea}>
          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
            keyboardType="number-pad"
            placeholder="Phone Number"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
          />
          <Text style={{ textAlign: 'center', marginTop: 15 }}>
            <Text>In case you forgot here, </Text>
            <Text style={{ color: 'lightblue' }}>click here </Text>
            <Text>to reset your password</Text>
          </Text>
        </View>
        <View style={styles.actionArea}>
          <CustomButton text="Login" type="primary" fnc={doLogin} />
          <CustomButton
            text="Sign Up"
            type="secondary"
            fnc={() => setScreen('SignUp')}
          />
        </View>
      </View>
    </>
  );
};

export { Landing };
