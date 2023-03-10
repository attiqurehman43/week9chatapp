import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import CountryPicker from '../../Components/CountryPicker';
import HeaderComponent from '../../Components/HeaderComponent';
import HorizontalLine from '../../Components/HorizontalLine';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../constants/navigationStrings';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import styles from './styles';

const PhoneNumber = ({navigation}) => {
  const [state, setState] = useState({
    selectedCountry: {
      name: 'Pakistan',
      dialCode: '+92',
      isoCode: 'PK',
      flag: 'https://cdn.kcak11.com/CountryFlags/countries/pk.svg',
    },
    phoneNumber: '',
  });
  const {selectedCountry, phoneNumber} = state;

  const updateState = data => setState(state => ({...state, ...data}));

  const fetchCountry = data => {
    updateState({selectedCountry: data});
  };

  const leftCustomView = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={{height: 20, width: 20}} source={imagePath.icBack} />
      </TouchableOpacity>
    );
  };

  const onDone = () => {
    navigation.navigate(navigationStrings.EDIT_PROFILE, {data: state});
  };

  return (
    <WrapperContainer containerStyle={{paddingHorizontal: 0}}>
      <HeaderComponent
        centerText={strings.ENTER_YOUR_PHONE_NUMBER}
        containerStyle={{paddingHorizontal: 8}}
        leftCustomView={leftCustomView}
        isLeftView={true}
        onPressRight={onDone}
        rightTextStyle={{
          color: phoneNumber.length > 8 ? colors.lightBlue : colors.grey,
          fontFamily:
            phoneNumber.length > 8 ? fontFamily.bold : fontFamily.regular,
        }}
        rightPressActive={phoneNumber.length < 8}
      />
      <Text style={styles.descStyle}>{strings.CHATBES_WILL_SEND}</Text>
      <HorizontalLine />
      <CountryPicker
        fetchCountry={fetchCountry}
        value={selectedCountry?.name}
      />

      <View style={styles.phoneInputStyle}>
        <Text style={styles.dialCodeStyle}>{selectedCountry?.dialCode}</Text>
        <View style={{flex: 1}}>
          <TextInput
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            style={styles.inputStyle}
            onChangeText={text => updateState({phoneNumber: text})}
          />
        </View>
      </View>
    </WrapperContainer>
  );
};

export default PhoneNumber;
