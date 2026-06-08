export interface CarreraInfo {
  id: string;
  nombre: string;
  nombreCorto: string;
  emoji: string;
  descripcion: string;
  campoLaboral: string;
  salario: string;
  // Paleta de colores para esta carrera (claro)
  color: {
    bg: string;       // fondo de card
    accent: string;   // color principal
    text: string;     // texto sobre accent
    badge: string;    // fondo de badge suave
    badgeText: string;// texto del badge
    border: string;   // borde
    bar: string;      // barra de progreso
  };
}

export const CARRERAS: Record<string, CarreraInfo> = {
  INF: {
    id: 'INF',
    nombre: 'Ingeniería en Informática',
    nombreCorto: 'Informática',
    emoji: '💻',
    descripcion: 'Software, redes, ciberseguridad y desarrollo web/móvil. Crea soluciones digitales que transforman empresas.',
    campoLaboral: 'Empresas TI, startups, bancos, gobierno digital, desarrollo remoto',
    salario: '$18,000 – $35,000 MXN',
    color: {
      bg: '#EFF6FF',
      accent: '#2563EB',
      text: '#ffffff',
      badge: '#DBEAFE',
      badgeText: '#1D4ED8',
      border: '#BFDBFE',
      bar: '#3B82F6',
    },
  },
  IND: {
    id: 'IND',
    nombre: 'Ingeniería Industrial',
    nombreCorto: 'Industrial',
    emoji: '🏭',
    descripcion: 'Manufactura esbelta, calidad y cadena de suministro. Optimiza procesos productivos en la industria.',
    campoLaboral: 'AHMSA, plantas industriales, armadoras, empresas de logística y manufactura',
    salario: '$15,000 – $28,000 MXN',
    color: {
      bg: '#F0FDF4',
      accent: '#16A34A',
      text: '#ffffff',
      badge: '#DCFCE7',
      badgeText: '#15803D',
      border: '#BBF7D0',
      bar: '#22C55E',
    },
  },
  ELEC: {
    id: 'ELEC',
    nombre: 'Ingeniería en Electrónica',
    nombreCorto: 'Electrónica',
    emoji: '⚡',
    descripcion: 'Circuitos, instrumentación industrial y automatización. Controla y automatiza sistemas industriales.',
    campoLaboral: 'Plantas de automatización, AHMSA, sector energético, mantenimiento industrial',
    salario: '$16,000 – $30,000 MXN',
    color: {
      bg: '#FFF7ED',
      accent: '#EA580C',
      text: '#ffffff',
      badge: '#FFEDD5',
      badgeText: '#C2410C',
      border: '#FED7AA',
      bar: '#F97316',
    },
  },
  MEC: {
    id: 'MEC',
    nombre: 'Ingeniería en Mecánica',
    nombreCorto: 'Mecánica',
    emoji: '⚙️',
    descripcion: 'Diseño CAD/CAM, termodinámica y mantenimiento industrial. Da vida a máquinas y estructuras físicas.',
    campoLaboral: 'Industria pesada, manufactura, sector automotriz, mantenimiento de planta',
    salario: '$15,000 – $27,000 MXN',
    color: {
      bg: '#FEFCE8',
      accent: '#CA8A04',
      text: '#ffffff',
      badge: '#FEF9C3',
      badgeText: '#A16207',
      border: '#FDE68A',
      bar: '#EAB308',
    },
  },
  ENRV: {
    id: 'ENRV',
    nombre: 'Ingeniería en Energías Renovables',
    nombreCorto: 'Energías Renovables',
    emoji: '🌱',
    descripcion: 'Sistemas solares, eólicos y auditorías energéticas. Construye el futuro energético sustentable.',
    campoLaboral: 'CFE, empresas de energía solar/eólica, consultoras ambientales, gobierno',
    salario: '$14,000 – $26,000 MXN',
    color: {
      bg: '#F0FDF4',
      accent: '#059669',
      text: '#ffffff',
      badge: '#D1FAE5',
      badgeText: '#047857',
      border: '#A7F3D0',
      bar: '#10B981',
    },
  },
  GE: {
    id: 'GE',
    nombre: 'Ingeniería en Gestión Empresarial',
    nombreCorto: 'Gestión Empresarial',
    emoji: '📊',
    descripcion: 'Finanzas, mercadotecnia, capital humano y planes de negocio. Lidera organizaciones y crea empresas.',
    campoLaboral: 'PYMES locales, consultoría, emprendimiento, recursos humanos, dirección general',
    salario: '$13,000 – $25,000 MXN',
    color: {
      bg: '#FDF4FF',
      accent: '#9333EA',
      text: '#ffffff',
      badge: '#F3E8FF',
      badgeText: '#7E22CE',
      border: '#E9D5FF',
      bar: '#A855F7',
    },
  },
};

export const CARRERAS_LIST = Object.values(CARRERAS);
