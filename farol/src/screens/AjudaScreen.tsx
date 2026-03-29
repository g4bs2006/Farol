import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import NavyHeader  from '../components/layout/NavyHeader';
import SOSButton   from '../components/layout/SOSButton';
import { colors }  from '../theme/colors';
import { recursosMock, CategoriaRecurso, Recurso } from '../data/mock';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const CATEGORIAS: { key: CategoriaRecurso; label: string; cor: string; icone: IconName }[] = [
  { key: 'saude',       label: 'Saúde',       cor: colors.rosa,        icone: 'heart-plus' },
  { key: 'psicologico', label: 'Psicológico', cor: colors.purpleAjuda, icone: 'brain' },
  { key: 'financeiro',  label: 'Financeiro',  cor: colors.green,       icone: 'trending-up' },
  { key: 'juridico',    label: 'Jurídico',    cor: colors.navy,        icone: 'gavel' },
  { key: 'emprego',     label: 'Emprego',     cor: colors.blueAjuda,   icone: 'briefcase-account' },
  { key: 'moradia',     label: 'Moradia',     cor: colors.amberAjuda,  icone: 'home-heart' },
];

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function AjudaScreen() {
  const [categoria, setCategoria]   = useState<CategoriaRecurso>('saude');
  const [pertoMim, setPertoMim]     = useState(false);
  const [userLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (pertoMim && !userLocation) {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão necessária', 'Precisamos da sua localização para mostrar recursos próximos.');
          setPertoMim(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      })();
    }
  }, [pertoMim]);

  const recursos = recursosMock.filter(r => r.categoria === categoria);

  const recursosOrdenados = pertoMim && userLocation
    ? [...recursos].sort((a, b) => {
        const dA = a.lat ? haversine(userLocation.lat, userLocation.lng, a.lat, a.lng!) : Infinity;
        const dB = b.lat ? haversine(userLocation.lat, userLocation.lng, b.lat, b.lng!) : Infinity;
        return dA - dB;
      })
    : recursos;

  const abrirContato = (recurso: Recurso) => {
    if (recurso.tipo === 'telefone' && recurso.contato) {
      Linking.openURL(`tel:${recurso.contato}`);
    } else if (recurso.tipo === 'online' && recurso.link) {
      Linking.openURL(recurso.link);
    } else if (recurso.tipo === 'presencial' && recurso.endereco) {
      const query = encodeURIComponent(recurso.endereco);
      Linking.openURL(`https://maps.google.com/?q=${query}`);
    }
  };

  const distanciaTexto = (recurso: Recurso): string | null => {
    if (!userLocation || !recurso.lat) return null;
    const d = haversine(userLocation.lat, userLocation.lng, recurso.lat, recurso.lng!);
    return d < 1000 ? `${Math.round(d)}m` : `${(d / 1000).toFixed(1)}km`;
  };

  const corCategoria = CATEGORIAS.find(c => c.key === categoria)?.cor ?? colors.rosa;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <NavyHeader title="Ajuda" />

      {/* Card Ligue 180 fixo */}
      <TouchableOpacity
        style={styles.ligue180}
        onPress={() => Linking.openURL('tel:180')}
        activeOpacity={0.85}
      >
        <MaterialCommunityIcons name="phone" size={20} color={colors.white} />
        <View style={styles.ligue180Text}>
          <Text style={styles.ligue180Titulo}>Ligue 180 — Central da Mulher</Text>
          <Text style={styles.ligue180Sub}>Gratuito · 24h · Sigilo garantido</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.white} />
      </TouchableOpacity>

      {/* Chips de categoria */}
      <View style={styles.categoriasWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categorias}
        >
          {CATEGORIAS.map(cat => (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setCategoria(cat.key)}
              style={[
                styles.catChip,
                categoria === cat.key && { backgroundColor: cat.cor },
              ]}
            >
              <MaterialCommunityIcons
                name={cat.icone}
                size={14}
                color={categoria === cat.key ? colors.white : cat.cor}
              />
              <Text style={[styles.catLabel, categoria === cat.key && { color: colors.white }]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Toggle perto de mim */}
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>
          {recursosOrdenados.length} recurso{recursosOrdenados.length !== 1 ? 's' : ''}
        </Text>
        <TouchableOpacity
          onPress={() => setPertoMim(!pertoMim)}
          style={[styles.toggleBtn, pertoMim && styles.toggleBtnAtivo]}
        >
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={14}
            color={pertoMim ? colors.white : colors.outline}
          />
          <Text style={[styles.toggleBtnText, pertoMim && { color: colors.white }]}>
            Perto de mim
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de recursos */}
      <ScrollView style={styles.lista} showsVerticalScrollIndicator={false}>
        {recursosOrdenados.map(recurso => {
          const dist = distanciaTexto(recurso);
          return (
            <View key={recurso.id} style={[styles.card, { borderLeftColor: corCategoria }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardNome}>{recurso.nome}</Text>
                {recurso.gratuito && (
                  <View style={styles.gratuitoBadge}>
                    <Text style={styles.gratuitoText}>Gratuito</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardDesc}>{recurso.descricao}</Text>

              <View style={styles.cardMeta}>
                {recurso.disponibilidade && (
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="clock-outline" size={12} color={colors.outline} />
                    <Text style={styles.metaText}>{recurso.disponibilidade}</Text>
                  </View>
                )}
                {dist && (
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="map-marker" size={12} color={colors.outline} />
                    <Text style={styles.metaText}>{dist}</Text>
                  </View>
                )}
                {recurso.tipo === 'presencial' && !dist && recurso.endereco && (
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="map-marker" size={12} color={colors.outline} />
                    <Text style={styles.metaText} numberOfLines={1}>{recurso.endereco}</Text>
                  </View>
                )}
                {recurso.tipo === 'telefone' && (
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="phone" size={12} color={colors.outline} />
                    <Text style={styles.metaText}>{recurso.contato}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[styles.acessarBtn, { backgroundColor: corCategoria }]}
                onPress={() => abrirContato(recurso)}
                activeOpacity={0.85}
              >
                <Text style={styles.acessarText}>
                  {recurso.tipo === 'telefone' ? 'LIGAR' : recurso.tipo === 'online' ? 'ACESSAR' : 'VER NO MAPA'}
                </Text>
                <MaterialCommunityIcons name="arrow-right" size={14} color={colors.white} />
              </TouchableOpacity>
            </View>
          );
        })}
        <View style={{ height: 100 }} />
      </ScrollView>

      <SOSButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.navy },

  // Ligue 180
  ligue180: {
    backgroundColor: colors.rosa,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  ligue180Text: { flex: 1 },
  ligue180Titulo: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  ligue180Sub: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 1,
  },

  // Categorias
  categoriasWrapper: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.cremeDark,
  },
  categorias: { paddingHorizontal: 16, gap: 8 },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.cremeDark,
  },
  catLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurface,
  },

  // Toggle
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.creme,
  },
  toggleLabel: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: colors.outline,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outline,
    backgroundColor: colors.white,
  },
  toggleBtnAtivo: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  toggleBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    color: colors.outline,
  },

  // Lista
  lista: { flex: 1, backgroundColor: colors.creme, paddingHorizontal: 16, paddingTop: 8 },

  card: {
    backgroundColor: colors.white,
    borderRadius: 0,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderLeftWidth: 4,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  cardNome: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurface,
    flex: 1,
  },
  gratuitoBadge: {
    backgroundColor: colors.greenLight,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  gratuitoText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 9,
    color: colors.green,
    textTransform: 'uppercase',
  },
  cardDesc: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: colors.outline,
    lineHeight: 17,
    marginBottom: 10,
  },
  cardMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontFamily: 'Manrope', fontSize: 11, color: colors.outline },
  acessarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  acessarText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
