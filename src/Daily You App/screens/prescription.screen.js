import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, SearchBar, Divider } from 'react-native-elements';
import { OverlayContainer } from '../components/CustomOverlay';
import { moderateScale } from '../utils/scaling';

const mock = [
  {
    doctorName: 'Dr. Siddharth S Roy',
    createdAt: new Date(),
    doctorPhoneNo: '9051633165',
    prescription: {
      diagnosis:
        'Blood in cough - Possible case of Lung Infection\nWheezing sound detected - Maybe Windpipe Blockage',
      tests: 'Lung CT Scan\nLung Biopsy',
      medicine:
        'Calpol twice a day till 24th Nov\nChlorific before lunch twice a day, end on 12th December',
      others: 'Use Odometer twice a day\nNo meat consumption',
    },
  },
  {
    doctorName: 'Dr. Siddharth S Roy',
    createdAt: new Date(),
    doctorPhoneNo: '9051633165',
    prescription: {
      diagnosis:
        'Blood in cough - Possible case of Lung Infection\nWheezing sound detected - Maybe Windpipe Blockage',
      tests: 'Lung CT Scan\nLung Biopsy',
      medicine:
        'Calpol twice a day till 24th Nov\nChlorific before lunch twice a day, end on 12th December',
      others: 'Use Odometer twice a day\nNo meat consumption',
    },
  },
  {
    doctorName: 'Dr. Siddharth S Roy',
    createdAt: new Date(),
    doctorPhoneNo: '9051633165',
    prescription: {
      diagnosis:
        'Blood in cough - Possible case of Lung Infection\nWheezing sound detected - Maybe Windpipe Blockage',
      tests: 'Lung CT Scan\nLung Biopsy',
      medicine:
        'Calpol twice a day till 24th Nov\nChlorific before lunch twice a day, end on 12th December',
      others: 'Use Odometer twice a day\nNo meat consumption',
    },
  },
  {
    doctorName: 'Dr. Siddharth S Roy',
    createdAt: new Date(),
    doctorPhoneNo: '9051633165',
    prescription: {
      diagnosis:
        'Blood in cough - Possible case of Lung Infection\nWheezing sound detected - Maybe Windpipe Blockage',
      tests: 'Lung CT Scan\nLung Biopsy',
      medicine:
        'Calpol twice a day till 24th Nov\nChlorific before lunch twice a day, end on 12th December',
      others: 'Use Odometer twice a day\nNo meat consumption',
    },
  },
  {
    doctorName: 'Dr. Siddharth S Roy',
    createdAt: new Date(),
    doctorPhoneNo: '9051633165',
    prescription: {
      diagnosis:
        'Blood in cough - Possible case of Lung Infection\nWheezing sound detected - Maybe Windpipe Blockage',
      tests: 'Lung CT Scan\nLung Biopsy',
      medicine:
        'Calpol twice a day till 24th Nov\nChlorific before lunch twice a day, end on 12th December',
      others: 'Use Odometer twice a day\nNo meat consumption',
    },
  },
  {
    doctorName: 'Dr. Siddharth S Roy',
    createdAt: new Date(),
    doctorPhoneNo: '9051633165',
    prescription: {
      diagnosis:
        'Blood in cough - Possible case of Lung Infection\nWheezing sound detected - Maybe Windpipe Blockage',
      tests: 'Lung CT Scan\nLung Biopsy',
      medicine:
        'Calpol twice a day till 24th Nov\nChlorific before lunch twice a day, end on 12th December',
      others: 'Use Odometer twice a day\nNo meat consumption',
    },
  },
];

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
    justifyContent: 'space-between',
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
  const [open, setOpen] = useState({
    idx: -1,
    info: {},
  });

  const viewPrescription = idx => {
    setOpen({ ...open, idx, info: prescription[idx] });
  };

  const downloadPrescription = idx => {
    console.log(idx);
  };

  const fetchPrescriptions = async () => {
    setPrescription(mock);
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
