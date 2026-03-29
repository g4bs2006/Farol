# CLAUDE.md — Projeto Farol

Este arquivo contém todo o contexto do projeto Farol para uso no Claude Code.
Leia este arquivo antes de qualquer tarefa relacionada ao projeto.

---

## 1. O QUE É O FAROL

Aplicativo mobile de segurança feminina desenvolvido para o **Hackathon GO! Uai Tech 3 — Mês das Mulheres**, realizado pela Prefeitura de Goiânia em parceria com a PUC Goiás.

**Tagline:** Ilumine seu caminho.

**Proposta de valor:** Mapa de calor colaborativo de violência contra a mulher, integrado à identidade digital Gov.br, com denúncia em tempo real para ônibus e acionamento da Guarda Municipal.

---

## 2. ARQUITETURA DO APP (mobile)

### Navegação — 4 abas fixas (bottom nav bar)
```
[ MAPA ]  [ DENUNCIAR ]  [ AJUDA ]  [ PERFIL ]
```

### Telas principais
- **Mapa** — público, sem login. Mapa de calor + pontos seguros + filtros + SOS
- **Denunciar** — verificado (Gov.br). Formulário adaptativo: modo Espaço público ou Ônibus
- **Ajuda** — público. Hub de recursos por categoria (Saúde, Psicológico, Financeiro, Jurídico, Emprego, Moradia)
- **Perfil** — verificado. Contatos de confiança, modo discreto, histórico, notificações de risco

### Telas especiais
- **Modal SOS** — overlay ao segurar botão vermelho 3s. Countdown + lista de ações + cancelar
- **Emergência acionada** — tela vermelha full-screen. Guarda notificada + localização em tempo real
- **Verificação Gov.br** — bottom sheet. Aparece ao tentar acessar área restrita sem login

---

## 3. DESIGN SYSTEM — PALETA OBRIGATÓRIA

**Nome da paleta:** Rosa Terracota e Marinho

```
--navy:        #1B2B4B   headers, nav bar, fundos institucionais
--rosa:        #C2556A   botões primários, badges, ação principal
--rosa-light:  #E8A0A8   ícones inativos, elementos secundários
--creme:       #FAF0F2   fundo das telas de conteúdo
--creme-dark:  #F0D8DC   chips não selecionados, cards secundários
--green:       #2D6A4F   badge de anonimato, status positivo
--green-light: #E8F4EC   fundo do badge de anonimato
--red-sos:     #B91C1C   botão SOS, emergência
--red-bg:      #FEF2F2   fundo card de ocorrência em tempo real
--white:       #FFFFFF
--gray:        #6B7280
--gray-light:  #F3F4F6
--on-surface:  #1F1A1C
--outline:     #75777F
```

### Regras de cor inegociáveis
- Header: sempre `#1B2B4B`
- Nav bar: sempre `#1B2B4B`
- Chip selecionado: fundo `#1B2B4B`, texto branco
- Chip não selecionado: fundo `#F0D8DC`, texto `#C2556A`
- Botão primário: fundo `#C2556A` (nunca usar variantes como `#A03B51`)
- SOS: fundo `#B91C1C`
- Nunca usar laranja, roxo ou azul como cor de destaque

---

## 4. TIPOGRAFIA

```
Títulos e logo:  Georgia (serif), bold
Interface/corpo: Manrope (sans-serif)
Fallback:        Calibri, system-ui
```

### Escala tipográfica
```
Header title:    Manrope 700, 18px, branco (NUNCA serif no header)
Section label:   Manrope 700, 10px, uppercase, letter-spacing 0.08em, #75777F
Body:            Manrope 400, 14px, #1F1A1C
Caption:         Manrope 600, 11px
Button:          Manrope 700, 14px, uppercase, letter-spacing 0.08em
Chip text:       Manrope 700, 11px, uppercase, letter-spacing 0.08em
```

### Logo
```
"Fa" — Georgia bold, #C2556A (rosa)
"rol" — Georgia bold, #FFFFFF (branco, sobre fundo escuro)
         ou #1B2B4B (navy, sobre fundo claro)
```

