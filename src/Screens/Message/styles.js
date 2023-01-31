import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, textScale} from '../../styles/responsiveSize';

export const styles = StyleSheet.create({
  chatscreen: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  chatheading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  chattopContainer: {
    backgroundColor: '#F7F7F7',
    height: 70,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  chatheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatlistContainer: {
    paddingHorizontal: 10,
  },
  chatemptyContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatemptyText: {fontWeight: 'bold', fontSize: 24, paddingBottom: 30},
  messagingscreen: {
    flex: 1,
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(8),
  },
  nameTextStyle: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(16),
    marginLeft: moderateScale(8),
  },
  messaginginputContainer: {
    width: '100%',
    // minHeight: 100,
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  messaginginput: {
    borderWidth: 0.8,
    borderColor: colors.grey,
    padding: 12,
    flex: 1,
    // width: '100%',
    marginLeft: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginLeft: moderateScale(12),
  },

  mmessageWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  mmessage: {
    maxWidth: '50%',
    backgroundColor: '#f5ccc2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
    marginHorizontal: 10,
  },
  mmesage: {
    maxWidth: '50%',
    backgroundColor: '#f5ccc2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
    marginHorizontal: 10,
  },

  cchat: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 80,
    marginBottom: 10,
  },
  cavatar: {
    marginRight: 15,
  },
  cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cmessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  crightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  ctime: {
    opacity: 0.5,
  },
});
