import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderComponent from '../../Components/HeaderComponent';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../constants/navigationStrings';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';

const Chats = ({navigation}) => {
  const [data, setData] = useState([]);

  const leftCustomView = () => {
    return (
      <TouchableOpacity>
        {data.length > 0 ? <Text>Edit</Text> : <View style={{height: 20}} />}
        <Text style={styles.hdngstl}>{strings.CHATS}</Text>
      </TouchableOpacity>
    );
  };
  const onPressRight = () => {
    navigation.navigate(navigationStrings.USERS);
  };

  const renderItem = useCallback(
    ({item, index}) => {
      return <Text>Flat Item</Text>;
    },
    [data],
  );

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={styles.listemptystl}>
        <View>
          <Text style={styles.commstl}>
            <Text>{strings.TAP_ON}</Text>
            <Image source={imagePath.icEdit} />
            {strings.IN_THE_TOP_RIGHT_}
          </Text>
        </View>
        <Text
          style={{
            ...styles.commstl,
            color: colors.grey,
            marginTop: moderateScaleVertical(16),
          }}>
          {strings.YOU_CAN_CHAT_WITH_CONTACTS}
        </Text>
      </View>
    );
  }, [data]);

  return (
    <WrapperContainer containerStyle={{paddingHorizontal: 0}}>
      <HeaderComponent
        rightPressActive={false}
        centerText={''}
        containerStyle={{paddingHorizontal: 8}}
        leftCustomView={leftCustomView}
        isLeftView={true}
        rightImg={imagePath.icEdit}
        onPressRight={onPressRight}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        contentContainerStyle={{flexGrow: 1}}
      />
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  listemptystl: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
  },
  commstl: {
    fontSize: textScale(22),
    fontFamily: fontFamily.regular,
  },
  hdngstl: {
    fontSize: textScale(26),
    fontFamily: fontFamily.bold,
  },
});

export default Chats;
