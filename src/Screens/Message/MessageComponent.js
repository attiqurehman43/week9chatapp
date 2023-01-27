import React from 'react';
import {View, Text, Image} from 'react-native';
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
          {item.img &&
            item.img.map((ls, index) => {
              return (
                <View key={index}>
                  <Image
                    source={{uri: ls.uri}}
                    style={{height: 100, width: 100, marginBottom: 10}}
                  />
                </View>
              );
            })}
          {item.text && (
            <View
              style={
                status
                  ? styles.mmessage
                  : [styles.mmessage, {backgroundColor: 'rgb(194, 243, 194)'}]
              }>
              <Text>{item.text}</Text>
            </View>
          )}
        </View>
        <Text style={{marginLeft: 40}}>{item.time}</Text>
      </View>
    </View>
  );
}
