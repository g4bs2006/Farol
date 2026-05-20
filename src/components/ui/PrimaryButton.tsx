import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  icon?: IconName;
  disabled?: boolean;
  variant?: 'primary' | 'danger';
}

export default function PrimaryButton({ label, onPress, icon, disabled, variant = 'primary' }: PrimaryButtonProps) {
  const bg = variant === 'danger' ? colors.redSos : colors.rosa;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.button, { backgroundColor: bg }, disabled && styles.disabled]}
    >
      {icon && (
        <MaterialCommunityIcons name={icon} size={18} color={colors.white} style={styles.icon} />
      )}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  label: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  icon: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
