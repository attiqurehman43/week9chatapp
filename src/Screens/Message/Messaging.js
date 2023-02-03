import React, {useState, useEffect, useRef} from 'react';
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
import {moderateScale} from '../../styles/responsiveSize';
import FilePicker, {types} from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import store from '../../redux/store';
import {saveMessages} from '../../redux/reducers/MessageRed';

const Messaging = ({navigation, route}) => {
  const {data} = route.params;

  const currentUser = useSelector(state => state.auth);
  const storedMsg = useSelector(state => state.MessageRed.messages);

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [reciever, setReciever] = useState(data._id);
  const [fileData, setFileData] = useState([]);
  const [isImogiOpen, setIsImogiOpen] = useState(false);
  const refContainer = useRef(null);

  useEffect(() => {
    socketServices.initializeSocket();
    if (chatMessages.length === 0) {
      storedMsg.map(msg => {
        getMessage(msg, false);
      });
    }
  }, []);

  useEffect(() => {
    socketServices.on('received_message', msg => {
      getMessage(msg, true);
    });
    return () => setChatMessages([]);
  }, []);

  const getMessage = (msg, newMsg) => {
    if (currentUser.userData._id == msg.reciever && reciever == msg.sender) {
      setChatMessages(previousData => [...previousData, msg]);
      newMsg && store.dispatch(saveMessages(msg));
    } else if (
      currentUser.userData._id == msg.sender &&
      reciever == msg.reciever
    ) {
      setChatMessages(previousData => [...previousData, msg]);
      newMsg && store.dispatch(saveMessages(msg));
    }
  };

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
      id: chatMessages.length + 1,
      text: message,
      img: fileData.length > 0 && fileData,
      sender: currentUser.userData._id,
      reciever: reciever,
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

  //ScrollToEnd Implmented
  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.scrollToEnd();
    }
  }, [chatMessages]);

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

        {/* <View
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
        </View> */}
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
                ref={refContainer}
                renderItem={({item}) => <MessageComponent item={item} />}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : null}
          </View>

          <View style={styles.messaginginputContainer}>
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
                onPress={() => handleFilePicker()}
                style={{
                  marginHorizontal: moderateScale(8),
                  color: 'blue',
                }}>
                <Icon name="attachment" size={25} color="grey" />
              </TouchableOpacity>
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
