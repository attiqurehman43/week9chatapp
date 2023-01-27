import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import MessageComponent from './MessageComponent';
import socketServices from '../../utils/socketService';
import {styles} from './styles';
import imagePath from '../../constants/imagePath';
import RoundImage from '../../Components/RoundImage';
import EmojiSelector from 'react-native-emoji-selector';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import FilePicker, {types} from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Entypo';

const Messaging = ({navigation, route}) => {
  console.log('route', route);
  const {data} = route.params;

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const [fileData, setFileData] = useState([]);
  const [isImogiOpen, setIsImogiOpen] = useState(false);

  useEffect(() => {
    socketServices.initializeSocket();
    generatUserName();
  }, []);

  function generatUserName() {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setUser(result);
  }

  useEffect(() => {
    socketServices.on('received_message', msg => {
      console.log('Message Received in ReactApp', msg);

      setChatMessages(previousData => [...previousData, msg]);
    });
  }, []);

  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    const time = hour + ':' + mins;

    socketServices.emit('send_message', {
      id: message.length + 1,
      text: message,
      img: fileData.length > 0 && fileData,
      user: user,
      time: time,
    });
    setMessage('');
    setFileData([]);
  };

  const handleFilePicker = async () => {
    try {
      const response = await FilePicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
        type: [types.images, types.allFiles],
      });

      setFileData(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.flexView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: moderateScale(12),
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Image source={imagePath.icBack} />
          </TouchableOpacity>
          <View style={styles.nameView}>
            <RoundImage size={40} image={data?.profileImage} />
            <Text style={styles.nameTextStyle}>{data?.name}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            marginHorizontal: moderateScale(14),
          }}>
          <TouchableOpacity>
            <Image source={imagePath.icVideo} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: moderateScale(12)}}>
            <Image source={imagePath.icCalls} />
          </TouchableOpacity>
        </View>
      </View>

      {/* //Rest Screen */}
      <ImageBackground source={imagePath.icBigLight} style={{flex: 1}}>
        <View style={styles.messagingscreen}>
          <View
            style={[
              styles.messagingscreen,
              {paddingVertical: 15, paddingHorizontal: 10},
            ]}>
            {chatMessages ? (
              <FlatList
                data={chatMessages}
                renderItem={({item}) => (
                  <MessageComponent item={item} user={user} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : null}
          </View>

          <View style={styles.messaginginputContainer}>
            <TouchableOpacity
              onPress={() => handleFilePicker()}
              style={{
                marginTop: moderateScale(8),
              }}>
              <Image source={imagePath.icPlus} />
            </TouchableOpacity>
            <View
              style={{
                ...styles.messaginginput,
                ...{justifyContent: 'space-between', flexDirection: 'row'},
              }}>
              {fileData.length > 0
                ? fileData.map((ls, index) => {
                    return (
                      <View key={index}>
                        <Image
                          source={{uri: ls.uri}}
                          style={{height: 100, width: 100, marginBottom: 10}}
                        />
                      </View>
                    );
                  })
                : null}
              <TextInput
                style={{flex: 1}}
                value={message}
                onChangeText={value => setMessage(value)}
                placeholder="Enter Message here"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setIsImogiOpen(!isImogiOpen)}
                style={{alignSelf: 'center'}}>
                <Icon name="emoji-neutral" size={25} color="grey" />
              </TouchableOpacity>
            </View>

            <Pressable
              style={styles.messagingbuttonContainer}
              onPress={handleNewMessage}>
              <View>
                <Text style={{color: '#f2f0f1', fontSize: 15}}>SEND</Text>
              </View>
            </Pressable>
          </View>
          {isImogiOpen ? (
            <EmojiSelector
              onEmojiSelected={emoji => setMessage(message + emoji)}
            />
          ) : null}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Messaging;
