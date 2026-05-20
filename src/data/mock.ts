// ─── Relatos ────────────────────────────────────────────────────────────────

export interface Relato {
  id: number;
  tipo: string;
  local: string;
  bairro: string;
  horario: string;
  descricao: string;
  status: 'publicado' | 'em_analise';
  confirmacoes: number;
  lat: number;
  lng: number;
}

export const relatosMock: Relato[] = [
  {
    id: 1,
    tipo: 'Assédio verbal',
    local: 'Av. T-63, Setor Bueno',
    bairro: 'Setor Bueno',
    horario: 'há 12 min',
    descricao: 'Homem seguiu por dois quarteirões fazendo comentários ofensivos.',
    status: 'publicado',
    confirmacoes: 4,
    lat: -16.6869,
    lng: -49.2648,
  },
  {
    id: 2,
    tipo: 'Perseguição',
    local: 'Terminal Praça da Bíblia',
    bairro: 'Setor Central',
    horario: 'há 45 min',
    descricao: 'Saindo do ônibus, percebi homem acompanhando meus passos.',
    status: 'publicado',
    confirmacoes: 7,
    lat: -16.6794,
    lng: -49.2550,
  },
  {
    id: 3,
    tipo: 'Assédio verbal',
    local: 'Rua 88, Setor Sul',
    bairro: 'Setor Sul',
    horario: 'há 2 horas',
    descricao: 'Abordagem agressiva próximo à iluminação precária.',
    status: 'em_analise',
    confirmacoes: 1,
    lat: -16.7050,
    lng: -49.2710,
  },
  {
    id: 4,
    tipo: 'Ônibus',
    local: 'Linha 064 Circular Centro',
    bairro: 'Linha de Ônibus',
    horario: 'há 1 hora',
    descricao: 'Passageiro encostou propositalmente várias vezes durante o trajeto.',
    status: 'publicado',
    confirmacoes: 3,
    lat: -16.6800,
    lng: -49.2600,
  },
];

// ─── Linhas de Ônibus ────────────────────────────────────────────────────────

export interface LinhaOnibus {
  codigo: string;
  nome: string;
}

export const linhasOnibus: LinhaOnibus[] = [
  { codigo: '064', nome: 'Circular Centro' },
  { codigo: '404', nome: 'Setor Bueno / Terminal Isidória' },
  { codigo: '162', nome: 'Campus UFG / Terminal Bandeiras' },
  { codigo: '251', nome: 'Jardim América / Terminal Padre Pelágio' },
  { codigo: '318', nome: 'Setor Sul / Terminal Campinas' },
  { codigo: '077', nome: 'Setor Marista / Terminal Recanto do Bosque' },
  { codigo: '500', nome: 'Circular Universitária' },
  { codigo: '155', nome: 'Setor Bela Vista / Terminal Padre Pelágio' },
];

// ─── Recursos (tela Ajuda) ───────────────────────────────────────────────────

export type CategoriaRecurso =
  | 'saude'
  | 'psicologico'
  | 'financeiro'
  | 'juridico'
  | 'emprego'
  | 'moradia';

export type TipoRecurso = 'telefone' | 'presencial' | 'online';

export interface Recurso {
  id: number;
  categoria: CategoriaRecurso;
  nome: string;
  descricao: string;
  contato: string;
  tipo: TipoRecurso;
  gratuito: boolean;
  disponibilidade?: string;
  endereco?: string;
  link?: string;
  lat?: number;
  lng?: number;
}

