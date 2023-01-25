import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './src/Navigations/Routes';
import store from './src/redux/store';
import {useEffect} from 'react';
import {getItem} from './src/utils/utils';
import {saveUserData} from './src/redux/reducers/auth';
import persistStore from 'redux-persist/es/persistStore';

const App = () => {
  useEffect(() => {
    async () => {
      let userData = await getItem('userData');
      if (!!userData) {
        store.dispatch(saveUserData(userData));
      }
      console.log('user data in App.js', userData);
    };
  }, []);

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <Routes />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
