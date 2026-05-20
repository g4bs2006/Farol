export const fonts = {
  georgia:      'Georgia',
  manrope:      'Manrope',
  manropeBold:  'Manrope-Bold',
} as const;

export const typography = {
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  sectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
    color: '#75777F',
  },
  body: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '400' as const,
    color: '#1F1A1C',
  },
  caption: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    fontWeight: '600' as const,
  },
  button: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
  },
  chip: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
  },
  logoFa: {
    fontFamily: 'Georgia',
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#C2556A',
  },
  logoRol: {
    fontFamily: 'Georgia',
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
} as const;
