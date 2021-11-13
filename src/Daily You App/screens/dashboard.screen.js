import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import CustomCard from '../components/CustomCard';
import { Divider } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { moderateScale } from '../utils/scaling';

const mock = [
  {
    drug: 'Calpol',
    dose: 45,
    start_date: new Date(),
    end_date: new Date(),
    time: [new Date(), new Date(), new Date()],
    text: 'Calpol twice a day till 30th Nov',
    progress: 70,
    delay: 89,
    success: 95,
  },
  {
    drug: 'Montair FX',
    dose: 5,
    start_date: new Date(),
    end_date: new Date(),
    time: [new Date(), new Date(), new Date()],
    text: 'Calpol twice a day till 30th Nov',
    progress: 70,
    delay: 89,
    success: 95,
  },
];

const Dashboard = () => {
  const authReducer = useSelector(state => state.authenticationReducer);
  const { user } = authReducer;
  const { name } = user;
  const [medication, setMedication] = useState([]);

  const fetchMedication = async () => {
    setMedication(mock);
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
                {med.dose}mg
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
            <TouchableOpacity>
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
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(18),
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
