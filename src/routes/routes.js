import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Music} from '../pages';
import {colors} from '../assets';

const Stack = createStackNavigator();

export default function Routes() {
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
        component={Music}
      />
      <Stack.Screen options={options} name="Editar música" component={Music} />
    </Stack.Navigator>
  );
}
