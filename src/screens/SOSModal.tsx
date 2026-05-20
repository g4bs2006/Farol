import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, Easing,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';
import { useSOS } from '../context/SOSContext';
import { RootStackParamList } from '../navigation/RootNavigator';

type Nav = StackNavigationProp<RootStackParamList>;

export default function SOSModal() {
  const navigation = useNavigation<Nav>();
  const { fase, countdown, cancelarSOS, encerrarSOS } = useSOS();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  // Fade in ao montar
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  // Pulse no círculo do countdown
  useEffect(() => {
    if (fase === 'countdown') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,    duration: 500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [fase]);

  // Navega para tela de emergência quando ativado
  useEffect(() => {
    if (fase === 'ativo') {
      navigation.replace('Emergencia');
    }
  }, [fase]);

  const handleCancelar = () => {
    cancelarSOS();
    navigation.goBack();
  };

  if (fase === 'idle') {
    navigation.goBack();
    return null;
  }

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        {/* Anel pulsante */}
        <Animated.View style={[styles.ring, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.innerCircle}>
            <MaterialCommunityIcons name="shield-alert" size={36} color={colors.white} />
          </View>
        </Animated.View>

        {/* Countdown */}
        <Text style={styles.countdown}>{countdown}</Text>
        <Text style={styles.titulo}>Acionando SOS</Text>
        <Text style={styles.subtitulo}>
          A Guarda Municipal será notificada e seus contatos de confiança serão alertados.
        </Text>

        {/* Ações que serão executadas */}
        <View style={styles.acoes}>
          {[
            { icone: 'shield-check',    texto: 'Notificar Guarda Municipal' },
            { icone: 'account-group',   texto: 'Alertar contatos de confiança' },
            { icone: 'microphone',      texto: 'Iniciar gravação de áudio' },
            { icone: 'map-marker-path', texto: 'Compartilhar localização em tempo real' },
          ].map((a, i) => (
            <View key={i} style={styles.acaoItem}>
              <MaterialCommunityIcons name={a.icone as any} size={16} color={colors.rosaLight} />
              <Text style={styles.acaoText}>{a.texto}</Text>
            </View>
          ))}
        </View>

        {/* Cancelar */}
        <TouchableOpacity style={styles.cancelarBtn} onPress={handleCancelar} activeOpacity={0.85}>
          <Text style={styles.cancelarText}>CANCELAR</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 43, 75, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },

  // Círculo pulsante
  ring: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(185, 28, 28, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  innerCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.redSos,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countdown: {
    fontFamily: 'Manrope-Bold',
    fontSize: 64,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 72,
    marginBottom: 8,
  },
  titulo: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  subtitulo: {
    fontFamily: 'Manrope',
    fontSize: 13,
    color: colors.rosaLight,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },

  // Ações
  acoes: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 16,
    gap: 12,
    marginBottom: 32,
  },
  acaoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  acaoText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    color: colors.white,
  },

  // Cancelar
  cancelarBtn: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  cancelarText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
