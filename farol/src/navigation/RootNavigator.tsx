import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs                from './MainTabs';
import SOSModal                from '../screens/SOSModal';
import EmergenciaScreen        from '../screens/EmergenciaScreen';
import VerificacaoGovBrSheet   from '../screens/VerificacaoGovBrSheet';

export type RootStackParamList = {
  MainTabs:         undefined;
  SOSModal:         undefined;
  Emergencia:       undefined;
  VerificacaoGovBr: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="SOSModal"
        component={SOSModal}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true }}
      />
      <Stack.Screen
        name="Emergencia"
        component={EmergenciaScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="VerificacaoGovBr"
        component={VerificacaoGovBrSheet}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true }}
      />
    </Stack.Navigator>
  );
}
