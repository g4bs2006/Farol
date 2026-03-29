# PREPARO.md — Documento de Preparação para Desenvolvimento
## Projeto Farol — App Mobile React Native + TypeScript

> Este documento é o guia de referência antes e durante o desenvolvimento.
> Todas as decisões aqui foram aprovadas em sessão de brainstorm.

---

## 1. STACK FINAL APROVADA

| Item | Decisão |
|---|---|
| Framework | Expo SDK 51+ (Managed Workflow) |
| Linguagem | TypeScript |
| Estilo | StyleSheet nativo do RN (sem Tailwind) com tokens do theme/ |
| Navegação | React Navigation v6 |
| Mapas | react-native-maps |
| Bottom Sheet | @gorhom/bottom-sheet |
| Gestos | react-native-gesture-handler |
| Animações | react-native-reanimated |
| Fontes | expo-font (Georgia + Manrope) |
| Localização | expo-location |
| Áudio | expo-av |
| Ícones | @expo/vector-icons (MaterialCommunityIcons) |
| Links externos | Linking.openURL() — nativo RN, sem dependência extra |
| WebView | ROADMAP v2 — não entra no MVP |

---

## 2. TELAS — INVENTÁRIO COMPLETO

| # | Tela | Arquivo | Tipo | Acesso |
|---|---|---|---|---|
| 1 | Mapa | `MapaScreen.tsx` | Tab | Público |
| 2 | Denunciar | `DenunciarScreen.tsx` | Tab | Verificado (Gov.br) |
| 3 | Ajuda | `AjudaScreen.tsx` | Tab | Público |
| 4 | Perfil | `PerfilScreen.tsx` | Tab | Verificado |
| 5 | SOS Modal | `SOSModal.tsx` | Modal overlay | Todas as telas |
| 6 | Emergência | `EmergenciaScreen.tsx` | Modal full-screen | Pós-SOS confirmado |
| 7 | Verificação Gov.br | `VerificacaoGovBrSheet.tsx` | Modal bottom sheet | Gatilho: área restrita sem login |

---

## 3. ÁRVORE DE NAVEGAÇÃO

```
RootNavigator (Stack Navigator)
├── MainTabs (Bottom Tab Navigator)
│   ├── MapaScreen           ← aba 1
│   ├── DenunciarScreen      ← aba 2
│   ├── AjudaScreen          ← aba 3
│   └── PerfilScreen         ← aba 4
│
├── SOSModal                 ← modal transparente, apresentação "transparentModal"
├── EmergenciaScreen         ← modal full-screen vermelho, sem header
└── VerificacaoGovBrSheet    ← modal bottom sheet (@gorhom/bottom-sheet)
```

### Ícones do bottom nav

| Aba | Ícone (MaterialCommunityIcons) |
|---|---|
| MAPA | `map-marker-radius` |
| DENUNCIAR | `alert-circle` |
| AJUDA | `hand-heart` |
| PERFIL | `account-circle` |

---

## 4. ESTRUTURA DE PASTAS

```
farol/
├── app.json
├── App.tsx                  ← entry point — providers + RootNavigator
├── tsconfig.json
├── package.json
│
└── src/
    ├── assets/
    │   └── fonts/           ← arquivos .ttf de Manrope (variantes) e Georgia
    │
    ├── theme/
    │   ├── colors.ts        ← todos os tokens de cor
    │   └── typography.ts    ← escala tipográfica completa
    │
    ├── data/
    │   └── mock.ts          ← relatosMock, linhasOnibus, recursosMock, authState
    │
    ├── context/
    │   ├── AuthContext.tsx  ← isVerified, userName, initials
    │   └── SOSContext.tsx   ← sosAtivo, countdown, faseAtual
    │
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   └── MainTabs.tsx
    │
    ├── components/
    │   ├── layout/
    │   │   ├── NavyHeader.tsx
    │   │   └── SOSButton.tsx
    │   ├── ui/
    │   │   ├── PrimaryButton.tsx
    │   │   ├── Chip.tsx
    │   │   ├── GhostInput.tsx
    │   │   └── SectionLabel.tsx
    │   └── forms/
    │       ├── AnonymityBadge.tsx
    │       ├── GuardToggleCard.tsx
    │       ├── EmergencyCard.tsx
    │       └── OccurrenceChipGrid.tsx
    │
    └── screens/
        ├── MapaScreen.tsx
        ├── DenunciarScreen.tsx
        ├── AjudaScreen.tsx
        ├── PerfilScreen.tsx
        ├── SOSModal.tsx
        ├── EmergenciaScreen.tsx
        └── VerificacaoGovBrSheet.tsx
```

