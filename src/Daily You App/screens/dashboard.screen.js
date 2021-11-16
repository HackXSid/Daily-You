import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Linking,
  Keyboard,
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import { useSelector } from 'react-redux';
import { Icon, Input } from 'react-native-elements';
import CustomCard from '../components/CustomCard';
import { Divider } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { OverlayContainer } from '../components/CustomOverlay';
import { moderateScale } from '../utils/scaling';

const TodayRem = ({ remInfo }) => {
  remInfo.sort((obj1, obj2) => obj1['refill'] >= obj2['refill']);

  const getPharmEasyURL = name =>
    `https://pharmeasy.in/search/all?name=${name}`;

  return (
    <View style={{ marginTop: 10, width: '100%' }}>
      <Text
        style={{
          fontSize: moderateScale(20),
          textDecorationLine: 'underline',
          marginBottom: 15,
          textAlign: 'center',
        }}>
        Upcoming Reminders
      </Text>
      <View style={{ marginTop: 10, width: '100%' }}>
        {remInfo.map((rem, index) => {
          return (
            <View
              key={index}
              style={{
                marginTop: 10,
                width: '100%',
                flexDirection: 'row',
                padding: 10,
                flexWrap: 'wrap',
              }}>
              <Text style={{ fontSize: moderateScale(17), color: 'black' }}>
                {rem.text}
              </Text>
              <Button
                title="Refill"
                onPress={() => Linking.openURL(getPharmEasyURL(rem['drug']))}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

Date.prototype.toCustomTimeString = function () {
  let hours = this.getHours();
  let ampm = 'AM';
  if (hours >= 12) {
    ampm = 'PM';
    hours %= 12;
  }
  let mins = this.getMinutes();
  if (mins < 10) mins = '0' + mins;
  return hours + ':' + mins + ' ' + ampm;
};

Date.prototype.getCurrentTime = function () {
  let hours = this.getHours();
  let mins = this.getMinutes();
  return hours * 60 + mins;
};

const getTimeStringRecord = date => {
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (hours < 10) hours = '0' + hours;
  if (mins < 10) mins = '0' + mins;
  return hours + ':' + mins;
};

const TodayMed = ({ medInfo, PatientPhoneNumber, handleIntake }) => {
  const medData = [];
  const [food, setFood] = useState('');
  const [prohibitText, setProhibitText] = useState([]);

  medInfo.forEach(med => {
    const times = med['time'];
    times.forEach(time => {
      const timeString = getTimeStringRecord(new Date(time));
      const { records } = med;
      let isDone = false;
      records.forEach(record => {
        if (
          record.timeSlot === timeString &&
          new Date(record.createdAt).toDateString() ===
            new Date().toDateString()
        ) {
          isDone = true;
        }
      });
      medData.push({
        rawTime: time,
        time: new Date(time),
        text: `${med['medicineName']}, ${med['dosage']}`,
        helper: new Date(time).getCurrentTime(),
        prohibit: med['prohibit'],
        done: isDone,
        id: med['id'],
        timeString,
      });
    });
  });

  medData.sort((obj1, obj2) => obj1['time'] <= obj2['time']);

  const currentTime = new Date().getCurrentTime();

  let closestTime = new Date();

  for (let i = 0; i < medData.length; ++i) {
    if (medData[i].helper >= currentTime) {
      closestTime = medData[i].time.getCurrentTime();
      break;
    }
  }

  const recordIntake = async (MedicationId, timeSlot) => {
    const data = {
      timeSlot,
      MedicationId,
      PatientPhoneNumber,
    };
    await axios.post(BACKEND_URL + 'record/create', data);
    Alert.alert('', 'Intake Recorded Successfully', ['Ok']);
    handleIntake();
  };

  const checkFood = async () => {
    Keyboard.dismiss();
    const response = await axios.post(BACKEND_URL + 'util/foodnlp', {
      text: food,
    });
    const { data } = response;
    const { foods } = data;
    const foodItems = foods.map(food => food.food_name.toLowerCase());

    const prohibitTextTemp = [];

    medInfo.forEach(med => {
      const { prohibit } = med;
      for (let i = 0; i < prohibit.length; ++i) {
        const foodCheck = prohibit[i].toLowerCase();
        if (
          foodItems.filter(food => {
            return food.includes(foodCheck);
          }).length > 0
        ) {
          prohibitTextTemp.push(
            `${med['medicineName']} is not allowed with ${prohibit[i]}`,
          );
          break;
        }
      }
    });
    setProhibitText(prohibitTextTemp);
  };

  return (
    <View style={{ marginTop: 10, width: '100%' }}>
      <Text
        style={{
          fontSize: moderateScale(20),
          textDecorationLine: 'underline',
          marginBottom: 15,
          textAlign: 'center',
        }}>
        Today's Medication
      </Text>
      <Input
        style={{ marginTop: 8 }}
        placeholder="What did you eat?"
        value={food}
        onChangeText={setFood}
        onSubmitEditing={checkFood}
      />
      {prohibitText.map((text, index) => (
        <Text
          key={index}
          style={{
            textAlign: 'center',
            marginTop: 5,
            fontSize: moderateScale(16),
            color: 'red',
          }}>
          {text}
        </Text>
      ))}
      <View style={{ width: '100%' }}>
        {medData.map((med, index) => {
          let background = 'white';
          if (med.time.getCurrentTime() === closestTime && !med.done) {
            background = 'lightgreen';
          }
          return (
            <React.Fragment key={index}>
              <View
                style={{
                  marginTop: 7,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: background,
                  padding: 10,
                }}>
                <Text style={{ marginRight: 10, fontSize: moderateScale(17) }}>
                  {med.time.toCustomTimeString()} --
                </Text>
                <Text style={{ fontSize: moderateScale(17), color: 'black' }}>
                  {med.text}
                </Text>
              </View>
              {!med['done'] ? (
                <Button
                  title="Record Intake"
                  containerStyle={{ width: 150 }}
                  raised
                  type="clear"
                  id={`${med.id}-Button`}
                  onPress={() => recordIntake(med.id, med.timeString)}
                />
              ) : null}
              <Divider />
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const Dashboard = () => {
  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
  };

  Date.prototype.addMins = function (h) {
    this.setMinutes(this.getMinutes() + h);
    return this;
  };

  const authReducer = useSelector(state => state.authenticationReducer);
  const { user, token } = authReducer;
  const { name } = user;
  const [medication, setMedication] = useState([]);

  const [medInfo, setMedInfo] = useState([]);
  const [remInfo, setRemInfo] = useState([]);

  const [viewTodayMed, setViewTodayMed] = useState(false);
  const [reminderToday, setReminderToday] = useState(false);

  const datediff = (first, second) => {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  };

  const getTimeFromString = time => {
    const hours = parseInt(time.slice(0, 2));
    const mins = parseInt(time.slice(3, 5));

    return hours * 60 + mins;
  };

  const fetchMedication = async () => {
    const response = await axios.get(BACKEND_URL + 'api/med/get', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = response;
    const { medications } = data;
    setMedication(
      medications.map(med => {
        const total = datediff(
          new Date(med['start_date']),
          new Date(med['end_date']),
        );
        const done = datediff(new Date(med['start_date']), new Date());

        const progress = Math.round((done / total) * 100);

        let delay = 0;
        const { records } = med;
        const daysPassed = datediff(new Date(med['start_date']), new Date());

        const pillsConsumedIdeal = daysPassed * med['time'].length;
        const pillsConsumedActual = records.length;
        records.forEach(record => {
          const { timeSlot, createdAt } = record;
          const actualTime = new Date(createdAt).getCurrentTime();
          const recordTime = getTimeFromString(timeSlot);

          const diff = Math.max(
            30,
            100 - Math.abs(actualTime - recordTime) + 30,
          );

          delay += diff / 2;
        });
        if (records.length) delay /= records.length;

        const success = Math.round(
          (pillsConsumedActual / pillsConsumedIdeal) * 100,
        );

        return {
          drug: med['drug'],
          dose: med['extraInfo']['dosage'],
          start_date: new Date(med['start_date']),
          end_date: new Date(med['end_date']),
          time: med['time'].map(tm => new Date(tm)),
          text: med['text'],
          progress: progress,
          delay: delay,
          success: success,
        };
      }),
    );

    const medInfo = [];
    const remInfo = [];
    medications.forEach(med => {
      if (new Date() > new Date(med['end_date'])) return;
      const perDay = med['time'].length;

      const d = new Date();
      const daysPassed = datediff(new Date(med['start_date']), d);
      const pillsConsumedSinceLastRefill =
        (daysPassed * perDay) % med['extraInfo']['qty'];
      const pillsLeft = med['extraInfo']['qty'] - pillsConsumedSinceLastRefill;

      const daysLeft = pillsLeft / perDay;
      const refillDate = new Date(
        new Date().setDate(d.getDate() + daysLeft),
      ).toDateString();

      remInfo.push({
        text: `${med['drug']} refill required by ${refillDate}`,
        refill: refillDate,
        drug: med['drug'],
      });
      medInfo.push({
        medicineName: med['drug'],
        dosage: med['extraInfo']['dosage'],
        time: med['time'].map(tm => new Date(tm).addHours(5).addMins(30)),
        prohibit: med['extraInfo']['food'],
        id: med['id'],
        records: med['records'],
      });
    });
    setRemInfo(remInfo);
    setMedInfo(medInfo);
  };

  useEffect(() => {
    fetchMedication();
  }, []);

  const processName = () => {
    return name.split(' ')[0];
  };

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const handleIntake = () => {
    setViewTodayMed(false);
    fetchMedication();
  };

  const getMedicationCards = () =>
    medication.map((med, index) => (
      <CustomCard styleClass={{ borderRadius: 10, marginTop: 15 }} key={index}>
        <Pressable>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>
              <Text
                style={{
                  fontSize: moderateScale(18),
                  fontWeight: '500',
                  color: 'black',
                }}>
                {med.drug}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontWeight: '400',
                  color: 'black',
                }}>
                ,{'  '}
                {med.dose}
              </Text>
            </Text>
            <Text style={{ fontSize: moderateScale(15), textAlign: 'right' }}>
              <Text>Ends On : </Text>
              <Text style={{ color: 'black' }}>
                {med.end_date.toLocaleDateString(undefined, options)}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View>
              <AnimatedCircularProgress
                size={moderateScale(100)}
                width={moderateScale(4)}
                backgroundWidth={moderateScale(13)}
                fill={med.progress}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {fill => (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#7591af',
                      fontSize: moderateScale(20),
                      fontWeight: '400',
                    }}>
                    {fill}
                  </Text>
                )}
              </AnimatedCircularProgress>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                Progress
              </Text>
            </View>
            <View>
              <AnimatedCircularProgress
                size={moderateScale(100)}
                width={moderateScale(4)}
                backgroundWidth={moderateScale(13)}
                fill={med.delay}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {fill => (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#7591af',
                      fontSize: moderateScale(20),
                      fontWeight: '400',
                    }}>
                    {fill}
                  </Text>
                )}
              </AnimatedCircularProgress>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                On Time
              </Text>
            </View>
            <View>
              <AnimatedCircularProgress
                size={moderateScale(100)}
                width={moderateScale(4)}
                backgroundWidth={moderateScale(13)}
                fill={med.success}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {fill => (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#7591af',
                      fontSize: moderateScale(20),
                      fontWeight: '400',
                    }}>
                    {fill}
                  </Text>
                )}
              </AnimatedCircularProgress>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                On Track
              </Text>
            </View>
          </View>
        </Pressable>
      </CustomCard>
    ));

  return (
    <>
      <OverlayContainer
        visible={viewTodayMed}
        toggleOverlay={() => setViewTodayMed(false)}>
        <TodayMed
          medInfo={medInfo}
          PatientPhoneNumber={user.phone_number}
          handleIntake={handleIntake}
        />
      </OverlayContainer>
      <OverlayContainer
        visible={reminderToday}
        toggleOverlay={() => setReminderToday(false)}>
        <TodayRem remInfo={remInfo} />
      </OverlayContainer>
      <ScrollView style={{ marginTop: 15 }}>
        <Text style={{ marginLeft: 15, fontSize: moderateScale(22) }}>
          <Text style={{ fontWeight: '300' }}>Welcome </Text>
          <Text style={{ color: 'black', fontWeight: '600' }}>
            {processName()}
          </Text>
        </Text>
        <View style={{ marginTop: 5, width: '96%', marginLeft: '2%' }}>
          <CustomCard
            styleClass={{
              borderRadius: 70,
            }}>
            <TouchableOpacity onPress={() => setViewTodayMed(!viewTodayMed)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    marginTop: 10,
                    marginBottom: 10,
                    fontWeight: '300',
                    marginLeft: 20,
                  }}>
                  <Text style={{ color: 'black' }}>View </Text>
                  <Text style={{ color: 'black' }}>Today's </Text>
                  <Text style={{ color: 'black' }}>Medication</Text>
                </Text>
                <Icon
                  style={{ marginRight: 20 }}
                  type="font-awesome-5"
                  name="arrow-alt-circle-right"
                  size={30}
                />
              </View>
            </TouchableOpacity>
          </CustomCard>
        </View>
        <View
          style={{
            width: '96%',
            marginLeft: '2%',
            marginBottom: 20,
          }}>
          <CustomCard
            styleClass={{
              borderRadius: 70,
              marginTop: 15,
            }}>
            <TouchableOpacity onPress={() => setReminderToday(!reminderToday)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    marginTop: 10,
                    marginBottom: 10,
                    fontWeight: '300',
                    marginLeft: 20,
                  }}>
                  <Text style={{ color: 'black' }}>Upcoming </Text>
                  <Text style={{ color: 'black' }}>Reminders</Text>
                </Text>
                <Icon
                  style={{ marginRight: 20 }}
                  type="font-awesome-5"
                  name="arrow-alt-circle-right"
                  size={30}
                />
              </View>
            </TouchableOpacity>
          </CustomCard>
        </View>
        <Divider style={{ width: '90%', marginLeft: '5%', marginBottom: 20 }} />
        <Text
          style={{
            color: 'black',
            marginLeft: 15,
            fontSize: moderateScale(19),
            fontWeight: '300',
            textAlign: 'center',
          }}>
          Current Medication
        </Text>
        <View style={{ marginTop: 5, width: '100%' }}>
          {getMedicationCards()}
        </View>
      </ScrollView>
      <View style={{ marginBottom: 20 }} />
    </>
  );
};

export { Dashboard };