export const recursosMock: Recurso[] = [
  // Saúde
  {
    id: 1,
    categoria: 'saude',
    nome: 'Centro de Saúde da Mulher',
    descricao: 'Atendimento especializado em saúde feminina pelo SUS',
    contato: '(62) 3524-1200',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: 'Seg-Sex 7h-17h',
    endereco: 'Av. Araguaia, 1800 — Setor Central, Goiânia',
    lat: -16.6820,
    lng: -49.2590,
  },
  {
    id: 2,
    categoria: 'saude',
    nome: 'Disque Saúde',
    descricao: 'Orientações de saúde pelo SUS — atendimento nacional',
    contato: '136',
    tipo: 'telefone',
    gratuito: true,
    disponibilidade: '24h',
  },
  {
    id: 3,
    categoria: 'saude',
    nome: 'Planejamento Familiar — SUS',
    descricao: 'Consultas, exames preventivos e anticoncepcionais gratuitos',
    contato: '(62) 3524-1100',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: 'Seg-Sex 8h-17h',
    endereco: 'UBS mais próxima de você',
  },
  // Psicológico
  {
    id: 4,
    categoria: 'psicologico',
    nome: 'CVV — Centro de Valorização da Vida',
    descricao: 'Apoio emocional e prevenção do suicídio — sigilo total',
    contato: '188',
    tipo: 'telefone',
    gratuito: true,
    disponibilidade: '24h',
  },
  {
    id: 5,
    categoria: 'psicologico',
    nome: 'CRAM — Centro de Referência da Mulher',
    descricao: 'Atendimento psicológico e social especializado para mulheres',
    contato: '(62) 3524-6200',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: 'Seg-Sex 8h-17h',
    endereco: 'Rua 235, 01 — Setor Leste Universitário, Goiânia',
    lat: -16.6900,
    lng: -49.2500,
  },
  {
    id: 6,
    categoria: 'psicologico',
    nome: 'CAPS — Centro de Atenção Psicossocial',
    descricao: 'Atendimento em saúde mental pelo SUS',
    contato: '(62) 3524-1300',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: 'Seg-Sex 7h-19h',
    endereco: 'Av. Castelo Branco, 610 — Setor Oeste, Goiânia',
    lat: -16.6780,
    lng: -49.2680,
  },
  // Financeiro
  {
    id: 7,
    categoria: 'financeiro',
    nome: 'Banco do Povo Goiás',
    descricao: 'Microcrédito para empreendedoras — sem fiador, juros baixos',
    contato: '0800 646 0660',
    tipo: 'telefone',
    gratuito: false,
    disponibilidade: 'Seg-Sex 8h-17h',
  },
  {
    id: 8,
    categoria: 'financeiro',
    nome: 'CRAS — Assistência Social',
    descricao: 'CadÚnico, Bolsa Família e programas de transferência de renda',
    contato: '(62) 3524-4500',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: 'Seg-Sex 8h-17h',
    endereco: 'CRAS mais próximo de você',
  },
  {
    id: 9,
    categoria: 'financeiro',
    nome: 'Programa Mulher Empreendedora',
    descricao: 'Capacitação e apoio financeiro para mulheres empreendedoras em Goiânia',
    contato: '(62) 3524-6500',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: 'Seg-Sex 8h-17h',
    endereco: 'Prefeitura de Goiânia — Av. do Cerrado, 999',
    lat: -16.7060,
    lng: -49.2530,
  },
  {
    id: 10,
    categoria: 'financeiro',
    nome: 'Como abrir MEI',
    descricao: 'Formalize seu negócio em minutos — gratuito e online',
    contato: '',
    tipo: 'online',
    gratuito: true,
    link: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor',
  },
  // Jurídico
  {
    id: 11,
    categoria: 'juridico',
    nome: 'DEAM — Delegacia Especializada',
    descricao: 'Atendimento exclusivo para mulheres vítimas de violência',
    contato: '(62) 3201-6000',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: '24h',
    endereco: 'Av. Anhanguera, 5195 — Setor Coimbra, Goiânia',
    lat: -16.6760,
    lng: -49.2720,
  },
  {
    id: 12,
    categoria: 'juridico',
    nome: 'Defensoria Pública de Goiás',
    descricao: 'Assistência jurídica gratuita para quem não pode pagar advogado',
    contato: '(62) 3201-5600',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: 'Seg-Sex 8h-18h',
    endereco: 'Av. Brasil, 01 — Setor Bela Vista, Goiânia',
    lat: -16.6840,
    lng: -49.2560,
  },
  {
    id: 13,
    categoria: 'juridico',
    nome: 'Boletim de Ocorrência Online',
    descricao: 'Registre seu BO sem sair de casa — SSP-GO',
    contato: '',
    tipo: 'online',
    gratuito: true,
    link: 'https://www.delegaciaonline.go.gov.br',
  },
  {
    id: 14,
    categoria: 'juridico',
    nome: 'Ligue 180',
    descricao: 'Central de Atendimento à Mulher — denúncia e orientação',
    contato: '180',
    tipo: 'telefone',
    gratuito: true,
    disponibilidade: '24h',
  },
  // Emprego
  {
    id: 15,
    categoria: 'emprego',
    nome: 'SINE Goiânia',
    descricao: 'Vagas de emprego formal com intermediação gratuita do Estado',
    contato: '(62) 3201-7000',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: 'Seg-Sex 8h-17h',
    endereco: 'Av. Anhanguera, 4760 — Setor Oeste, Goiânia',
    lat: -16.6770,
    lng: -49.2690,
  },
  {
    id: 16,
    categoria: 'emprego',
    nome: 'SENAI Goiás — Cursos Gratuitos',
    descricao: 'Qualificação profissional gratuita para mulheres em situação de vulnerabilidade',
    contato: '0800 728 2000',
    tipo: 'telefone',
    gratuito: true,
    disponibilidade: 'Seg-Sex 8h-18h',
  },
  {
    id: 17,
    categoria: 'emprego',
    nome: 'SEBRAE Goiás',
    descricao: 'Cursos, mentorias e apoio para empreendedoras',
    contato: '0800 570 0800',
    tipo: 'telefone',
    gratuito: true,
    disponibilidade: 'Seg-Sex 8h-18h',
  },
  // Moradia
  {
    id: 18,
    categoria: 'moradia',
    nome: 'Casa Abrigo de Goiânia',
    descricao: 'Abrigo sigiloso para mulheres em situação de risco grave',
    contato: '(62) 3524-6200',
    tipo: 'telefone',
    gratuito: true,
    disponibilidade: '24h',
  },
  {
    id: 19,
    categoria: 'moradia',
    nome: 'AGEHAB — Aluguel Social',
    descricao: 'Subsídio de aluguel para famílias em situação de vulnerabilidade',
    contato: '(62) 3201-8800',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: 'Seg-Sex 8h-17h',
    endereco: 'Av. do Cerrado, 1600 — Park Lozandes, Goiânia',
    lat: -16.7090,
    lng: -49.2510,
  },
  {
    id: 20,
    categoria: 'moradia',
    nome: 'Casa da Mulher Brasileira',
    descricao: 'Serviços integrados de acolhimento, saúde, assistência e justiça',
    contato: '(62) 3524-7000',
    tipo: 'presencial',
    gratuito: true,
    disponibilidade: '24h',
    endereco: 'Rua do Lazer, s/n — Parque Amazônia, Goiânia',
    lat: -16.7120,
    lng: -49.2480,
  },
];

// ─── Auth State ──────────────────────────────────────────────────────────────

export const authStateMock = {
  isVerified: false,
  userName: 'Usuária verificada',
  initials: 'UV',
};
