import React from 'react';

import { View, Text } from 'react-native';
import Home from './component/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamDetails from './component/TeamDetails';


const Stack = createNativeStackNavigator();
const App = ()=> {
  return (
    <>
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TeamDetails" component={TeamDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}


export default App;
