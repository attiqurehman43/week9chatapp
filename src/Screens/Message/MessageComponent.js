import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MessageComponent({item, user}) {
  const status = item.user !== user;

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, {alignItems: 'flex-end'}]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="user" size={30} color="blue" style={styles.mvatar} />
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, {backgroundColor: 'rgb(194, 243, 194)'}]
            }>
            <Text>{item.text}</Text>
          </View>
        </View>
        <Text style={{marginLeft: 40}}>{item.time}</Text>
      </View>
    </View>
  );
}