---

## 5. COMPONENTES — ESPECIFICAÇÕES

### Bottom Nav Bar
```css
background: #1B2B4B;
height: 64px;
/* Aba ativa: ícone branco, label #E8A0A8 */
/* Aba inativa: ícone e label #8B9EC4 */
```

### Botão SOS (flutuante, todas as telas)
```css
width: 56px;
height: 56px;
border-radius: 50%;
background: #B91C1C;
position: fixed;
bottom: 88px;
right: 16px;
z-index: 9999;
/* Ícone: shield preenchido, branco, 24px */
/* Label "SOS" abaixo: 9px, #B91C1C, bold */
/* NUNCA usar asterisco ou ícone genérico */
```

### Chips de seleção
```css
/* Selecionado */
background: #1B2B4B;
color: #FFFFFF;
border-radius: 20px; /* pill — para seletor de modo */
border-radius: 12px; /* suave — para chips de tipo de ocorrência */

/* Não selecionado */
background: #F0D8DC;
color: #C2556A;
```

### Badge de anonimato (obrigatório em todo formulário)
```css
background: #E8F4EC;
border-left: 3px solid #2D6A4F;
border-radius: 0 8px 8px 0;
/* Ícone shield_person verde #2D6A4F */
/* Texto: "Seu relato será enviado de forma totalmente anônima.
   Seus dados do Gov.br são usados apenas para validação interna." */
```

### Cards de input (ghost border style)
```css
/* Sem box — usar apenas border-bottom */
border-bottom: 2px solid rgba(197, 198, 207, 0.3);
/* Foco: border-bottom color muda para #C2556A */
background: transparent;
```

### Botão primário
```css
background: #C2556A;
color: #FFFFFF;
border-radius: 28px;
height: 56px;
font: Manrope 700 14px uppercase;
letter-spacing: 0.08em;
/* Ícone shield branco à esquerda em botões de segurança */
```

### Card de emergência em tempo real (modo ônibus)
```css
background: #FEF2F2;
border: 1.5px solid #B91C1C;
border-radius: 14px;
/* Botão interno: background #B91C1C, texto branco, pill */
```

---

## 6. FORMULÁRIO DE DENÚNCIA — COMPORTAMENTO

### Estado inicial dos chips de ocorrência
**"Assédio verbal" sempre selecionado por padrão** em ambos os modos.

### Modo Espaço público — campos
1. Tipo de ocorrência (grade 2x2): Assédio verbal | Assédio físico | Perseguição | Outro
2. Local (input com ícone de pin)
3. Horário (time picker)
4. Descrição (textarea, máx 500 chars)
5. Toggle "Autorizar visita da Guarda" (card com borda esquerda navy)
6. Badge de anonimato
7. Botão "Enviar relato com segurança"

### Modo Ônibus — campos
1. Card "Ocorrência agora" (vermelho) com botão "ACIONAR GUARDA AGORA"
2. Tipo de ocorrência (grade 2x2)
3. Linha do ônibus (input com autocomplete)
4. Sentido: Ida | Volta
5. Ponto de embarque
6. Horário + Número do veículo (opcional)
7. Descrição dos fatos
8. Badge de anonimato
9. Botão "Enviar relato com segurança"

### Autocomplete de linhas de ônibus (mock data)
```javascript
const linhasOnibus = [
  { codigo: "064", nome: "Circular Centro" },
  { codigo: "404", nome: "Setor Bueno / Terminal Isidória" },
  { codigo: "162", nome: "Campus UFG / Terminal Bandeiras" },
  { codigo: "251", nome: "Jardim América / Terminal Padre Pelágio" },
  { codigo: "318", nome: "Setor Sul / Terminal Campinas" },
  { codigo: "077", nome: "Setor Marista / Terminal Recanto do Bosque" },
  { codigo: "500", nome: "Circular Universitária" },
  { codigo: "155", nome: "Setor Bela Vista / Terminal Padre Pelágio" },
];
```

---

## 7. DADOS MOCK

