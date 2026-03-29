import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, ScrollView, TextInput, Dimensions,
} from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SOSButton    from '../components/layout/SOSButton';
import { colors }  from '../theme/colors';
import { relatosMock } from '../data/mock';

const { height: SCREEN_H } = Dimensions.get('window');

// Centro de Goiânia
const GOIANIA_REGION = {
  latitude:       -16.6869,
  longitude:      -49.2648,
  latitudeDelta:  0.06,
  longitudeDelta: 0.04,
};

const FILTROS = ['Todos', 'Assédio', 'Perseguição', 'Ônibus'] as const;

const TIPO_COR: Record<string, string> = {
  'Assédio verbal': colors.rosa,
  'Assédio físico': colors.amberAjuda,
  'Perseguição':    colors.redSos,
  'Ônibus':         colors.blueAjuda,
};

const PONTOS_SEGUROS = [
  { id: 1, nome: 'UPA Setor Bueno',    lat: -16.7010, lng: -49.2680, icone: 'hospital-box' },
  { id: 2, nome: 'Delegacia da Mulher', lat: -16.6760, lng: -49.2720, icone: 'shield-star' },
  { id: 3, nome: 'Terminal Bandeiras', lat: -16.6794, lng: -49.2550, icone: 'bus-stop' },
];

const LINHAS_PROBLEMATICAS = [
  { codigo: '064', nome: 'Circular Centro',                    ocorrencias: 8, cor: colors.redSos },
  { codigo: '404', nome: 'Setor Bueno / Terminal Isidória',   ocorrencias: 5, cor: colors.rosa },
  { codigo: '162', nome: 'Campus UFG / Terminal Bandeiras',   ocorrencias: 4, cor: colors.amberAjuda },
  { codigo: '251', nome: 'Jardim América / P. Pelágio',       ocorrencias: 3, cor: colors.amberAjuda },
  { codigo: '318', nome: 'Setor Sul / Terminal Campinas',     ocorrencias: 2, cor: colors.rosaLight },
  { codigo: '077', nome: 'Setor Marista / Recanto do Bosque', ocorrencias: 1, cor: colors.rosaLight },
];

// Gera círculos concêntricos para simular heatmap
function heatCircles(lat: number, lng: number, cor: string) {
  return [
    { radius: 350, opacity: 0.30 },
    { radius: 200, opacity: 0.45 },
    { radius: 100, opacity: 0.60 },
  ].map((c, i) => (
    <Circle
      key={i}
      center={{ latitude: lat, longitude: lng }}
      radius={c.radius}
      fillColor={cor + Math.round(c.opacity * 255).toString(16).padStart(2, '0')}
      strokeWidth={0}
    />
  ));
}

