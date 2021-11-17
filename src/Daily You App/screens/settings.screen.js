import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { BACKEND_URL } from '../constants';
import CustomCard from '../components/CustomCard';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { OverlayContainer } from '../components/CustomOverlay';
import { moderateScale } from '../utils/scaling';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
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

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

Date.prototype.addMins = function (h) {
  this.setMinutes(this.getMinutes() + h);
  return this;
};

const getTimeStringRecord = date => {
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (hours < 10) hours = '0' + hours;
  if (mins < 10) mins = '0' + mins;
  return hours + ':' + mins;
};

const datediff = (first, second) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

const getTimeFromString = time => {
  const hours = parseInt(time.slice(0, 2));
  const mins = parseInt(time.slice(3, 5));

  return hours * 60 + mins;
};

export const Settings = ({ logout, user, token }) => {
  const [users, setUsers] = useState([]);
  const [emergencyView, setEmergencyView] = useState(-1);
  const [medication, setMedication] = useState([]);

  const fetch = async () => {
    const response = await axios.post(BACKEND_URL + 'util/emergency', {
      phone_number: user.phone_number,
    });
    const { data } = response;
    const { users } = data;
    setUsers(users);
  };

  const fetchInfo = async () => {
    if (medication.length !== 0) return;
    const response = await axios.post(
      BACKEND_URL + 'api/med/doctorGet',
      {
        phone_number: emergencyView,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
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
            100 - Math.abs(actualTime - recordTime) / 10 + 30,
          );

          delay += diff / 2;
        });
        if (records.length) delay /= records.length;

        const success =
          pillsConsumedIdeal === 0
            ? 0
            : Math.round((pillsConsumedActual / pillsConsumedIdeal) * 100);

        delay = Math.round(delay);

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
          extraInfo: med['extraInfo'],
          id: med['id'],
          records: med['records'],
          original: med,
        };
      }),
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (emergencyView === -1) return;
    fetchInfo();
  }, [emergencyView]);

  const getMedicationCards = () =>
    medication.map((med, index) => (
      <CustomCard styleClass={{ borderRadius: 10, marginTop: 15 }} key={index}>
        <Pressable onPress={() => setMedInfoView(index)}>
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

  const list = [
    {
      title: 'Personal Profile',
      icon: 'person',
      type: 'ionicons',
    },
    {
      title: 'Data Usage',
      icon: 'data-usage',
      type: 'material',
    },
    {
      title: 'Privacy Policy',
      icon: 'privacy-tip',
      type: 'material',
    },
    {
      title: 'Terms and Conditions',
      icon: 'text-document',
      type: 'entypo',
    },
    {
      title: 'Contact Helpline',
      icon: 'support-agent',
      type: 'material',
    },
    {
      title: 'Contact Developer',
      icon: 'developer-mode',
      type: 'material',
    },
    {
      title: 'Log Out',
      icon: 'logout',
      type: 'material',
      special: true,
      fn: logout,
    },
  ];

  return (
    <>
      <OverlayContainer
        toggleOverlay={() => setEmergencyView(-1)}
        visible={emergencyView !== -1}>
        <>
          <Text
            style={{
              fontSize: moderateScale(20),
              textDecorationLine: 'underline',
              marginBottom: 15,
              textAlign: 'center',
            }}>
            {'Medication Info'}
          </Text>
          <ScrollView style={{ height: 400 }}>
            {getMedicationCards()}
          </ScrollView>
        </>
      </OverlayContainer>
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              if (item.special) {
                item.fn();
              }
            }}>
            <Icon name={item.icon} type={item.type} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
        <Text
          style={{
            marginTop: 15,
            textAlign: 'center',
            fontSize: 19,
            color: 'black',
            textDecorationLine: 'underline',
          }}>
          Emergency Contacts
        </Text>
        {users.map(user => (
          <CustomCard key={user.phone_number}>
            <Pressable onPress={() => setEmergencyView(user.phone_number)}>
              <Text style={{ fontSize: 20, color: 'black' }}>{user.name}</Text>
            </Pressable>
          </CustomCard>
        ))}
      </View>
    </>
  );
};
