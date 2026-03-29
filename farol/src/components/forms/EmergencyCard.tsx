import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface EmergencyCardProps {
  onAcionar: () => void;
}

export default function EmergencyCard({ onAcionar }: EmergencyCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="alert" size={20} color={colors.redSos} />
        <Text style={styles.title}>Ocorrência agora</Text>
      </View>
      <Text style={styles.body}>
        Se você está sofrendo assédio neste momento no ônibus, acione a Guarda Municipal.
      </Text>
      <TouchableOpacity onPress={onAcionar} activeOpacity={0.85} style={styles.button}>
        <MaterialCommunityIcons name="shield-alert" size={16} color={colors.white} style={{ marginRight: 6 }} />
        <Text style={styles.buttonLabel}>ACIONAR GUARDA AGORA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.redBg,
    borderWidth: 1.5,
    borderColor: colors.redSos,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: colors.redSos,
  },
  body: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: colors.onSurface,
    marginBottom: 14,
    lineHeight: 18,
  },
  button: {
    backgroundColor: colors.redSos,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