export default function MapaScreen() {
  const insets     = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const mapRef     = useRef<MapView>(null);

  const [filtroAtivo, setFiltroAtivo]   = useState('Todos');
  const [buscaAberta, setBuscaAberta]   = useState(false);
  const [textoBusca, setTextoBusca]     = useState('');
  const [painelOnibus, setPainel]       = useState(false);
  const [rotaAberta, setRotaAberta]     = useState(false);
  const [origem, setOrigem]             = useState('');
  const [destino, setDestino]           = useState('');

  const painelAnim = useRef(new Animated.Value(0)).current;

  const togglePainel = () => {
    const toValue = painelOnibus ? 0 : 1;
    setPainel(!painelOnibus);
    Animated.spring(painelAnim, { toValue, useNativeDriver: true }).start();
  };

  const relatosFiltrados = filtroAtivo === 'Todos'
    ? relatosMock
    : relatosMock.filter(r => {
        if (filtroAtivo === 'Assédio')    return r.tipo.includes('Assédio');
        if (filtroAtivo === 'Perseguição') return r.tipo === 'Perseguição';
        if (filtroAtivo === 'Ônibus')     return r.tipo === 'Ônibus';
        return true;
      });

  const panelTranslateY = painelAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [320, 0],
  });

  return (
    <View style={styles.root}>
      {/* Header sobreposto */}
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        {buscaAberta ? (
          /* Barra de busca expandida */
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={18} color={colors.outline} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar bairro ou endereço..."
              placeholderTextColor={colors.outline}
              value={textoBusca}
              onChangeText={setTextoBusca}
              autoFocus
            />
            <TouchableOpacity onPress={() => { setBuscaAberta(false); setTextoBusca(''); }}>
              <MaterialCommunityIcons name="close" size={18} color={colors.outline} />
            </TouchableOpacity>
          </View>
        ) : (
          /* Header normal */
          <View style={styles.headerRow}>
            <Text style={styles.logo}>
              <Text style={styles.logoFa}>Fa</Text>
              <Text style={styles.logoRol}>rol</Text>
            </Text>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerBtn} onPress={() => setBuscaAberta(true)}>
                <MaterialCommunityIcons name="magnify" size={22} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerBtn} onPress={() => setRotaAberta(true)}>
                <MaterialCommunityIcons name="map-marker-path" size={22} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Filtros */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtros}
          style={styles.filtrosScroll}
        >
          {FILTROS.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setFiltroAtivo(f)}
              style={[styles.filtroChip, filtroAtivo === f && styles.filtroChipAtivo]}
            >
              <Text style={[styles.filtroText, filtroAtivo === f && styles.filtroTextAtivo]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Mapa */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={GOIANIA_REGION}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {/* Heatmap circles */}
        {relatosFiltrados.map(r =>
          heatCircles(r.lat, r.lng, TIPO_COR[r.tipo] ?? colors.rosa)
        )}

        {/* Marcadores de pontos seguros */}
        {PONTOS_SEGUROS.map(p => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.lat, longitude: p.lng }}
            title={p.nome}
          >
            <View style={styles.markerSafe}>
              <MaterialCommunityIcons name={p.icone as any} size={14} color={colors.white} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Legenda */}
      <View style={styles.legenda}>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaDot, { backgroundColor: colors.redSos }]} />
          <Text style={styles.legendaText}>Alto risco</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaDot, { backgroundColor: colors.rosa }]} />
          <Text style={styles.legendaText}>Moderado</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaDot, { backgroundColor: colors.green }]} />
          <Text style={styles.legendaText}>Ponto seguro</Text>
        </View>
      </View>

      {/* Botão de linhas de ônibus */}
      <TouchableOpacity style={styles.onibusBtn} onPress={togglePainel} activeOpacity={0.85}>
        <MaterialCommunityIcons name="bus" size={16} color={painelOnibus ? colors.white : colors.navy} />
        <Text style={[styles.onibusBtnText, painelOnibus && { color: colors.white }]}>
          Linhas problemáticas
        </Text>
      </TouchableOpacity>

      {/* Painel de linhas de ônibus */}
      <Animated.View style={[styles.painel, { transform: [{ translateY: panelTranslateY }] }]}>
        <View style={styles.painelHandle} />
        <View style={styles.painelHeader}>
          <Text style={styles.painelTitulo}>Linhas com mais ocorrências</Text>
          <TouchableOpacity onPress={togglePainel}>
            <MaterialCommunityIcons name="close" size={20} color={colors.outline} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {LINHAS_PROBLEMATICAS.map((l, i) => (
            <View key={l.codigo} style={styles.linhaItem}>
              <View style={[styles.linhaRank, { backgroundColor: i < 2 ? colors.redSos : i < 4 ? colors.rosa : colors.cremeDark }]}>
                <Text style={[styles.linhaRankText, { color: i < 4 ? colors.white : colors.rosa }]}>
                  {i + 1}º
                </Text>
              </View>
              <View style={[styles.linhaCodigo, { borderLeftColor: l.cor }]}>
                <Text style={styles.linhaCodigoText}>{l.codigo}</Text>
              </View>
              <View style={styles.linhaInfo}>
                <Text style={styles.linhaNome} numberOfLines={1}>{l.nome}</Text>
                <Text style={styles.linhaOcorrencias}>{l.ocorrencias} ocorrências registradas</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={18} color={colors.outline} />
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Modal de traçar trajeto */}
      {rotaAberta && (
        <View style={styles.rotaOverlay}>
          <View style={styles.rotaSheet}>
            <View style={styles.rotaHeader}>
              <Text style={styles.rotaTitulo}>Traçar trajeto seguro</Text>
              <TouchableOpacity onPress={() => setRotaAberta(false)}>
                <MaterialCommunityIcons name="close" size={22} color={colors.outline} />
              </TouchableOpacity>
            </View>
            <View style={styles.rotaInput}>
              <MaterialCommunityIcons name="map-marker-outline" size={18} color={colors.green} />
              <TextInput
                style={styles.rotaTextInput}
                placeholder="Origem — onde você está"
                placeholderTextColor={colors.outline}
                value={origem}
                onChangeText={setOrigem}
              />
            </View>
            <View style={styles.rotaDivider} />
            <View style={styles.rotaInput}>
              <MaterialCommunityIcons name="map-marker" size={18} color={colors.rosa} />
              <TextInput
                style={styles.rotaTextInput}
                placeholder="Destino — para onde vai"
                placeholderTextColor={colors.outline}
                value={destino}
                onChangeText={setDestino}
              />
            </View>
            <TouchableOpacity
              style={styles.rotaBtn}
              onPress={() => setRotaAberta(false)}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons name="shield-check" size={16} color={colors.white} style={{ marginRight: 8 }} />
              <Text style={styles.rotaBtnText}>TRAÇAR ROTA SEGURA</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <SOSButton />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  // Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.navy,
    paddingHorizontal: 16,
    paddingBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logo: { fontSize: 20 },
  logoFa:  { color: colors.rosa,  fontFamily: 'Georgia', fontWeight: '700' },
  logoRol: { color: colors.white, fontFamily: 'Georgia', fontWeight: '700' },
  headerActions: { flexDirection: 'row', gap: 4 },
  headerBtn: {
    padding: 6,
    borderRadius: 8,
  },

  // Busca
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Manrope',
    fontSize: 14,
    color: colors.onSurface,
    padding: 0,
  },

  // Filtros
  filtrosScroll: { marginHorizontal: -4 },
  filtros: { gap: 8, paddingHorizontal: 4 },
  filtroChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  filtroChipAtivo: { backgroundColor: colors.white },
  filtroText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  filtroTextAtivo: { color: colors.navy },

  // Marcadores
  markerSafe: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },

  // Legenda
  legenda: {
    position: 'absolute',
    bottom: 90,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 10,
    padding: 10,
    gap: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  legendaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendaDot:  { width: 10, height: 10, borderRadius: 5 },
  legendaText: { fontFamily: 'Manrope', fontSize: 10, color: colors.onSurface },

  // Botão ônibus
  onibusBtn: {
    position: 'absolute',
    bottom: 90,
    right: 80,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  onibusBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    color: colors.navy,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Painel de linhas
  painel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 24,
    maxHeight: SCREEN_H * 0.5,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  painelHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.cremeDark,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  painelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  painelTitulo: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  linhaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.cremeDark,
    gap: 10,
  },
  linhaRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linhaRankText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    fontWeight: '700',
  },
  linhaCodigo: {
    borderLeftWidth: 3,
    paddingLeft: 6,
  },
  linhaCodigoText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    color: colors.navy,
  },
  linhaInfo: { flex: 1 },
  linhaNome: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: colors.onSurface,
  },
  linhaOcorrencias: {
    fontFamily: 'Manrope',
    fontSize: 10,
    color: colors.outline,
    marginTop: 1,
  },

  // Modal rota
  rotaOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    zIndex: 20,
  },
  rotaSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  rotaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rotaTitulo: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  rotaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  rotaTextInput: {
    flex: 1,
    fontFamily: 'Manrope',
    fontSize: 14,
    color: colors.onSurface,
  },
  rotaDivider: {
    height: 1,
    backgroundColor: colors.cremeDark,
    marginLeft: 28,
  },
  rotaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.rosa,
    borderRadius: 28,
    height: 52,
    marginTop: 20,
  },
  rotaBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
