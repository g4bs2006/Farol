import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, Easing, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';
import { useSOS } from '../context/SOSContext';
import { RootStackParamList } from '../navigation/RootNavigator';

type Nav = StackNavigationProp<RootStackParamList>;

export default function EmergenciaScreen() {
  const navigation = useNavigation<Nav>();
  const { encerrarSOS } = useSOS();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotAnim   = useRef(new Animated.Value(1)).current;

  // Pulsação do anel externo
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,   duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    // Pisca do dot de gravação
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, { toValue: 0.2, duration: 600, useNativeDriver: true }),
        Animated.timing(dotAnim, { toValue: 1,   duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleEncerrar = () => {
    encerrarSOS();
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Status de gravação */}
        <View style={styles.gravacaoRow}>
          <Animated.View style={[styles.gravacaoDot, { opacity: dotAnim }]} />
          <Text style={styles.gravacaoText}>Gravação de áudio ativa</Text>
        </View>

        {/* Anel pulsante */}
        <Animated.View style={[styles.ring, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.innerCircle}>
            <MaterialCommunityIcons name="shield-alert" size={48} color={colors.white} />
          </View>
        </Animated.View>

        <Text style={styles.titulo}>Emergência acionada</Text>
        <Text style={styles.subtitulo}>
          A Guarda Municipal foi notificada. Mantenha a calma.
        </Text>

        {/* Cards de status */}
        <View style={styles.statusCards}>
          <StatusCard
            icone="shield-check"
            titulo="Guarda Municipal"
            subtitulo="Notificada · Em deslocamento"
            status="ativo"
          />
          <StatusCard
            icone="map-marker-path"
            titulo="Localização"
            subtitulo="Compartilhada em tempo real"
            status="ativo"
          />
          <StatusCard
            icone="account-group"
            titulo="Contatos de confiança"
            subtitulo="2 contatos alertados"
            status="ativo"
          />
          <StatusCard
            icone="microphone"
            titulo="Gravação de áudio"
            subtitulo="Em andamento"
            status="ativo"
          />
        </View>

        {/* Número de emergência */}
        <View style={styles.emergenciaNum}>
          <Text style={styles.emergenciaNumLabel}>Emergências:</Text>
          <Text style={styles.emergenciaNumVal}>190  |  153  |  180</Text>
        </View>

        {/* Botão encerrar */}
        <TouchableOpacity style={styles.encerrarBtn} onPress={handleEncerrar} activeOpacity={0.85}>
          <MaterialCommunityIcons name="stop-circle-outline" size={18} color={colors.redSos} style={{ marginRight: 8 }} />
          <Text style={styles.encerrarText}>ENCERRAR EMERGÊNCIA</Text>
        </TouchableOpacity>

        <Text style={styles.aviso}>
          Toque em "Encerrar" apenas quando estiver em segurança.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatusCard({ icone, titulo, subtitulo, status }: {
  icone: string;
  titulo: string;
  subtitulo: string;
  status: 'ativo' | 'pendente';
}) {
  return (
    <View style={cardStyles.card}>
      <View style={cardStyles.iconWrap}>
        <MaterialCommunityIcons name={icone as any} size={20} color={colors.white} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={cardStyles.titulo}>{titulo}</Text>
        <Text style={cardStyles.subtitulo}>{subtitulo}</Text>
      </View>
      <View style={[cardStyles.badge, status === 'ativo' && cardStyles.badgeAtivo]}>
        <Text style={cardStyles.badgeText}>{status === 'ativo' ? '●  Ativo' : 'Aguardando'}</Text>
      </View>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: { fontFamily: 'Manrope-Bold', fontSize: 13, color: colors.white, fontWeight: '700' },
  subtitulo: { fontFamily: 'Manrope', fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  badgeAtivo: { backgroundColor: 'rgba(45, 106, 79, 0.5)' },
  badgeText: { fontFamily: 'Manrope-Bold', fontSize: 10, color: colors.white },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.redSos },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },

  // Gravação
  gravacaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  gravacaoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  gravacaoText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  // Anel
  ring: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },

  statusCards: { width: '100%', marginBottom: 20 },

  emergenciaNum: {
    alignItems: 'center',
    marginBottom: 28,
  },
  emergenciaNumLabel: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  emergenciaNumVal: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 2,
  },

  encerrarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 32,
    width: '100%',
    marginBottom: 12,
  },
  encerrarText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: colors.redSos,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  aviso: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
});