### Relatos para feed/mapa
```javascript
const relatosMock = [
  {
    id: 1,
    tipo: "Assédio verbal",
    local: "Av. T-63, Setor Bueno",
    bairro: "Setor Bueno",
    horario: "há 12 min",
    descricao: "Homem seguiu por dois quarteirões fazendo comentários ofensivos.",
    status: "publicado",
    confirmacoes: 4,
    lat: -16.6869,
    lng: -49.2648,
  },
  {
    id: 2,
    tipo: "Perseguição",
    local: "Terminal Praça da Bíblia",
    bairro: "Setor Central",
    horario: "há 45 min",
    descricao: "Saindo do ônibus, percebi homem acompanhando meus passos.",
    status: "publicado",
    confirmacoes: 7,
    lat: -16.6794,
    lng: -49.2550,
  },
  {
    id: 3,
    tipo: "Assédio verbal",
    local: "Rua 88, Setor Sul",
    bairro: "Setor Sul",
    horario: "há 2 horas",
    descricao: "Abordagem agressiva próximo à iluminação precária.",
    status: "em_analise",
    confirmacoes: 1,
    lat: -16.7050,
    lng: -49.2710,
  },
  {
    id: 4,
    tipo: "Ônibus",
    local: "Linha 064 Circular Centro",
    bairro: "Linha de Ônibus",
    horario: "há 1 hora",
    descricao: "Passageiro encostou propositalmente várias vezes durante o trajeto.",
    status: "publicado",
    confirmacoes: 3,
    lat: -16.6800,
    lng: -49.2600,
  },
];
```

### Estado de autenticação (mock)
```javascript
const authState = {
  isVerified: false, // toggle para simular login Gov.br
  userName: "Usuária verificada",
  initials: "UV",
};
```

---

## 8. FUNCIONALIDADES ESPECIAIS

### Sistema SOS
- Botão vermelho flutuante em TODAS as telas
- Segurar 3 segundos para acionar (evitar acidentais)
- Ao acionar: overlay modal com countdown 3, 2, 1
- Após confirmar: tela vermelha full-screen com status
- Ações: notificar Guarda Municipal + alertar contatos + iniciar gravação de áudio

### Notificações de Zona de Risco
- Geofencing: detecta quando usuária entra em área com alta concentração
- Texto das notificações deve ser informativo, NUNCA alarmista
- Exemplo correto: "Setor Bueno tem 5 relatos nas últimas 6h. Fique atenta."
- Configurável no Perfil: toggle on/off, toggle noturno, slider de raio (100m / 250m / 500m)

### Modo Discreto
- App aparece como calculadora na tela inicial
- Código secreto para abrir o Farol real: 2206
- Toggle no Perfil

### Acionar Guarda (modo Ônibus)
- Botão "ACIONAR GUARDA AGORA" no card vermelho
- Inicia gravação de áudio automática
- Compartilha localização GPS em tempo real com central da Guarda
- Ônibus pode ser interceptado

### Toggle "Autorizar visita da Guarda" (modo Espaço público)
- Card com borda esquerda navy, ícone shield_person
- Quando ativo: compartilha localização em tempo real
- Texto quando ativo: "Localização compartilhada em tempo real"

---

## 9. DASHBOARD WEB (gestores públicos)

### Usuários
Prefeitura de Goiânia, Guarda Municipal, SENAI, órgãos parceiros.

### Páginas
1. **Visão Geral** — KPIs, mapa miniatura, gráfico por período, tabelas
2. **Mapa de Incidentes** — mapa full + painel lateral de filtros e lista
3. **Relatos** — tabela com moderação, drawer de encaminhamento para órgãos
4. **Transporte** — monitoramento ao vivo de ônibus, alertas em tempo real
5. **Relatórios** — exportação PDF/CSV, alertas automáticos para órgãos
6. **Notificações** — configuração de alertas para gestores e para usuárias

