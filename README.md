# Farol

> Ilumine seu caminho.

![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=flat&logo=react&logoColor=black)
![Hackathon](https://img.shields.io/badge/Hackathon-GO!%20Uai%20Tech%203-1B2B4B?style=flat)

Aplicativo mobile de segurança feminina desenvolvido para o **Hackathon GO! Uai Tech 3 — Mês das Mulheres**, realizado pela Prefeitura de Goiânia em parceria com a PUC Goiás.

---

## Sobre o projeto

O Farol é um app colaborativo de segurança para mulheres que combina:

- **Mapa de calor** de ocorrências de violência e assédio em Goiânia
- **Denúncia anônima** verificada por identidade digital Gov.br
- **Acionamento da Guarda Municipal** em tempo real via modo ônibus
- **Hub de recursos** de saúde, apoio psicológico, jurídico, financeiro, emprego e moradia
- **Botão SOS** com countdown de 3 segundos, gravação de áudio e compartilhamento de localização em tempo real

---

## Screenshots

| Mapa | Denunciar | Ajuda | SOS |
|------|-----------|-------|-----|
| _em breve_ | _em breve_ | _em breve_ | _em breve_ |

---

## Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Expo SDK 54 (Managed Workflow) |
| Linguagem | TypeScript |
| Navegação | React Navigation v7 (Stack + Bottom Tabs) |
| Mapas | react-native-maps |
| Animações | react-native-reanimated v4 |
| Gestos | react-native-gesture-handler |
| Localização | expo-location |
| Audio | expo-av |
| Fontes | expo-font (Manrope + Georgia) |
| Icones | @expo/vector-icons (MaterialCommunityIcons) |
| Estado | useState + useContext |

---

## Estrutura de pastas

```
Farol/
├── App.tsx
├── app.json
├── index.ts
└── src/
    ├── theme/
    │   ├── colors.ts
    │   └── typography.ts
    ├── data/
    │   └── mock.ts
    ├── context/
    │   ├── AuthContext.tsx
    │   └── SOSContext.tsx
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   └── MainTabs.tsx
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

## Como rodar

**Pré-requisitos:**
- Node.js 18+
- Expo Go instalado no celular (Android / iOS)
- Celular e computador na mesma rede Wi-Fi

```bash
git clone https://github.com/g4bs2006/Farol.git
cd Farol
npm install --legacy-peer-deps
npx expo start --clear
```

Escaneie o QR code com o Expo Go.

---

## Design System

### Paleta — Rosa Terracota e Marinho

| Token | Hex | Uso |
|-------|-----|-----|
| `navy` | `#1B2B4B` | Headers, nav bar, fundos institucionais |
| `rosa` | `#C2556A` | Botões primários, badges, ação principal |
| `rosaLight` | `#E8A0A8` | Ícones inativos, elementos secundários |
| `creme` | `#FAF0F2` | Fundo das telas de conteúdo |
| `cremeDark` | `#F0D8DC` | Chips não selecionados, cards secundários |
| `green` | `#2D6A4F` | Badge de anonimato, status positivo |
| `redSos` | `#B91C1C` | Botão SOS, emergência |

### Tipografia

- **Títulos / Logo:** Georgia (serif), bold
- **Interface / Corpo:** Manrope (sans-serif)
