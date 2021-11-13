import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';

export default CustomCard = ({ styleClass, children }) => {
  return (
    <View>
      <Card containerStyle={styleClass}>{children}</Card>
    </View>
  );
};
