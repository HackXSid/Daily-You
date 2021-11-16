import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Badge, Divider } from 'react-native-elements';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import { useSelector } from 'react-redux';
import { moderateScale } from '../utils/scaling';

const med = { key: 'Medicines', color: 'green', selectedDotColor: 'blue' };
const rem = { key: 'Reminders', color: 'red' };

const THRESHOLD = 3;

const arrayToString = arr => {
  let str = '';
  arr.map((ele, index) => {
    str += ele;
    if (index !== arr.length - 1) str += ', ';
  });
  return str;
};

const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

export const DoseCalendar = () => {
  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
  };

  Date.prototype.addMins = function (h) {
    this.setMinutes(this.getMinutes() + h);
    return this;
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

  const [reminders, setReminders] = useState([]);
  const [medication, setMedications] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const authReducer = useSelector(state => state.authenticationReducer);
  const { token } = authReducer;

  const getRefills = () => {
    const dateFormat = formatDate(selectedDate);
    const refills = reminders[dateFormat];
    if (refills && refills.length > 0) {
      return refills.map((refill, index) => (
        <Text
          key={index}
          style={{
            marginTop: 15,
            fontSize: moderateScale(15),
          }}>
          {index + 1}. {refill}
        </Text>
      ));
    } else {
      return (
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            fontSize: moderateScale(17),
            color: 'red',
          }}>
          No Refill Reminder Today
        </Text>
      );
    }
  };

  const getMedications = () => {
    const dateFormat = formatDate(selectedDate);
    const medications = medication[dateFormat];
    if (medications && medications.length > 0) {
      return medications.map((med, index) => (
        <Text
          key={index}
          style={{
            marginTop: 15,
            fontSize: moderateScale(15),
          }}>
          {index + 1}. {med.medicineName}, {med.dosage},{' '}
          {arrayToString(med.time)}
        </Text>
      ));
    } else {
      return (
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            fontSize: moderateScale(17),
            color: 'green',
          }}>
          No Medication Today
        </Text>
      );
    }
  };

  const datediff = (first, second) => {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  };

  const fetchInfo = async () => {
    const response = await axios.get(BACKEND_URL + 'api/med/get', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = response;
    const { medications } = data;
    const medInfo = {};
    const remInfo = {};
    medications.map(med => {
      const now = new Date();
      const end = new Date(med['end_date']);

      const perDay = med['time'].length;

      for (let d = now; d <= end; d.setDate(d.getDate() + 1)) {
        const daysPassed = datediff(new Date(med['start_date']), d);
        const pillsConsumedSinceLastRefill =
          (daysPassed * perDay) % med['extraInfo']['qty'];
        const pillsLeft =
          med['extraInfo']['qty'] - pillsConsumedSinceLastRefill;

        const daysLeft = pillsLeft / perDay;
        const refillDate = new Date(
          new Date().setDate(d.getDate() + 3),
        ).toDateString();

        if (daysLeft === THRESHOLD) {
          if (remInfo.hasOwnProperty(formatDate(d))) {
            remInfo[formatDate(d)].push(
              `${med['drug']} refill required by ${refillDate}`,
            );
          } else {
            remInfo[formatDate(d)] = [
              `${med['drug']} refill required by ${refillDate}`,
            ];
          }
        }

        if (medInfo.hasOwnProperty(formatDate(d))) {
          medInfo[formatDate(d)].push({
            medicineName: med['drug'],
            dosage: med['extraInfo']['dosage'],
            time: med['time'].map(tm =>
              new Date(tm).addHours(5).addMins(30).toCustomTimeString(),
            ),
          });
        } else {
          medInfo[formatDate(d)] = [
            {
              medicineName: med['drug'],
              dosage: med['extraInfo']['dosage'],
              time: med['time'].map(tm =>
                new Date(tm).addHours(5).addMins(30).toCustomTimeString(),
              ),
            },
          ];
        }
      }
    });
    setMedications(medInfo);
    setReminders(remInfo);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const markDates = () => {
    const dates = {};
    for (const date in medication) {
      dates[date] = { dots: [med] };
    }
    for (const date in reminders) {
      if (dates.hasOwnProperty(date)) {
        dates[date] = { dots: [med, rem] };
      } else {
        dates[date] = { dots: [rem] };
      }
    }
    return dates;
  };

  return (
    <>
      <ScrollView>
        <Calendar
          current={new Date()}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            height: 350,
          }}
          onDayPress={date => setSelectedDate(new Date(date.dateString))}
          markingType={'multi-dot'}
          markedDates={markDates()}
          theme={{
            calendarBackground: 'rgb(245, 245, 245)',
          }}
        />
        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '80%',
            marginLeft: '10%',
            marginBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Badge
              containerStyle={{ marginRight: 10 }}
              badgeStyle={{ width: 20, height: 20 }}
              status="success"
            />
            <Text style={{ fontSize: 20, color: 'green' }}>Medication</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Badge
              containerStyle={{ marginRight: 10 }}
              badgeStyle={{ width: 20, height: 20 }}
              status="error"
            />
            <Text style={{ fontSize: 20, color: 'red' }}>Refill</Text>
          </View>
        </View>
        <Divider />
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontSize: moderateScale(22),
            textDecorationLine: 'underline',
            color: 'black',
          }}>
          {selectedDate.toDateString()}
        </Text>
        <View style={{ marginTop: 20, width: '90%', marginLeft: '5%' }}>
          <Text
            style={{
              fontSize: moderateScale(20),
              color: 'green',
              marginBottom: 10,
              textDecorationLine: 'underline',
            }}>
            Medications
          </Text>
          <View>{getMedications()}</View>
          <Text
            style={{
              fontSize: moderateScale(20),
              marginTop: 20,
              marginBottom: 10,
              color: 'red',
              textDecorationLine: 'underline',
            }}>
            Refills
          </Text>
          <View>{getRefills()}</View>
          <View style={{ marginBottom: 20 }} />
        </View>
      </ScrollView>
    </>
  );
};
