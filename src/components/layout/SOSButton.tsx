import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { useSOS } from '../../context/SOSContext';

const HOLD_DURATION = 3000;

export default function SOSButton() {
  const navigation   = useNavigation<any>();
  const { fase, iniciarSOS } = useSOS();
  const scaleAnim   = useRef(new Animated.Value(1)).current;
  const holdTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navega para SOSModal quando countdown inicia
  useEffect(() => {
    if (fase === 'countdown') {
      navigation.navigate('SOSModal');
    }
  }, [fase]);

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.88, useNativeDriver: true }).start();
    holdTimer.current = setTimeout(() => {
      iniciarSOS();
    }, HOLD_DURATION);
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  if (fase !== 'idle') return null;

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
          <MaterialCommunityIcons name="shield" size={24} color={colors.white} />
        </Animated.View>
        <Text style={styles.label}>SOS</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 9999,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.redSos,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.redSos,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.redSos,
    marginTop: 3,
    fontFamily: 'Manrope-Bold',
  },
});
