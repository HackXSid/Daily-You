import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { Card, Button, SearchBar, Divider } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import { OverlayContainer } from '../components/CustomOverlay';
import { moderateScale } from '../utils/scaling';
// import RNFetchBlob from 'rn-fetch-blob';

const getHtml = (
  doctorName,
  doctorContact,
  diagnosis,
  medicalTests,
  Medicine,
  Others,
) => {
  return `
  <body>
      <h1>Prescription</h1>
      <h4>Doctor : ${doctorName}</h4>
      <h5>Contact : ${doctorContact}</h5>
      
      <h5>Diagnosis</h5>
      <pre>
${diagnosis}
      </pre>
      
      <h5>Medical Tests</h5>
      <pre>
${medicalTests}
      </pre>
      
      <h5>Medicine</h5>
      <pre>
${Medicine}
      </pre>
      
      <h5>Others</h5>
      <pre>
${Others}
      </pre>
      <p>Generated and E-Verified by Daily You</p>
    `;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  paragraph: {
    fontSize: 19,
    paddingBottom: 10,
    fontWeight: '500',
    color: 'black',
  },
  subpara: {
    fontSize: moderateScale(13),
    paddingBottom: 5,
    fontWeight: '500',
    color: 'gray',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const CardPrescription = ({
  name,
  issue,
  doctorNumber,
  viewCB,
  downloadCB,
}) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.headContainer}>
          <Text style={styles.paragraph}>{name}</Text>
        </View>
        <View style={styles.headContainer}>
          <Text style={styles.subpara}>
            Issued: {issue.toLocaleDateString(undefined, options)}
          </Text>
          <Text style={styles.subpara}>Dr Contact: {doctorNumber}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginTop: 15,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              width: 150,
            }}
            onPress={viewCB}
            title="View"
          />
          <Button
            type="outline"
            buttonStyle={{
              borderRadius: 0,
              marginTop: 15,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              width: 150,
            }}
            onPress={downloadCB}
            title="Download"
          />
        </View>
      </Card>
    </View>
  );
};

const PrescriptionInfo = ({ info }) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return (
    <>
      <View style={styles.headContainer}>
        <Text style={styles.paragraph}>{info.doctorName}</Text>
      </View>
      <View style={{ ...styles.headContainer, width: '100%' }}>
        <Text style={styles.subpara}>
          Issued: {info.createdAt.toLocaleDateString(undefined, options)}
        </Text>
        <Text style={styles.subpara}>Dr Contact: {info.doctorPhoneNo}</Text>
      </View>
      <Divider />
      <Text
        style={{
          fontSize: moderateScale(20),
          marginBottom: 2.5,
          marginTop: 10,
          marginBottom: 15,
          color: 'gray',
          textDecorationLine: 'underline',
        }}>
        Diagnosis
      </Text>
      <View style={{ width: '100%' }}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: 'black',
            textAlign: 'left',
          }}>
          {info.prescription.diagnosis}
        </Text>
      </View>
      <Text
        style={{
          fontSize: moderateScale(20),
          marginBottom: 2.5,
          marginTop: 10,
          marginBottom: 15,
          color: 'gray',
          textDecorationLine: 'underline',
        }}>
        Medical Tests
      </Text>
      <View style={{ width: '100%' }}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: 'black',
            textAlign: 'left',
          }}>
          {info.prescription.tests}
        </Text>
      </View>
      <Text
        style={{
          fontSize: moderateScale(20),
          marginBottom: 2.5,
          marginTop: 10,
          marginBottom: 15,
          color: 'gray',
          textDecorationLine: 'underline',
        }}>
        Medicine
      </Text>
      <View style={{ width: '100%' }}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: 'black',
            textAlign: 'left',
          }}>
          {info.prescription.medicine}
        </Text>
      </View>
      <Text
        style={{
          fontSize: moderateScale(20),
          marginBottom: 2.5,
          marginTop: 10,
          marginBottom: 15,
          color: 'gray',
          textDecorationLine: 'underline',
        }}>
        Others
      </Text>
      <View style={{ width: '100%' }}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: 'black',
            textAlign: 'left',
          }}>
          {info.prescription.others}
        </Text>
      </View>
    </>
  );
};

export const Prescription = () => {
  const [search, setSearch] = useState('');
  const [prescription, setPrescription] = useState([]);
  const authReducer = useSelector(state => state.authenticationReducer);
  const { token } = authReducer;
  const [open, setOpen] = useState({
    idx: -1,
    info: {},
  });

  const viewPrescription = idx => {
    setOpen({ ...open, idx, info: prescription[idx] });
  };

  const isPermitted = async () => {
    console.log('Requesting Permission');
    if (Platform.OS === 'android') {
      try {
        console.log('Android');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        console.log(granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const downloadPrescription = async idx => {
    //   if (!(await isPermitted())) {
    //     return;
    //   }
    const html = getHtml(
      prescription[idx]['doctorName'],
      prescription[idx]['doctorPhoneNo'],
      prescription[idx]['prescription']['diagnosis'],
      prescription[idx]['prescription']['tests'],
      prescription[idx]['prescription']['medicine'],
      prescription[idx]['prescription']['others'],
    );

    Alert.alert('', 'PDF has been download', ['Ok']);

    // console.log(html);
  };
  //   const docDir = RNFetchBlob.fs.dirs.DocumentDir;
  //   let options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       //Related to the Android only
  //       useDownloadManager: true,
  //       notification: true,
  //       path: docDir + '/doc' + 'Prescription' + '.pdf',
  //       description: 'Image',
  //     },
  //   };
  //   RNFetchBlob.config(options)
  //     .fetch(
  //       'POST',
  //       'https://htmlpdfapi.com/api/v1/pdf',
  //       {
  //         Authentication: 'Token Bp7-2jRwzVeie-dnskfnl',
  //       },
  //       { html },
  //     )
  //     .then(res => {
  //       console.log('res -> ', JSON.stringify(res));
  //     });
  // };

  const fetchPrescriptions = async () => {
    const response = await axios.get(BACKEND_URL + 'api/pres/get', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = response;
    const { prescriptions } = data;
    setPrescription(
      prescriptions.map(pres => ({
        doctorName: pres['Doctor.name'],
        createdAt: new Date(pres['createdAt']),
        doctorPhoneNo: pres['Doctor.phone_number'],
        prescription: {
          diagnosis: pres['diagnosis'],
          tests: pres['tests'],
          medicine: pres['medicine'],
          others: pres['others'],
        },
      })),
    );
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const getPrescriptions = () => {
    return prescription.map((prescr, index) => {
      return (
        <CardPrescription
          name={prescr.doctorName}
          issue={prescr.createdAt}
          doctorNumber={prescr.doctorPhoneNo}
          key={index}
          viewCB={() => viewPrescription(index)}
          downloadCB={() => downloadPrescription(index)}
        />
      );
    });
  };

  return (
    <>
      <SearchBar
        placeholder="Search by doctor, date..."
        onChangeText={setSearch}
        value={search}
      />
      <OverlayContainer
        visible={open.idx !== -1}
        toggleOverlay={() =>
          setOpen({
            idx: -1,
            info: {},
          })
        }>
        <PrescriptionInfo info={open.info} />
      </OverlayContainer>
      <ScrollView>
        {getPrescriptions()}
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </>
  );
};
