import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Switch, StyleSheet, Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavyHeader  from '../components/layout/NavyHeader';
import SOSButton   from '../components/layout/SOSButton';
import SectionLabel from '../components/ui/SectionLabel';
import { colors }  from '../theme/colors';
import { useAuth } from '../context/AuthContext';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const CONTATOS_MOCK = [
  { id: 1, nome: 'Mãe',    telefone: '(62) 99999-0001', iniciais: 'MA' },
  { id: 2, nome: 'Amiga',  telefone: '(62) 99999-0002', iniciais: 'AM' },
];

const HISTORICO_MOCK = [
  { id: 1, tipo: 'Assédio verbal', local: 'Av. T-63, Setor Bueno',     data: '15/03/2026', status: 'Publicado' },
  { id: 2, tipo: 'Perseguição',    local: 'Terminal Praça da Bíblia',   data: '02/03/2026', status: 'Em análise' },
];

export default function PerfilScreen() {
  const { isVerified, login, logout } = useAuth();
  const [notifRisco,   setNotifRisco]  = useState(true);
  const [notifNoturna, setNoturna]     = useState(false);
  const [raio,         setRaio]        = useState(2);
  const [modoDiscreto, setDiscreto]    = useState(false);

  if (!isVerified) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <NavyHeader title="Perfil" />
        <View style={styles.bloqueado}>
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 32 }}>👤</Text>
          </View>
          <Text style={styles.bloqueadoTitulo}>Você não está verificada</Text>
          <Text style={styles.bloqueadoTexto}>
            Verifique sua identidade com Gov.br para acessar seu perfil, histórico e contatos de confiança.
          </Text>
          <TouchableOpacity style={styles.govBtn} onPress={login}>
            <Text style={styles.govBtnText}>VERIFICAR COM GOV.BR</Text>
          </TouchableOpacity>
        </View>
        <SOSButton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <NavyHeader title="Perfil" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Avatar e info */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>UV</Text>
          </View>
          <View style={styles.avatarInfo}>
            <Text style={styles.nomeUsuario}>Usuária verificada</Text>
            <View style={styles.govBadge}>
              <MaterialCommunityIcons name="check-decagram" size={14} color={colors.green} />
              <Text style={styles.govBadgeText}>Verificada pelo Gov.br</Text>
            </View>
          </View>
          <TouchableOpacity onPress={logout} style={styles.sairBtn}>
            <MaterialCommunityIcons name="logout" size={18} color={colors.outline} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>

          {/* Contatos de confiança */}
          <SectionLabel text="Contatos de confiança" />
          {CONTATOS_MOCK.map(c => (
            <View key={c.id} style={styles.contatoCard}>
              <View style={styles.contatoAvatar}>
                <Text style={styles.contatoIniciais}>{c.iniciais}</Text>
              </View>
              <View style={styles.contatoInfo}>
                <Text style={styles.contatoNome}>{c.nome}</Text>
                <Text style={styles.contatoTel}>{c.telefone}</Text>
              </View>
              <TouchableOpacity
                onPress={() => Alert.alert('Remover', `Remover ${c.nome} dos contatos de confiança?`)}
              >
                <MaterialCommunityIcons name="close-circle-outline" size={20} color={colors.outline} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addContatoBtn}>
            <MaterialCommunityIcons name="plus-circle-outline" size={18} color={colors.rosa} />
            <Text style={styles.addContatoText}>Adicionar contato</Text>
          </TouchableOpacity>

          {/* Notificações de zona de risco */}
          <View style={styles.section}>
            <SectionLabel text="Notificações de zona de risco" />

            <ToggleRow
              icon="bell-ring"
              label="Alertas de área de risco"
              value={notifRisco}
              onChange={setNotifRisco}
            />
            <ToggleRow
              icon="weather-night"
              label="Somente no período noturno"
              value={notifNoturna}
              onChange={setNoturna}
              disabled={!notifRisco}
            />

            {/* Raio */}
            <View style={[styles.raioContainer, !notifRisco && { opacity: 0.4 }]}>
              <View style={styles.raioLabelRow}>
                <Text style={styles.raioLabel}>Raio de alerta</Text>
                <Text style={styles.raioValor}>{raio} km</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={2}
                maximumValue={5}
                step={1}
                value={raio}
                onValueChange={setRaio}
                minimumTrackTintColor={colors.navy}
                maximumTrackTintColor={colors.cremeDark}
                thumbTintColor={colors.navy}
                disabled={!notifRisco}
              />
              <View style={styles.raioMarks}>
                {[2, 3, 4, 5].map(v => (
                  <Text key={v} style={[styles.raioMark, raio === v && styles.raioMarkAtivo]}>
                    {v}km
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Modo discreto */}
          <View style={styles.section}>
            <SectionLabel text="Segurança avançada" />
            <ToggleRow
              icon="calculator"
              label="Modo discreto"
              sublabel="O app aparece como calculadora"
              value={modoDiscreto}
              onChange={setDiscreto}
            />
            {modoDiscreto && (
              <View style={styles.codigoCard}>
                <MaterialCommunityIcons name="lock" size={16} color={colors.navy} />
                <Text style={styles.codigoText}>
                  Código secreto para abrir o Farol: <Text style={styles.codigoBold}>2206</Text>
                </Text>
              </View>
            )}
          </View>

          {/* Histórico */}
          <View style={styles.section}>
            <SectionLabel text="Meu histórico" />
            {HISTORICO_MOCK.map(h => (
              <View key={h.id} style={styles.historicoCard}>
                <View style={styles.historicoHeader}>
                  <Text style={styles.historicoTipo}>{h.tipo}</Text>
                  <Text style={styles.historicoData}>{h.data}</Text>
                </View>
                <Text style={styles.historicoLocal}>
                  <MaterialCommunityIcons name="map-marker" size={11} color={colors.outline} />
                  {' '}{h.local}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: h.status === 'Publicado' ? colors.greenLight : colors.cremeDark },
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: h.status === 'Publicado' ? colors.green : colors.rosa },
                  ]}>
                    {h.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>

        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <SOSButton />
    </SafeAreaView>
  );
}

// Sub-componente local
function ToggleRow({
  icon, label, sublabel, value, onChange, disabled,
}: {
  icon: IconName;
  label: string;
  sublabel?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <View style={[toggleStyles.row, disabled && { opacity: 0.4 }]}>
      <MaterialCommunityIcons name={icon} size={20} color={colors.navy} style={{ marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={toggleStyles.label}>{label}</Text>
        {sublabel && <Text style={toggleStyles.sublabel}>{sublabel}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ false: colors.cremeDark, true: colors.navy }}
        thumbColor={colors.white}
      />
    </View>
  );
}

const toggleStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.cremeDark,
  },
  label: { fontFamily: 'Manrope-Bold', fontSize: 13, color: colors.onSurface },
  sublabel: { fontFamily: 'Manrope', fontSize: 11, color: colors.outline, marginTop: 1 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.navy },
  scroll: { flex: 1, backgroundColor: colors.creme },

  // Avatar section
  avatarSection: {
    backgroundColor: colors.navy,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.rosa,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  avatarInfo: { flex: 1 },
  nomeUsuario: {
    fontFamily: 'Manrope-Bold',
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  govBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  govBadgeText: { fontFamily: 'Manrope', fontSize: 11, color: colors.rosaLight },
  sairBtn: { padding: 4 },

  content: { paddingHorizontal: 16, paddingTop: 20 },
  section: { marginBottom: 8 },

  // Contatos
  contatoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  contatoAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.cremeDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contatoIniciais: { fontFamily: 'Manrope-Bold', fontSize: 13, color: colors.rosa },
  contatoInfo: { flex: 1 },
  contatoNome: { fontFamily: 'Manrope-Bold', fontSize: 13, color: colors.onSurface },
  contatoTel: { fontFamily: 'Manrope', fontSize: 11, color: colors.outline, marginTop: 1 },
  addContatoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    marginBottom: 20,
  },
  addContatoText: { fontFamily: 'Manrope-Bold', fontSize: 13, color: colors.rosa },

  // Raio
  raioContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  raioLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  raioLabel: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: colors.outline,
  },
  raioValor: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    color: colors.navy,
  },
  slider: {
    width: '100%',
    height: 36,
  },
  raioMarks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  raioMark: {
    fontFamily: 'Manrope',
    fontSize: 10,
    color: colors.outline,
  },
  raioMarkAtivo: {
    fontFamily: 'Manrope-Bold',
    color: colors.navy,
  },

  // Modo discreto
  codigoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.navy,
  },
  codigoText: { fontFamily: 'Manrope', fontSize: 12, color: colors.onSurface },
  codigoBold: { fontFamily: 'Manrope-Bold', fontWeight: '700', color: colors.navy },

  // Histórico
  historicoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  historicoHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  historicoTipo: { fontFamily: 'Manrope-Bold', fontSize: 13, color: colors.onSurface },
  historicoData: { fontFamily: 'Manrope', fontSize: 11, color: colors.outline },
  historicoLocal: { fontFamily: 'Manrope', fontSize: 11, color: colors.outline, marginBottom: 8 },
  statusBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontFamily: 'Manrope-Bold', fontSize: 10, textTransform: 'uppercase' },

  // Bloqueado
  bloqueado: {
    flex: 1,
    backgroundColor: colors.creme,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cremeDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  bloqueadoTitulo: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 10,
    textAlign: 'center',
  },
  bloqueadoTexto: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: colors.outline,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  govBtn: {
    backgroundColor: colors.rosa,
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  govBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
