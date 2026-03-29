import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function AnonymityBadge() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="shield-account" size={20} color={colors.green} style={styles.icon} />
      <Text style={styles.text}>
        Seu relato será enviado de forma totalmente anônima. Seus dados do Gov.br são usados apenas para validação interna.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greenLight,
    borderLeftWidth: 3,
    borderLeftColor: colors.green,
    borderRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 16,
  },
  icon: {
    marginRight: 10,
    marginTop: 1,
  },
  text: {
    flex: 1,
    fontFamily: 'Manrope',
    fontSize: 12,
    color: colors.green,
    lineHeight: 18,
  },
});