---

## 5. DEPENDÊNCIAS (package.json)

```json
{
  "dependencies": {
    "expo": "~51.0.0",
    "expo-font": "^12.0.0",
    "expo-location": "^17.0.0",
    "expo-av": "^14.0.0",
    "expo-splash-screen": "^0.27.0",
    "expo-status-bar": "^1.12.0",
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "@react-navigation/stack": "^6.3.0",
    "react-native-maps": "^1.14.0",
    "react-native-gesture-handler": "^2.16.0",
    "react-native-reanimated": "^3.10.0",
    "react-native-safe-area-context": "^4.10.0",
    "react-native-screens": "^3.31.0",
    "@gorhom/bottom-sheet": "^4.6.0",
    "react": "18.2.0",
    "react-native": "0.74.0"
  }
}
```

---

## 6. TOKENS DE DESIGN (theme/colors.ts)

```typescript
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
```

---

## 7. INVENTÁRIO DE COMPONENTES

### Layout
| Componente | Props principais | Telas que usam |
|---|---|---|
| `NavyHeader` | `title`, `showBack?` | Todas as tabs + modais |
| `SOSButton` | `onLongPress` | Todas as tabs |

### UI
| Componente | Props principais | Telas que usam |
|---|---|---|
| `PrimaryButton` | `label`, `onPress`, `icon?` | Denunciar, Perfil |
| `Chip` | `label`, `selected`, `onPress` | Denunciar, Ajuda |
| `GhostInput` | `label`, `value`, `onChange`, `icon?` | Denunciar |
| `SectionLabel` | `text` | Denunciar, Perfil, Ajuda |

### Forms
| Componente | Props principais | Telas que usam |
|---|---|---|
| `AnonymityBadge` | — (sem props) | Denunciar (obrigatório) |
| `GuardToggleCard` | `value`, `onChange` | Denunciar (modo público) |
| `EmergencyCard` | `onAcionar` | Denunciar (modo ônibus) |
| `OccurrenceChipGrid` | `selected`, `onChange` | Denunciar |

---

## 8. CONTEXTOS

### AuthContext
```typescript
interface AuthContextType {
  isVerified: boolean;
  userName: string;
  initials: string;
  login: () => void;   // mock: seta isVerified = true
  logout: () => void;
}
```

### SOSContext
```typescript
type SOSFase = 'idle' | 'countdown' | 'ativo';

interface SOSContextType {
  fase: SOSFase;
  countdown: number;   // 3, 2, 1
  iniciarSOS: () => void;
  cancelarSOS: () => void;
  confirmarSOS: () => void;
}
```

---

## 9. TELA AJUDA — ESPECIFICAÇÃO DETALHADA

### Layout
```
Header navy "Ajuda"
Card fixo Ligue 180 (rosa #C2556A, texto branco)
Chips de categoria (scroll horizontal)
Toggle [ Todos ] / [ Perto de mim ]
Lista de cards de recursos (scroll vertical)
```

### Categorias e cores de borda
| Categoria | Cor da borda | Ícone |
|---|---|---|
| Saúde | `#C2556A` (rosa) | `heart-plus` |
| Psicológico | `#7C5CBF` (roxo suave) | `brain` |
| Financeiro | `#2D6A4F` (verde) | `trending-up` |
| Jurídico | `#1B2B4B` (navy) | `gavel` |
| Emprego | `#1E40AF` (azul) | `briefcase-account` |
| Moradia | `#92400E` (âmbar) | `home-heart` |

### Comportamento "Perto de mim"
- Usa `expo-location` para obter coordenadas
- Filtra recursos com campo `endereco` definido
- Ordena por distância (cálculo Haversine simples)
- Recursos apenas com telefone aparecem com tag "Atendimento remoto"

### Card de recurso — campos
```typescript
interface Recurso {
  id: number;
  categoria: 'saude' | 'psicologico' | 'financeiro' | 'juridico' | 'emprego' | 'moradia';
  nome: string;
  descricao: string;
  contato: string;
  tipo: 'telefone' | 'presencial' | 'online';
  gratuito: boolean;
  disponibilidade?: string;  // ex: "24h", "Seg-Sex 8h-18h"
  endereco?: string;
  link?: string;
  lat?: number;
  lng?: number;
}
```

### Ação do botão "Acessar"
- `tipo === 'telefone'` → `Linking.openURL('tel:' + contato)`
- `tipo === 'online'` → `Linking.openURL(link)`
- `tipo === 'presencial'` → abre Google Maps com o endereço

---