### Paleta do dashboard
```
Sidebar:    #1B2B4B (navy)
Fundo:      #F8FAFC
Cards:      #FFFFFF
Rosa:       #C2556A (incidentes)
Verde:      #2D6A4F (resoluções)
Azul:       #1E40AF (ônibus)
Âmbar:      #92400E (atenção)
```

---

## 10. STACK TÉCNICA

### App mobile
```
Framework:    React Native (iOS + Android)
Estilo:       Tailwind CSS com tokens customizados
Navegação:    React Navigation (bottom tabs — 3 abas)
Mapas:        react-leaflet + OpenStreetMap (ou Mapbox GL)
Heatmap:      leaflet.heat plugin
Auth:         OAuth 2.0 com Gov.br (Serpro) — mock em desenvolvimento
Estado:       useState + useContext (sem Redux no MVP)
Push:         Firebase Cloud Messaging
Geofencing:   API nativa iOS/Android (sem biblioteca externa)
```

### Backend (roadmap)
```
API:          Node.js + REST
Banco:        PostgreSQL com PostGIS
Auth:         OAuth 2.0 Gov.br
Infra:        AWS ou Azure GovCloud
GTFS:         Dados públicos da RMTC de Goiânia
```

### Segurança e privacidade (LGPD)
- CPF nunca armazenado — apenas hash SHA-256 irreversível
- Relatos desvinculados do perfil antes da exibição pública
- Horários arredondados para intervalos de 15 minutos
- Endereços exatos não exibidos no feed
- Base legal: consentimento (art. 7, I) e interesse público (art. 7, III)

---

## 11. PARCERIAS E CONTEXTO INSTITUCIONAL

- **Prefeitura de Goiânia / SIT** — realizador, financia operação
- **PUC Goiás** — incubação e pesquisa
- **Secretaria da Mulher** — moderação de relatos sensíveis
- **SSP-GO** — dados históricos para pré-população do mapa
- **Gov.br / Serpro** — infraestrutura de autenticação
- **RMTC** — GTFS das linhas de ônibus e ouvidoria
- **Guarda Municipal** — interceptação de ônibus e visitas de apoio
- **Ligue 180** — dados históricos e rede de apoio

---

## 12. DECISÕES DE DESIGN IMPORTANTES

1. **Mapa é público, relatos são restritos** — barreira contra agressores
2. **3 abas apenas** — MAPA, DENUNCIAR, PERFIL (sem feed/rede social)
3. **Badge de anonimato** obrigatório em todo formulário, sem exceção
4. **"Assédio verbal" sempre selecionado por padrão** nos chips
5. **SOS nunca pode cobrir outros elementos interativos** — padding-bottom adequado
6. **Header NUNCA usa fonte serif** — sempre Manrope bold
7. **Cor do botão primário é #C2556A exato** — nunca variantes escuras
8. **Notificações de risco com texto acolhedor** — nunca alarmista

---

## 13. ARQUIVOS JÁ GERADOS

Os seguintes arquivos foram produzidos na conversa e estão disponíveis:

- `Farol_Documentacao_Completa.docx` — documentação técnica completa
- `Farol_Pitch_Deck.pptx` — apresentação de 9 slides
- `Farol_Prompt_Lovable.txt` — prompt para desenvolvimento no Lovable
- `Farol_Prompt_Stitch.txt` — prompt completo para o Google Stitch
- `Farol_Prompts_Correcoes.txt` — prompts de correção visual
- `Farol_Prompt_Alinhamento_Telas.txt` — alinhamento entre telas
- `Farol_Prompt_Correcoes_Stitch.txt` — correções pós-análise das telas
- `Farol_Prompt_Fontes_Cores_Stitch.txt` — correção de fontes e cores

---

## 14. COMANDOS ÚTEIS PARA CLAUDE CODE

```bash
# Instalar dependências do projeto React Native
npm install

# Rodar no iOS
npx react-native run-ios

# Rodar no Android
npx react-native run-android

# Verificar tipos
npx tsc --noEmit

# Lint
npx eslint src/

# Testes
npx jest
```

---

*Última atualização: março de 2026*
*Versão do projeto: 1.0 — MVP Hackathon*