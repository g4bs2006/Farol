import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import MapaScreen      from '../screens/MapaScreen';
import DenunciarScreen from '../screens/DenunciarScreen';
import AjudaScreen     from '../screens/AjudaScreen';
import PerfilScreen    from '../screens/PerfilScreen';

export type MainTabsParamList = {
  Mapa:      undefined;
  Denunciar: undefined;
  Ajuda:     undefined;
  Perfil:    undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const TAB_ICONS: Record<string, IconName> = {
  Mapa:      'map-marker-radius',
  Denunciar: 'alert-circle',
  Ajuda:     'hand-heart',
  Perfil:    'account-circle',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.navy,
          borderTopWidth: 0,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor:   colors.rosaLight,
        tabBarInactiveTintColor: '#8B9EC4',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginTop: 2,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name={TAB_ICONS[route.name]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Mapa"      component={MapaScreen}      options={{ title: 'MAPA' }} />
      <Tab.Screen name="Denunciar" component={DenunciarScreen} options={{ title: 'DENUNCIAR' }} />
      <Tab.Screen name="Ajuda"     component={AjudaScreen}     options={{ title: 'AJUDA' }} />
      <Tab.Screen name="Perfil"    component={PerfilScreen}    options={{ title: 'PERFIL' }} />
    </Tab.Navigator>
  );
}
