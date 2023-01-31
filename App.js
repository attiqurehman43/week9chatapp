import React from 'react';
import {Provider} from 'react-redux';

import Routes from './src/Navigations/Routes';
import mystore from './src/redux/store';
import {useEffect} from 'react';
import {getItem} from './src/utils/utils';
import {saveUserData} from './src/redux/reducers/auth';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';

const persistor = persistStore(mystore);

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
    <Provider store={mystore}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
