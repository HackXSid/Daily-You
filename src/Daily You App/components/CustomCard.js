import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

const CustomCard = ({ children }) => {
  return (
    <View style={styles.container}>
      <Card>{children}</Card>
    </View>
  );
};

export { CustomCard };
