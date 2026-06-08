export interface Maestro {
  id: string;
  nombre: string;
  carrera: string;           // ID de carrera: INF, IND, ELEC, MEC, ENRV, GE
  titulo: string;            // ej: "Dr.", "M.C.", "Ing."
  especialidad: string;
  materias: string[];
  experiencia: string;       // ej: "12 años en industria automotriz"
  descripcion: string;
  foto: string | null;       // URL de foto o null para usar avatar genérico
  cvUrl: string | null;      // URL al PDF del CV o null
  email?: string;
  linkedin?: string;
}

// ─── PLANTILLA — agrega maestros reales aquí ───────────────────────────────
// Copia un bloque, cambia los datos y agrega a la lista.
// Para foto: pon la URL de la imagen o déjalo null para avatar genérico.
// Para cvUrl: pon la ruta al PDF (ej: "/cvs/garcia.pdf") o null.

export const MAESTROS: Maestro[] = [
  // ── Informática ──────────────────────────────────────────────────────────
  {
    id: 'inf-01',
    nombre: 'Dr. Carlos Ramírez Torres',
    carrera: 'INF',
    titulo: 'Dr.',
    especialidad: 'Inteligencia Artificial y Redes Neuronales',
    materias: ['Inteligencia Artificial', 'Aprendizaje Automático', 'Programación Avanzada'],
    experiencia: '15 años en desarrollo de software empresarial, ex-IBM México',
    descripcion: 'Doctor en Ciencias Computacionales por el CINVESTAV. Líder del grupo de investigación en IA aplicada.',
    foto: null,
    cvUrl: null,
    email: 'c.ramirez@monclova.tecnm.mx',
  },
  {
    id: 'inf-02',
    nombre: 'M.C. Laura Vega Sánchez',
    carrera: 'INF',
    titulo: 'M.C.',
    especialidad: 'Desarrollo Web y Arquitecturas Cloud',
    materias: ['Desarrollo Web', 'Bases de Datos', 'Cómputo en la Nube'],
    experiencia: '8 años como desarrolladora full-stack, proyectos con gobierno de Coahuila',
    descripcion: 'Maestra en Ciencias en Tecnologías de Información. Certificada en AWS y Google Cloud.',
    foto: null,
    cvUrl: null,
  },

  // ── Industrial ────────────────────────────────────────────────────────────
  {
    id: 'ind-01',
    nombre: 'M.I. Roberto Flores Medina',
    carrera: 'IND',
    titulo: 'M.I.',
    especialidad: 'Lean Manufacturing y Six Sigma',
    materias: ['Ingeniería de Métodos', 'Control de Calidad', 'Investigación de Operaciones'],
    experiencia: '18 años en AHMSA, consultor certificado en Six Sigma Black Belt',
    descripcion: 'Maestro en Ingeniería Industrial. Ha liderado proyectos de optimización en las principales plantas de Monclova.',
    foto: null,
    cvUrl: null,
  },
  {
    id: 'ind-02',
    nombre: 'Ing. Patricia Morales Cruz',
    carrera: 'IND',
    titulo: 'Ing.',
    especialidad: 'Cadena de Suministro y Logística',
    materias: ['Logística y Cadena de Suministro', 'Simulación Industrial', 'Ergonomía'],
    experiencia: '10 años en operaciones logísticas, sector automotriz y siderúrgico',
    descripcion: 'Ingeniera Industrial con posgrado en Logística Internacional. Especialista en SAP para manufactura.',
    foto: null,
    cvUrl: null,
  },

  // ── Electrónica ───────────────────────────────────────────────────────────
  {
    id: 'elec-01',
    nombre: 'Dr. Miguel Ángel Hernández Ruiz',
    carrera: 'ELEC',
    titulo: 'Dr.',
    especialidad: 'Automatización Industrial y PLC',
    materias: ['Automatización Industrial', 'Sistemas de Control', 'Electrónica de Potencia'],
    experiencia: '20 años en automatización de plantas, ex-Siemens México',
    descripcion: 'Doctor en Ingeniería Eléctrica. Pionero en implementación de Industria 4.0 en el norte de México.',
    foto: null,
    cvUrl: null,
  },
  {
    id: 'elec-02',
    nombre: 'M.C. Ana González Pérez',
    carrera: 'ELEC',
    titulo: 'M.C.',
    especialidad: 'Sistemas Embebidos y IoT',
    materias: ['Microcontroladores', 'Sistemas Digitales', 'Internet de las Cosas'],
    experiencia: '9 años en diseño de sistemas embebidos para la industria automotriz',
    descripcion: 'Maestra en Ciencias con especialidad en electrónica digital. Certificada en Cisco IoT.',
    foto: null,
    cvUrl: null,
  },

  // ── Mecánica ──────────────────────────────────────────────────────────────
  {
    id: 'mec-01',
    nombre: 'M.I. Jorge Álvarez Castillo',
    carrera: 'MEC',
    titulo: 'M.I.',
    especialidad: 'Diseño CAD/CAM y Manufactura',
    materias: ['Diseño Mecánico', 'Manufactura', 'Resistencia de Materiales'],
    experiencia: '14 años en diseño de maquinaria pesada, proyectos con industria siderúrgica',
    descripcion: 'Maestro en Ingeniería Mecánica. Especialista en SolidWorks y simulación de elementos finitos.',
    foto: null,
    cvUrl: null,
  },
  {
    id: 'mec-02',
    nombre: 'Ing. Sandra Reyes López',
    carrera: 'MEC',
    titulo: 'Ing.',
    especialidad: 'Mantenimiento Industrial y Tribología',
    materias: ['Mantenimiento Industrial', 'Termodinámica', 'Dinámica de Máquinas'],
    experiencia: '11 años en mantenimiento predictivo, plantas de energía en Coahuila',
    descripcion: 'Ingeniera Mecánica con especialidad en mantenimiento predictivo y análisis de fallas.',
    foto: null,
    cvUrl: null,
  },

  // ── Energías Renovables ───────────────────────────────────────────────────
  {
    id: 'enrv-01',
    nombre: 'Dr. Fernando Soto Vidal',
    carrera: 'ENRV',
    titulo: 'Dr.',
    especialidad: 'Energía Solar y Sistemas Fotovoltaicos',
    materias: ['Energía Solar', 'Auditoría Energética', 'Normativa Ambiental'],
    experiencia: '16 años en proyectos fotovoltaicos, asesor de CFE en Coahuila',
    descripcion: 'Doctor en Ingeniería de Energías Renovables. Ha instalado más de 50 sistemas solares industriales en la región.',
    foto: null,
    cvUrl: null,
  },
  {
    id: 'enrv-02',
    nombre: 'M.C. Daniela Torres Muñoz',
    carrera: 'ENRV',
    titulo: 'M.C.',
    especialidad: 'Gestión Ambiental y Huella de Carbono',
    materias: ['Gestión Ambiental', 'Energía Eólica', 'Mercados Eléctricos'],
    experiencia: '7 años en consultoría ambiental, certificada SEMARNAT',
    descripcion: 'Maestra en Ciencias Ambientales. Asesora de empresas en transición energética y certificaciones verdes.',
    foto: null,
    cvUrl: null,
  },

  // ── Gestión Empresarial ───────────────────────────────────────────────────
  {
    id: 'ge-01',
    nombre: 'M.A. Eduardo Vargas Ibáñez',
    carrera: 'GE',
    titulo: 'M.A.',
    especialidad: 'Finanzas Corporativas y Emprendimiento',
    materias: ['Finanzas Corporativas', 'Administración Estratégica', 'Planes de Negocio'],
    experiencia: '13 años en banca y finanzas, co-fundador de 2 startups en Monclova',
    descripcion: 'Maestro en Administración. Mentor del ecosistema emprendedor de Coahuila, vinculado con INADEM.',
    foto: null,
    cvUrl: null,
  },
  {
    id: 'ge-02',
    nombre: 'Lic. Mónica Herrera Garza',
    carrera: 'GE',
    titulo: 'Lic.',
    especialidad: 'Recursos Humanos y Desarrollo Organizacional',
    materias: ['Recursos Humanos', 'Mercadotecnia', 'Derecho Empresarial'],
    experiencia: '10 años en dirección de RRHH, empresas del sector industrial de Monclova',
    descripcion: 'Licenciada en Administración con maestría en Desarrollo Organizacional. Certificada en competencias laborales.',
    foto: null,
    cvUrl: null,
  },
];

// Helper: obtener maestros por carrera
export function getMaestrosByCarrera(carreraId: string): Maestro[] {
  return MAESTROS.filter(m => m.carrera === carreraId);
}
