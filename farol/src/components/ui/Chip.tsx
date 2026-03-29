import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  variant?: 'pill' | 'soft';
}

export default function Chip({ label, selected, onPress, variant = 'soft' }: ChipProps) {
  const radius = variant === 'pill' ? 20 : 12;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        { borderRadius: radius },
        selected ? styles.selected : styles.unselected,
      ]}
    >
      <Text style={[styles.label, selected ? styles.labelSelected : styles.labelUnselected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  selected: {
    backgroundColor: colors.navy,
  },
  unselected: {
    backgroundColor: colors.cremeDark,
  },
  label: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  labelSelected: {
    color: colors.white,
  },
  labelUnselected: {
    color: colors.rosa,
  },
});
