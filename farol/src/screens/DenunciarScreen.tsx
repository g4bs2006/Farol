import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import NavyHeader           from '../components/layout/NavyHeader';
import SOSButton            from '../components/layout/SOSButton';
import PrimaryButton        from '../components/ui/PrimaryButton';
import Chip                 from '../components/ui/Chip';
import GhostInput           from '../components/ui/GhostInput';
import SectionLabel         from '../components/ui/SectionLabel';
import AnonymityBadge       from '../components/forms/AnonymityBadge';
import GuardToggleCard      from '../components/forms/GuardToggleCard';
import EmergencyCard        from '../components/forms/EmergencyCard';
import OccurrenceChipGrid, { OccurrenceType } from '../components/forms/OccurrenceChipGrid';
import { colors }           from '../theme/colors';
import { linhasOnibus }     from '../data/mock';
import { useAuth }          from '../context/AuthContext';
import { RootStackParamList } from '../navigation/RootNavigator';

type Nav = StackNavigationProp<RootStackParamList>;
type Modo = 'publico' | 'onibus';
type Sentido = 'ida' | 'volta';

export default function DenunciarScreen() {
  const navigation = useNavigation<Nav>();
  const { isVerified } = useAuth();

  const [modo, setModo]                   = useState<Modo>('publico');
  const [ocorrencias, setOcorrencias]     = useState<OccurrenceType[]>(['Assédio verbal']);
  const [local, setLocal]                 = useState('');
  const [horario, setHorario]             = useState('');
  const [descricao, setDescricao]         = useState('');
  const [autorizarGuarda, setAutorizar]   = useState(false);
  const [linhaBusca, setLinhaBusca]       = useState('');
  const [linhaSelecionada, setLinha]      = useState('');
  const [sentido, setSentido]             = useState<Sentido>('ida');
  const [pontoEmbarque, setPonto]         = useState('');
  const [numeroVeiculo, setNumero]        = useState('');
  const [mostrarSugestoes, setMostrar]    = useState(false);

  // Redireciona para verificação se não logado
  const checarAcesso = () => {
    if (!isVerified) {
      navigation.navigate('VerificacaoGovBr');
    }
  };

  const sugestoesFiltradas = linhasOnibus.filter(l =>
    l.codigo.includes(linhaBusca) || l.nome.toLowerCase().includes(linhaBusca.toLowerCase())
  );

  const handleAcionarGuarda = () => {
    navigation.navigate('Emergencia');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <NavyHeader title="Denunciar" />

      {!isVerified ? (
        <View style={styles.bloqueado}>
          <MaterialCommunityIconsPlaceholder />
          <Text style={styles.bloqueadoTitulo}>Verificação necessária</Text>
          <Text style={styles.bloqueadoTexto}>
            Para denunciar, você precisa verificar sua identidade com Gov.br.
            Seus dados são usados apenas para validação.
          </Text>
          <TouchableOpacity style={styles.govBtn} onPress={checarAcesso}>
            <Text style={styles.govBtnText}>VERIFICAR COM GOV.BR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

            {/* Seletor de modo */}
            <View style={styles.modoContainer}>
              <Chip
                label="Espaço público"
                selected={modo === 'publico'}
                onPress={() => setModo('publico')}
                variant="pill"
              />
              <Chip
                label="Ônibus"
                selected={modo === 'onibus'}
                onPress={() => setModo('onibus')}
                variant="pill"
              />
            </View>

            <View style={styles.form}>
              {/* MODO ÔNIBUS */}
              {modo === 'onibus' && (
                <EmergencyCard onAcionar={handleAcionarGuarda} />
              )}

              {/* Tipo de ocorrência */}
              <SectionLabel text="Tipo de ocorrência" />
              <OccurrenceChipGrid selected={ocorrencias} onChange={setOcorrencias} />

              {/* Campos modo público */}
              {modo === 'publico' && (
                <>
                  <View style={{ height: 16 }} />
                  <GhostInput
                    label="Local"
                    value={local}
                    onChangeText={setLocal}
                    icon="map-marker"
                    placeholder="Ex: Av. T-63, Setor Bueno"
                  />
                  <GhostInput
                    label="Horário"
                    value={horario}
                    onChangeText={setHorario}
                    icon="clock-outline"
                    placeholder="Ex: 18:30"
                  />
                </>
              )}

              {/* Campos modo ônibus */}
              {modo === 'onibus' && (
                <>
                  <View style={{ height: 16 }} />
                  {/* Linha do ônibus com autocomplete */}
                  <View>
                    <GhostInput
                      label="Linha do ônibus"
                      value={linhaBusca}
                      onChangeText={t => { setLinhaBusca(t); setMostrar(true); setLinha(''); }}
                      icon="bus"
                      placeholder="Ex: 064 ou Circular"
                    />
                    {mostrarSugestoes && linhaBusca.length > 0 && (
                      <View style={styles.sugestoes}>
                        {sugestoesFiltradas.slice(0, 4).map(l => (
                          <TouchableOpacity
                            key={l.codigo}
                            style={styles.sugestaoItem}
                            onPress={() => {
                              setLinha(`${l.codigo} — ${l.nome}`);
                              setLinhaBusca(`${l.codigo} — ${l.nome}`);
                              setMostrar(false);
                            }}
                          >
                            <Text style={styles.sugestaoCodigo}>{l.codigo}</Text>
                            <Text style={styles.sugestaoNome}>{l.nome}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Sentido */}
                  <SectionLabel text="Sentido" />
                  <View style={styles.chipRow}>
                    <Chip label="Ida"   selected={sentido === 'ida'}   onPress={() => setSentido('ida')}   variant="pill" />
                    <Chip label="Volta" selected={sentido === 'volta'} onPress={() => setSentido('volta')} variant="pill" />
                  </View>

                  <GhostInput
                    label="Ponto de embarque"
                    value={pontoEmbarque}
                    onChangeText={setPonto}
                    icon="map-marker-outline"
                    placeholder="Onde você embarcou"
                  />
                  <View style={styles.rowInputs}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <GhostInput
                        label="Horário"
                        value={horario}
                        onChangeText={setHorario}
                        icon="clock-outline"
                        placeholder="Ex: 18:30"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <GhostInput
                        label="Nº do veículo (opcional)"
                        value={numeroVeiculo}
                        onChangeText={setNumero}
                        icon="bus-side"
                        placeholder="Ex: 12345"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </>
              )}

              {/* Descrição */}
              <GhostInput
                label="Descrição dos fatos"
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Descreva o que aconteceu..."
                multiline
                maxLength={500}
              />

              {/* Toggle guarda (modo público) */}
              {modo === 'publico' && (
                <GuardToggleCard value={autorizarGuarda} onChange={setAutorizar} />
              )}

              <AnonymityBadge />

              <PrimaryButton
                label="Enviar relato com segurança"
                onPress={() => {}}
                icon="shield"
              />
              <View style={{ height: 100 }} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      <SOSButton />
    </SafeAreaView>
  );
}

// Placeholder para ícone (evitar import circular)
function MaterialCommunityIconsPlaceholder() {
  return (
    <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.cremeDark, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
      <Text style={{ fontSize: 28 }}>🔒</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.navy },
  scroll: { flex: 1, backgroundColor: colors.creme },

  // Seletor modo
  modoContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.cremeDark,
  },

  form: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },

  rowInputs: {
    flexDirection: 'row',
  },

  // Autocomplete
  sugestoes: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: -12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sugestaoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.cremeDark,
    gap: 10,
  },
  sugestaoCodigo: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: colors.navy,
    minWidth: 36,
  },
  sugestaoNome: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: colors.onSurface,
    flex: 1,
  },

  // Bloqueado (não verificado)
  bloqueado: {
    flex: 1,
    backgroundColor: colors.creme,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
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
