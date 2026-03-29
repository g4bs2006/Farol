export const colors = {
  navy:        '#1B2B4B',
  rosa:        '#C2556A',
  rosaLight:   '#E8A0A8',
  creme:       '#FAF0F2',
  cremeDark:   '#F0D8DC',
  green:       '#2D6A4F',
  greenLight:  '#E8F4EC',
  redSos:      '#B91C1C',
  redBg:       '#FEF2F2',
  white:       '#FFFFFF',
  gray:        '#6B7280',
  grayLight:   '#F3F4F6',
  onSurface:   '#1F1A1C',
  outline:     '#75777F',
  // Categorias da tela Ajuda
  purpleAjuda: '#7C5CBF',
  blueAjuda:   '#1E40AF',
  amberAjuda:  '#92400E',
} as const;

export type ColorKey = keyof typeof colors;
