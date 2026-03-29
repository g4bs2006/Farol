import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface GhostInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: IconName;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
}

export default function GhostInput({
  label,
  value,
  onChangeText,
  icon,
  placeholder,
  multiline,
  maxLength,
  keyboardType = 'default',
}: GhostInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, focused && styles.inputRowFocused]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={18}
            color={focused ? colors.rosa : colors.outline}
            style={styles.icon}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.outline}
          multiline={multiline}
          maxLength={maxLength}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.input, multiline && styles.multiline]}
        />
      </View>
      {maxLength && (
        <Text style={styles.counter}>{value.length}/{maxLength}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: colors.outline,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(197, 198, 207, 0.3)',
    paddingBottom: 8,
  },
  inputRowFocused: {
    borderBottomColor: colors.rosa,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontFamily: 'Manrope',
    fontSize: 14,
    color: colors.onSurface,
    padding: 0,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  counter: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: colors.outline,
    textAlign: 'right',
    marginTop: 4,
  },
});
