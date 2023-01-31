import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import navigationStrings from '../../constants/navigationStrings';
import fontFamily from '../../styles/fontFamily';
import {moderateScale} from '../../styles/responsiveSize';
import {saveUserData} from '../../redux/reducers/auth';
import store from '../../redux/store';

const Settings = () => {
  const SignOut = () => {
    store.dispatch(saveUserData(undefined));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={SignOut}
        style={{
          height: 40,
          width: 90,
          borderRadius: 40,
          backgroundColor: 'green',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: fontFamily.bold,
            marginTop: moderateScale(8),
            marginLeft: moderateScale(10),
          }}>
          SignOut
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
