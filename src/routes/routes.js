import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Song} from '../pages';
import {colors} from '../assets';

const Stack = createStackNavigator();

const Routes = () => {
  const options = {
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.light,
    headerTitleStyle: {
      fontFamily: 'Nunito-Black',
      fontSize: 20,
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={options}
        name="Cadastrar música"
        component={Song}
      />
      <Stack.Screen options={options} name="Editar música" component={Song} />
    </Stack.Navigator>
  );
};

export default Routes;
