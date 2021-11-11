import React from 'react';
import { Overlay } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlayContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '75%',
    paddingBottom: 30,
  },
});

export const OverlayContainer = ({ children, visible, toggleOverlay }) => {
  return (
    <Overlay
      overlayStyle={styles.overlayContainer}
      isVisible={visible}
      onBackdropPress={toggleOverlay}>
      {children}
    </Overlay>
  );
};
