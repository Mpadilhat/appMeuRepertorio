import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from '@src/routes/routes';
import {SearchProvider} from '@src/contexts';
import {RootSiblingParent} from 'react-native-root-siblings';

const App = () => {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <SearchProvider>
          <Routes />
        </SearchProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;