## 10. FLUXO SOS — ESPECIFICAÇÃO

```
[Usuária segura botão SOS por 3s]
         ↓
[SOSModal aparece — overlay semitransparente]
[Countdown animado: 3... 2... 1...]
[Botão "Cancelar" disponível]
         ↓ (se não cancelar)
[EmergenciaScreen — full screen #B91C1C]
[Texto: "Guarda Municipal notificada"]
[Localização sendo compartilhada em tempo real]
[Gravação de áudio iniciada]
[Botão "Encerrar emergência" no rodapé]
```

### Estados do SOSContext
```
idle → (longPress 3s) → countdown → (fim countdown) → ativo
ativo → (encerrar) → idle
countdown → (cancelar) → idle
```

---

## 11. FLUXO GOV.BR — ESPECIFICAÇÃO

```
[Usuária toca aba "Denunciar" ou "Perfil" sem login]
         ↓
[VerificacaoGovBrSheet sobe (bottom sheet)]
[Título: "Verificação necessária"]
[Texto explicativo sobre Gov.br]
[Botão "Verificar com Gov.br" → mock: seta isVerified = true]
[Botão "Agora não" → fecha sheet, permanece na tela]
```

---

## 12. ORDEM DE IMPLEMENTAÇÃO

### Fase 1 — Fundação (sem UI visível)
- [ ] `npx create-expo-app farol --template expo-template-blank-typescript`
- [ ] Instalar todas as dependências
- [ ] `src/theme/colors.ts`
- [ ] `src/theme/typography.ts`
- [ ] `src/data/mock.ts` (relatosMock + linhasOnibus + recursosMock + authState)
- [ ] `src/context/AuthContext.tsx`
- [ ] `src/context/SOSContext.tsx`
- [ ] `src/navigation/MainTabs.tsx` (abas com telas placeholder)
- [ ] `src/navigation/RootNavigator.tsx`
- [ ] `App.tsx` com providers e navegação

### Fase 2 — Componentes base
- [ ] `NavyHeader`
- [ ] `SOSButton` (com LongPress handler)
- [ ] `PrimaryButton`
- [ ] `Chip`
- [ ] `GhostInput`
- [ ] `SectionLabel`
- [ ] `AnonymityBadge`
- [ ] `GuardToggleCard`
- [ ] `EmergencyCard`
- [ ] `OccurrenceChipGrid`

### Fase 3 — Telas Tab
- [ ] `MapaScreen` (mapa + mock heatmap + filtros + pontos seguros)
- [ ] `DenunciarScreen` (modo público + modo ônibus)
- [ ] `AjudaScreen` (card Ligue 180 + chips + lista + "perto de mim")
- [ ] `PerfilScreen` (contatos + toggles + histórico)

### Fase 4 — Modais
- [ ] `VerificacaoGovBrSheet`
- [ ] `SOSModal` (countdown animado)
- [ ] `EmergenciaScreen`

### Fase 5 — Integração e polimento
- [ ] Carregar fontes Georgia + Manrope via expo-font
- [ ] Ligar SOSButton a SOSContext em todas as telas
- [ ] Ligar DenunciarScreen e PerfilScreen ao VerificacaoGovBrSheet
- [ ] Testar fluxo completo de navegação
- [ ] Ajuste de safe areas (notch iOS + barra Android)

---

## 13. RISCOS E MITIGAÇÕES

| Risco | Mitigação |
|---|---|
| Georgia não disponível no Android | Carregar via expo-font com .ttf; fallback `serif` |
| Heatmap nativo complexo | MVP: circles coloridos no mapa como mock do heatmap |
| LongPress 3s SOS no modal | Usar `onLongPress` + `delayLongPress={3000}` + feedback Animated |
| Safe area inconsistente iOS/Android | SafeAreaView de react-native-safe-area-context em todas as screens |
| @gorhom/bottom-sheet + gesture handler | Envolver App.tsx com GestureHandlerRootView |
| expo-location permissão | Pedir permissão antes de usar "Perto de mim" |

---

## 14. ROADMAP (pós-MVP / v2)

- [ ] WebView interna para recursos (em vez de browser externo)
- [ ] Heatmap real com leaflet.heat via WebView
- [ ] Integração OAuth 2.0 real com Gov.br
- [ ] Backend Node.js + PostgreSQL/PostGIS
- [ ] Geofencing nativo (notificações de zona de risco reais)
- [ ] GTFS da RMTC integrado no autocomplete de linhas
- [ ] Modo Discreto (app calculadora com código 2206)

---

*Documento criado: março de 2026*
*Status: aprovado — pronto para desenvolvimento*
