import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface GuardToggleCardProps {
  value: boolean;
  onChange: (val: boolean) => void;
}

export default function GuardToggleCard({ value, onChange }: GuardToggleCardProps) {
  return (
    <View style={styles.card}>
      <MaterialCommunityIcons name="shield-account" size={22} color={colors.navy} style={styles.icon} />
      <View style={styles.text}>
        <Text style={styles.title}>Autorizar visita da Guarda</Text>
        <Text style={styles.subtitle}>
          {value ? 'Localização compartilhada em tempo real' : 'A Guarda Municipal poderá ir até você'}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.cremeDark, true: colors.navy }}
        thumbColor={colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 3,
    borderLeftColor: colors.navy,
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.white,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    flex: 1,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurface,
  },
  subtitle: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: colors.outline,
    marginTop: 2,
  },
});
