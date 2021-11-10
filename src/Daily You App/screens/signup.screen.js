import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import { CustomButton } from '../components/CustomButton';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 30,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    padding: 10,
  },
  inputAndroid: {
    marginTop: 30,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    padding: 10,
  },
});

const styles = StyleSheet.create({
  backText: {
    fontWeight: '500',
    fontSize: 20,
  },
  backContainer: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  headLineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
  },
  headLine: {
    fontSize: 35,
    fontWeight: '600',
  },
  subHeadline: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: '400',
    color: '#eb8a90',
  },
  signupArea: {
    marginTop: 20,
    marginBottom: 40,
    width: '90%',
    marginLeft: '5%',
  },
  inputText: {
    marginTop: 30,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 15,
  },
  borderPicker: {},
});

const SignUp = ({ goBack }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [race, setRace] = useState('');
  const [marital, setMarital] = useState('');
  const [address, setAddress] = useState('');
  const [emergency_phone_number, setEmergencyPhoneNumber] = useState('');
  const [open, setOpen] = useState(false);

  const register = () => {};

  return (
    <ScrollView style={{ minHeight: '100%' }}>
      <DatePicker
        modal
        open={open}
        date={dob}
        onConfirm={date => {
          setOpen(false);
          setDob(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
      />
      <TouchableOpacity onPress={goBack} style={styles.backContainer}>
        <AntDesign
          style={{ marginRight: 10 }}
          name="back"
          size={30}
          color="#900"
        />
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.headLineContainer}>
        <Text style={styles.headLine}>Welcome to Daily You</Text>
        <Text style={styles.subHeadline}>Your Medical Assistant</Text>
      </View>
      <View style={styles.signupArea}>
        <TextInput
          style={styles.inputText}
          onChangeText={setName}
          value={name}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.inputText}
          onChangeText={setPhone}
          value={phone}
          keyboardType="number-pad"
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.inputText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={styles.inputText}>
            Date Of Birth : {dob.toDateString()}
          </Text>
        </TouchableOpacity>
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={setGender}
          value={gender}
          items={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Non-Binary', value: 'non-binary' },
          ]}
          placeholder={{
            label: 'Select Gender',
            value: '',
            color: 'gray',
          }}
        />
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={setRace}
          value={race}
          items={[
            { label: 'White', value: 'white' },
            { label: 'Native', value: 'native' },
            { label: 'Asian', value: 'asian' },
            { label: 'Black', value: 'black' },
            { label: 'Other', value: 'other' },
          ]}
          placeholder={{
            label: 'Select Race',
            value: '',
            color: 'gray',
          }}
        />
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={setMarital}
          value={marital}
          items={[
            { label: 'Married', value: 'M' },
            { label: 'Not Married', value: 'S' },
            { label: 'Cannot Specify', value: 'O' },
          ]}
          placeholder={{
            label: 'Select Marital Status',
            value: '',
            color: 'gray',
          }}
        />
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={setEthnicity}
          value={ethnicity}
          items={[
            { label: 'Hispanic', value: 'hispanic' },
            { label: 'Non-Hispanic', value: 'non-hispanic' },
            { label: 'Other', value: 'other' },
          ]}
          placeholder={{
            label: 'Select Ethnicity',
            value: '',
            color: 'gray',
          }}
        />
        <TextInput
          style={styles.inputText}
          onChangeText={setAddress}
          value={address}
          placeholder="Address"
        />
        <TextInput
          style={styles.inputText}
          onChangeText={setEmergencyPhoneNumber}
          value={emergency_phone_number}
          keyboardType="number-pad"
          placeholder="Emergency Contact Number"
        />
      </View>
      <View
        style={{
          marginBottom: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomButton text="Register" type="primary" fnc={register} />
      </View>
    </ScrollView>
  );
};

export { SignUp };
