import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Badge, Divider } from 'react-native-elements';
import { DefaultTheme } from '@react-navigation/native';
import { moderateScale } from '../utils/scaling';

const med = { key: 'Medicines', color: 'green', selectedDotColor: 'blue' };
const rem = { key: 'Reminders', color: 'red' };

const mock1 = {
  '2021-11-14': [
    `Calpol refill required by ${new Date().toDateString()}`,
    `Montair FX refill required by ${new Date().toDateString()}`,
    `Calpol refill required by ${new Date().toDateString()}`,
    `Montair FX refill required by ${new Date().toDateString()}`,
    `Calpol refill required by ${new Date().toDateString()}`,
    `Montair FX refill required by ${new Date().toDateString()}`,
    `Calpol refill required by ${new Date().toDateString()}`,
    `Montair FX refill required by ${new Date().toDateString()}`,
  ],
  '2021-11-18': [
    `Calpol refill required by ${new Date().toDateString()}`,
    `Montair FX refill required by ${new Date().toDateString()}`,
  ],
};

const mock = {
  '2021-11-14': [
    { medicineName: 'Calpol', dosage: '25mg', time: ['10:00', '22:00'] },
    {
      medicineName: 'Montair FX',
      dosage: '45mg',
      time: ['12:00', '14:00', '22:00'],
    },
  ],
  '2021-11-15': [
    { medicineName: 'Calpol', dosage: '25mg', time: ['10:00', '22:00'] },
    {
      medicineName: 'Montair FX',
      dosage: '45mg',
      time: ['12:00', '14:00', '22:00'],
    },
  ],
  '2021-11-16': [
    { medicineName: 'Calpol', dosage: '25mg', time: ['10:00', '22:00'] },
    {
      medicineName: 'Montair FX',
      dosage: '45mg',
      time: ['12:00', '14:00', '22:00'],
    },
  ],
  '2021-11-17': [
    { medicineName: 'Calpol', dosage: '25mg', time: ['10:00', '22:00'] },
    {
      medicineName: 'Montair FX',
      dosage: '45mg',
      time: ['12:00', '14:00', '22:00'],
    },
  ],
};

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
  const [reminders, setReminders] = useState([]);
  const [medication, setMedications] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const fetchInfo = async () => {
    setReminders(mock1);
    setMedications(mock);
  };

  useEffect(() => {
    fetchInfo();
  });

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
