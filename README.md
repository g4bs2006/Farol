# 🔦 Farol

> **Ilumine seu caminho.**

Aplicativo mobile de segurança feminina desenvolvido para o
**Hackathon GO! Uai Tech 3 — Mês das Mulheres**, realizado pela
Prefeitura de Goiânia em parceria com a PUC Goiás.

---

## 📱 Sobre o projeto

O Farol é um app colaborativo de segurança para mulheres que combina:

- **Mapa de calor** de ocorrências de violência e assédio em Goiânia
- **Denúncia anônima** verificada por identidade digital Gov.br
- **Acionamento da Guarda Municipal** em tempo real via modo ônibus
- **Hub de recursos** de saúde, apoio psicológico, jurídico, financeiro,
  emprego e moradia para promover a independência feminina
- **Botão SOS** com countdown de 3 segundos, gravação de áudio e
  compartilhamento de localização em tempo real

---

## 🗂️ Estrutura de navegação


| Aba | Acesso | Descrição |
|---|---|---|
| Mapa | Público | Mapa de calor + filtros + pontos seguros + linhas problemáticas |
| Denunciar | Verificado (Gov.br) | Formulário modo Espaço público ou Ônibus |
| Ajuda | Público | Hub de recursos por categoria |
| Perfil | Verificado | Contatos de confiança, notificações, modo discreto |

### Telas especiais
- **SOSModal** — overlay com countdown animado de 3 segundos
- **EmergenciaScreen** — tela vermelha full-screen com status em tempo real
- **VerificacaoGovBrSheet** — bottom sheet de autenticação Gov.br

---

## 🛠️ Stack técnica

| Camada | Tecnologia |
|---|---|
| Framework | Expo SDK 54 (Managed Workflow) |
| Linguagem | TypeScript |
| Navegação | React Navigation v7 (Stack + Bottom Tabs) |
| Mapas | react-native-maps |
| Animações | react-native-reanimated v4 |
| Gestos | react-native-gesture-handler |
| Localização | expo-location |
| Áudio | expo-av |
| Fontes | expo-font (Manrope + Georgia) |
| Ícones | @expo/vector-icons (MaterialCommunityIcons) |
| Slider | @react-native-community/slider |
| Safe Area | react-native-safe-area-context |
| Estado | useState + useContext (sem Redux) |

---

## 📁 Estrutura de pastas

farol/
├── App.tsx # Entry point — providers + navegação
├── app.json # Config Expo + chave Google Maps
│
└── src/
├── theme/
│ ├── colors.ts # Tokens de cor (paleta Rosa Terracota e Marinho)
│ └── typography.ts # Escala tipográfica (Manrope + Georgia)
│
├── data/
│ └── mock.ts # Relatos, linhas de ônibus, recursos, auth
│
├── context/
│ ├── AuthContext.tsx # Estado de autenticação Gov.br
│ └── SOSContext.tsx # Máquina de estados do SOS (idle/countdown/ativo)
│
├── navigation/
│ ├── RootNavigator.tsx # Stack root (tabs + modais)
│ └── MainTabs.tsx # Bottom tab navigator (4 abas)
│
├── components/
│ ├── layout/
│ │ ├── NavyHeader.tsx # Header padrão navy
│ │ └── SOSButton.tsx # Botão flutuante SOS (hold 3s)
│ ├── ui/
│ │ ├── PrimaryButton.tsx # Botão primário rosa
│ │ ├── Chip.tsx # Chip selecionável (pill / soft)
│ │ ├── GhostInput.tsx # Input com borda inferior
│ │ └── SectionLabel.tsx # Label de seção uppercase
│ └── forms/
│ ├── AnonymityBadge.tsx # Badge verde de anonimato (obrigatório)
│ ├── GuardToggleCard.tsx # Toggle de autorizar visita da Guarda
│ ├── EmergencyCard.tsx # Card vermelho de ocorrência em ônibus
│ └── OccurrenceChipGrid.tsx # Grid 2x2 de tipo de ocorrência
│
└── screens/
├── MapaScreen.tsx # Mapa + heatmap + filtros + busca + rota
├── DenunciarScreen.tsx # Formulário adaptativo (público / ônibus)
├── AjudaScreen.tsx # Hub de recursos + "Perto de mim"
├── PerfilScreen.tsx # Perfil + contatos + configurações
├── SOSModal.tsx # Countdown SOS animado
├── EmergenciaScreen.tsx # Tela de emergência vermelha
└── VerificacaoGovBrSheet.tsx # Bottom sheet de verificação

---

## 🎨 Design System

### Paleta — Rosa Terracota e Marinho

| Token | Hex | Uso |
|---|---|---|
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

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js 18+
- Expo Go instalado no celular (Android / iOS)
- Celular e computador na **mesma rede Wi-Fi**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/farol.git
cd farol/farol

# Instale as dependências
npm install --legacy-peer-deps

# Inicie o projeto
npx expo start --clear
