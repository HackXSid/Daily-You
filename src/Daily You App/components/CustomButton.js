import React from 'react';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

const CustomButton = ({ text, type, fnc }) => {
  return (
    <AwesomeButtonRick
      onPress={next => {
        fnc();
        next();
      }}
      raiseLevel={4}
      textSize={19}
      type={type}
      width={170}>
      {text}
    </AwesomeButtonRick>
  );
};

export { CustomButton };
