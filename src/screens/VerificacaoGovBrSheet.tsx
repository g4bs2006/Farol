import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/RootNavigator';

type Nav = StackNavigationProp<RootStackParamList>;

export default function VerificacaoGovBrSheet() {
  const navigation = useNavigation<Nav>();
  const { login } = useAuth();

  const handleVerificar = () => {
    login();
    navigation.goBack();
  };

  const handleFechar = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={handleFechar}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.sheet}>
            {/* Handle */}
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="shield-check" size={32} color={colors.rosa} />
              </View>
              <TouchableOpacity onPress={handleFechar} style={styles.closeBtn}>
                <MaterialCommunityIcons name="close" size={22} color={colors.outline} />
              </TouchableOpacity>
            </View>

            <Text style={styles.titulo}>Verificação necessária</Text>
            <Text style={styles.subtitulo}>
              Para denunciar e acessar seu perfil, você precisa verificar sua identidade com Gov.br.
            </Text>

            {/* Benefícios */}
            <View style={styles.beneficios}>
              {[
                { icone: 'shield-account', texto: 'Seus dados são usados apenas para validação' },
                { icone: 'eye-off',        texto: 'Seu CPF nunca é armazenado — apenas hash irreversível' },
                { icone: 'incognito',      texto: 'Relatos enviados de forma totalmente anônima' },
              ].map((b, i) => (
                <View key={i} style={styles.beneficioItem}>
                  <MaterialCommunityIcons name={b.icone as any} size={18} color={colors.green} />
                  <Text style={styles.beneficioText}>{b.texto}</Text>
                </View>
              ))}
            </View>

            {/* Botão verificar */}
            <TouchableOpacity style={styles.govBtn} onPress={handleVerificar} activeOpacity={0.85}>
              <MaterialCommunityIcons name="shield" size={18} color={colors.white} style={{ marginRight: 8 }} />
              <Text style={styles.govBtnText}>VERIFICAR COM GOV.BR</Text>
            </TouchableOpacity>

            {/* Botão agora não */}
            <TouchableOpacity style={styles.agoraNaoBtn} onPress={handleFechar}>
              <Text style={styles.agoraNaoText}>Agora não</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.cremeDark,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.cremeDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: { padding: 4 },
  titulo: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  subtitulo: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: colors.outline,
    lineHeight: 22,
    marginBottom: 20,
  },
  beneficios: {
    backgroundColor: colors.greenLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    gap: 10,
  },
  beneficioItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  beneficioText: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: colors.green,
    flex: 1,
    lineHeight: 18,
  },
  govBtn: {
    backgroundColor: colors.rosa,
    borderRadius: 28,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  govBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  agoraNaoBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  agoraNaoText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: colors.outline,
  },
});
