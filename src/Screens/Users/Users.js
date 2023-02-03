import React, {useEffect, useCallback, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import HeaderComponent from '../../Components/HeaderComponent';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../constants/navigationStrings';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import RoundImage from '../../Components/RoundImage';
import HorizontalLine from '../../Components/HorizontalLine';
import {useSelector} from 'react-redux';
import styles from './styles';

const Users = ({navigation}) => {
  const [data, setData] = useState([]);
  const currentUser = useSelector(state => state.auth);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await actions.fetchUsers();
      console.log('res fetchUsers', res);
      if (!!res?.data) {
        setData(
          res.data.users.filter(user => user._id !== currentUser.userData._id),
        );
      }
    } catch (error) {
      console.log('Error Raised During fetchUser', error);
    }
  };

  const onPressRight = () => {
    navigation.goBack();
  };

  const onPressItem = useCallback(item => {
    navigation.navigate(navigationStrings.MESSAGE, {data: item});
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <TouchableOpacity
          onPress={() => onPressItem(item)}
          activeOpacity={0.7}
          style={styles.hdrstl}>
          <RoundImage image={item?.profileImage} size={40} />
          <Text style={styles.userName}>{item?.name}</Text>
        </TouchableOpacity>
      );
    },
    [data],
  );

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={styles.listemptystl}>
        <Text>No User Found </Text>
      </View>
    );
  }, [data]);

  const listHeaderComponent = useCallback(() => {
    return (
      <View style={styles.hdrstl}>
        <RoundImage image={imagePath.icGroup} isStatic={true} size={40} />
        <Text style={styles.newGroupText}>{strings.NEW_GROUP}</Text>
      </View>
    );
  }, [data]);

  return (
    <WrapperContainer containerStyle={{paddingHorizontal: 0}}>
      <HeaderComponent
        rightPressActive={false}
        centerText={currentUser.userData.name}
        containerStyle={{paddingHorizontal: 8}}
        rightText={strings.CANCEL}
        rightTextStyle={{color: colors.lightBlue}}
        onPressRight={onPressRight}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={() => <HorizontalLine />}
      />
    </WrapperContainer>
  );
};

export default Users;
