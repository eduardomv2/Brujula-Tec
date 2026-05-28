/*
  # BrújulaTec Seed Data

  Populates the database with initial content for demonstration.

  ## Data Inserted

  1. Careers: 6 engineering degrees
     - Ingeniería Industrial, Sistemas Computacionales, Mecánica, Eléctrica, Electrónica, Administración
   
  2. Questions: Sample vocational test questions across 4 categories
   
  3. Teachers: Sample faculty profiles
   
  4. Campus Buildings: Sample campus facilities

  ## Notes
  - Career weights for questions determine affinity scoring
  - Graduate counts and data are exemplary
*/

-- Insert careers
INSERT INTO careers (name, tagline, description, area, compatibility_traits, job_roles, industry_tags, graduate_count, study_plan) VALUES
(
  'Ingeniería Industrial',
  'Optimiza procesos y lidera la eficiencia',
  'La Ingeniería Industrial se enfoca en el diseño, mejora e instalación de sistemas integrados de personas, materiales y equipos. Combina conocimientos de matemáticas, física y ciencias sociales para optimizar la productividad y calidad en organizaciones.',
  'Industrial',
  '["Análisis de datos", "Liderazgo", "Optimización", "Gestión de proyectos", "Pensamiento sistémico"]'::jsonb,
  '["Analista de Procesos", "Gerente de Operaciones", "Consultor de Mejora Continua", "Ingeniero de Calidad", "Director de Planta"]'::jsonb,
  '["Manufactura", "Logística", "Consultoría", "Automotriz", "Salud"]'::jsonb,
  1250,
  '[{"semester":1,"subjects":["Cálculo I","Química","Introducción a la Ingeniería","Dibujo Industrial"]},{"semester":2,"subjects":["Cálculo II","Física I","Álgebra Lineal","Programación Básica"]},{"semester":3,"subjects":["Ecuaciones Diferenciales","Física II","Probabilidad","Contabilidad"]},{"semester":4,"subjects":["Estadística","Termodinámica","Investigación de Operaciones I","Economía"]},{"semester":5,"subjects":["Investigación de Operaciones II","Ingeniería de Métodos","Costos y Presupuestos","Administración"]},{"semester":6,"subjects":["Control Estadístico","Ingeniería de Plantas","Mercadotecnia","Derecho Laboral"]},{"semester":7,"subjects":["Gestión de Calidad","Logística","Recursos Humanos","Higiene y Seguridad"]},{"semester":8,"subjects":["Gestión de Proyectos","Simulación","Mantenimiento","Formulación de Proyectos"]},{"semester":9,"subjects":["Planeación Estratégica","Automatización","Seminario de Investigación","Proyecto de Titulación"]}]'::jsonb
),
(
  'Ingeniería en Sistemas Computacionales',
  'Crea el futuro digital con código e innovación',
  'Forma profesionales capaces de diseñar, desarrollar e implementar soluciones computacionales. Combina teoría de la computación, ingeniería de software y sistemas de información para resolver problemas complejos del mundo real.',
  'Sistemas',
  '["Pensamiento lógico", "Resolución de problemas", "Creatividad", "Análisis abstracto", "Aprendizaje continuo"]'::jsonb,
  '["Desarrollador Full Stack", "Arquitecto de Software", "Data Scientist", "DevOps Engineer", "CTO"]'::jsonb,
  '["Tecnología", "Finanzas", "Salud", "E-commerce", "Gaming"]'::jsonb,
  1580,
  '[{"semester":1,"subjects":["Programación I","Matemáticas Discretas","Cálculo I","Introducción a los Sistemas"]},{"semester":2,"subjects":["Programación II","Cálculo II","Física I","Álgebra Lineal"]},{"semester":3,"subjects":["Estructuras de Datos","Ecuaciones Diferenciales","Física II","Arquitectura de Computadoras"]},{"semester":4,"subjects":["Programación Orientada a Objetos","Probabilidad","Base de Datos","Sistemas Operativos"]},{"semester":5,"subjects":["Análisis y Diseño de Software","Redes","Inteligencia Artificial","Estadística"]},{"semester":6,"subjects":["Ingeniería de Software","Seguridad Informática","Machine Learning","Desarrollo Web"]},{"semester":7,"subjects":["Desarrollo Móvil","Cloud Computing","Big Data","Gestión de TI"]},{"semester":8,"subjects":["Ciberseguridad","DevOps","Internet de las Cosas","Proyecto Integrador I"]},{"semester":9,"subjects":["Computación en la Nube","Blockchain","Seminario de Investigación","Proyecto de Titulación"]}]'::jsonb
),
(
  'Ingeniería Mecánica',
  'Diseña y construye las máquinas del mañana',
  'La Ingeniería Mecánica aplica principios de física y ciencia de materiales para diseñar, analizar y manufacturar sistemas mecánicos. Es fundamental en la industria automotriz, aeroespacial, energética y de manufactura.',
  'Mecánica',
  '["Razonamiento espacial", "Creatividad técnica", "Precisión", "Trabajo en equipo", "Innovación"]'::jsonb,
  '["Diseñador Mecánico", "Ingeniero de Manufactura", "Gerente de Planta", "Ingeniero de Proyectos", "Consultor Técnico"]'::jsonb,
  '["Automotriz", "Aeroespacial", "Energía", "Manufactura", "Construcción"]'::jsonb,
  890,
  '[{"semester":1,"subjects":["Cálculo I","Química","Dibujo Mecánico","Introducción a la Mecánica"]},{"semester":2,"subjects":["Cálculo II","Física I","Álgebra Lineal","Materiales de Ingeniería"]},{"semester":3,"subjects":["Cálculo III","Física II","Mecánica de Sólidos","Termodinámica I"]},{"semester":4,"subjects":["Ecuaciones Diferenciales","Resistencia de Materiales","Termodinámica II","Manufactura"]},{"semester":5,"subjects":["Mecánica de Fluidos","Diseño de Máquinas I","Transferencia de Calor","Electricidad y Magnetismo"]},{"semester":6,"subjects":["Diseño de Máquinas II","Máquinas Hidráulicas","Control Automático","Procesos de Manufactura"]},{"semester":7,"subjects":["Elementos de Máquinas","Plantas de Potencia","Vibraciones","Nuevos Materiales"]},{"semester":8,"subjects":["Diseño de Sistemas","Ingeniería Económica","Automatización","Proyecto Integrador"]},{"semester":9,"subjects":["Planeación de Plantas","Seminario de Investigación","Ética Profesional","Proyecto de Titulación"]}]'::jsonb
),
(
  'Ingeniería Eléctrica',
  'Energiza el mundo con tecnología de potencia',
  'Forma expertos en generación, transmisión y distribución de energía eléctrica, así como en sistemas de control y automatización. Es esencial para el desarrollo de infraestructura energética y tecnológica.',
  'Eléctrica',
  '["Pensamiento analítico", "Precisión", "Seguridad", "Innovación", "Responsabilidad"]'::jsonb,
  '["Ingeniero de Potencia", "Diseñador de Sistemas Eléctricos", "Gerente de Proyectos", "Consultor Energético", "Auditor Eléctrico"]'::jsonb,
  '["Energía", "Construcción", "Automatización", "Telecomunicaciones", "Minería"]'::jsonb,
  720,
  '[{"semester":1,"subjects":["Cálculo I","Química","Dibujo Eléctrico","Introducción a la Electricidad"]},{"semester":2,"subjects":["Cálculo II","Física I","Álgebra Lineal","Circuitos Eléctricos I"]},{"semester":3,"subjects":["Cálculo III","Física II","Circuitos Eléctricos II","Electrónica Básica"]},{"semester":4,"subjects":["Ecuaciones Diferenciales","Electromagnetismo","Máquinas Eléctricas I","Señales y Sistemas"]},{"semester":5,"subjects":["Máquinas Eléctricas II","Instrumentación","Sistemas de Potencia I","Control Clásico"]},{"semester":6,"subjects":["Sistemas de Potencia II","Subestaciones","Protección de Sistemas","Control Digital"]},{"semester":7,"subjects":["Plantas de Generación","Instalaciones Eléctricas","Electrónica de Potencia","Iluminación"]},{"semester":8,"subjects":["Transmisión de Energía","Economía Eléctrica","Automatización","Proyecto Integrador"]},{"semester":9,"subjects":["Planeación de Sistemas","Energías Renovables","Seminario de Investigación","Proyecto de Titulación"]}]'::jsonb
),
(
  'Ingeniería Electrónica',
  'Conecta el mundo con tecnología inteligente',
  'Combina hardware y software para crear dispositivos y sistemas electrónicos innovadores. Incluye telecomunicaciones, sistemas embebidos, robótica y procesamiento de señales.',
  'Electrónica',
  '["Pensamiento lógico", "Creatividad", "Precisión", "Curiosidad", "Adaptabilidad"]'::jsonb,
  '["Ingeniero de Hardware", "Diseñador de PCB","Ingeniero de Telecomunicaciones","IoT Specialist","Robotics Engineer"]'::jsonb,
  '["Telecomunicaciones","Automotriz","Salud","IoT","Defensa"]'::jsonb,
  950,
  '[{"semester":1,"subjects":["Cálculo I","Química","Circuitos Básicos","Introducción a la Electrónica"]},{"semester":2,"subjects":["Cálculo II","Física I","Álgebra Lineal","Electrónica Analógica"]},{"semester":3,"subjects":["Cálculo III","Física II","Circuitos Digitales","Programación"]},{"semester":4,"subjects":["Ecuaciones Diferenciales","Electromagnetismo","Amplificadores","Microcontroladores"]},{"semester":5,"subjects":["Señales y Sistemas","Comunicaciones I","Sistemas Embebidos","Control Automático"]},{"semester":6,"subjects":["Comunicaciones II","Procesamiento Digital de Señales","FPGA","Redes de Datos"]},{"semester":7,"subjects":["Antenas y Propagación","Robótica","IoT","Fibra Óptica"]},{"semester":8,"subjects":["Sistemas de Control Avanzado","Diseño de PCB","Automatización Industrial","Proyecto Integrador"]},{"semester":9,"subjects":["Sistemas Inteligentes","Seminario de Investigación","Ética Profesional","Proyecto de Titulación"]}]'::jsonb
),
(
  'Ingeniería en Gestión Empresarial',
  'Lidera organizaciones con visión estratégica',
  'Forma profesionales capaces de gestionar recursos, procesos y personas para alcanzar objetivos organizacionales. Combina conocimientos de administración, finanzas, mercadotecnia y recursos humanos.',
  'Administración',
  '["Liderazgo", "Comunicación", "Análisis financiero", "Creatividad", "Inteligencia emocional"]'::jsonb,
  '["Gerente General","Consultor de Negocios","Director de Recursos Humanos","Analista Financiero","Emprendedor"]'::jsonb,
  '["Servicios","Comercio","Manufactura","Consultoría","Startups"]'::jsonb,
  1100,
  '[{"semester":1,"subjects":["Introducción a la Administración","Contabilidad Básica","Matemáticas Financieras","Derecho Empresarial"]},{"semester":2,"subjects":["Microeconomía","Contabilidad de Costos","Estadística","Comportamiento Organizacional"]},{"semester":3,"subjects":["Macroeconomía","Mercadotecnia","Finanzas corporativas","Desarrollo Humano"]},{"semester":4,"subjects":["Investigación de Mercados","Administración de Operaciones","Costos y Presupuestos","Comercio Internacional"]},{"semester":5,"subjects":["Estrategia de Negocios","Gestión de Recursos Humanos","Impuestos","Logística"]},{"semester":6,"subjects":["Planeación Estratégica","Marketing Digital","Auditoría Administrativa","Ética Empresarial"]},{"semester":7,"subjects":["Gestión de Proyectos","Análisis de Inversiones","Liderazgo","Calidad Total"]},{"semester":8,"subjects":["Emprendimiento","Gestión del Cambio","Negociación","Proyecto Integrador"]},{"semester":9,"subjects":["Consultoría Empresarial","Responsabilidad Social","Seminario de Investigación","Proyecto de Titulación"]}]'::jsonb
);

-- Insert questions with career weights (career name -> weight from -2 to +2)
INSERT INTO questions (question_text, category, career_weights, order_index) VALUES
-- Hobbies
('Me gusta desarmar y armar aparatos electrónicos', 'Hobbies', '{"Ingeniería Electrónica": 2, "Ingeniería Eléctrica": 1, "Ingeniería Mecánica": 1}', 1),
('Disfruto jugando videojuegos y analizando cómo funcionan', 'Hobbies', '{"Ingeniería en Sistemas Computacionales": 2, "Ingeniería Electrónica": 1}', 2),
('Me apasiona organizar eventos y coordinar grupos', 'Hobbies', '{"Ingeniería en Gestión Empresarial": 2, "Ingeniería Industrial": 1}', 3),
('Me fascina construir cosas con mis manos y herramientas', 'Hobbies', '{"Ingeniería Mecánica": 2, "Ingeniería Industrial": 1, "Ingeniería Eléctrica": 1}', 4),
('Disfruto resolviendo puzzles y acertijos lógicos', 'Hobbies', '{"Ingeniería en Sistemas Computacionales": 2, "Ingeniería Industrial": 1, "Ingeniería Electrónica": 1}', 5),
('Me gusta liderar equipos y proyectos en la escuela', 'Hobbies', '{"Ingeniería en Gestión Empresarial": 2, "Ingeniería Industrial": 1}', 6),
('Tengo curiosidad por cómo funcionan los autos y máquinas', 'Hobbies', '{"Ingeniería Mecánica": 2, "Ingeniería Industrial": 1, "Ingeniería Electrónica": 1}', 7),
('Me interesa entender cómo se transmite la electricidad', 'Hobbies', '{"Ingeniería Eléctrica": 2, "Ingeniería Electrónica": 1}', 8),

-- Habilidades
('Tengo facilidad para trabajar con números y fórmulas', 'Habilidades', '{"Ingeniería Industrial": 2, "Ingeniería en Sistemas Computacionales": 1, "Ingeniería Eléctrica": 1}', 9),
('Soy bueno explicando conceptos complejos de forma simple', 'Habilidades', '{"Ingeniería en Gestión Empresarial": 2, "Ingeniería Industrial": 1}', 10),
('Puedo visualizar objetos en 3D mentalmente', 'Habilidades', '{"Ingeniería Mecánica": 2, "Ingeniería Industrial": 1, "Ingeniería Eléctrica": 1}', 11),
('Tengo facilidad para aprender nuevos lenguajes de programación', 'Habilidades', '{"Ingeniería en Sistemas Computacionales": 2, "Ingeniería Electrónica": 1}', 12),
('Soy detallista y me gusta que todo esté perfecto', 'Habilidades', '{"Ingeniería Industrial": 2, "Ingeniería Electrónica": 1, "Ingeniería Mecánica": 1}', 13),
('Tengo buen manejo de herramientas manuales', 'Habilidades', '{"Ingeniería Mecánica": 2, "Ingeniería Eléctrica": 1, "Ingeniería Electrónica": 1}', 14),
('Soy bueno negociando y convenciendo a otros', 'Habilidades', '{"Ingeniería en Gestión Empresarial": 2, "Ingeniería Industrial": 1}', 15),
('Me adapto rápido a nuevas tecnologías', 'Habilidades', '{"Ingeniería en Sistemas Computacionales": 2, "Ingeniería Electrónica": 1, "Ingeniería Eléctrica": 1}', 16),

-- Materias
('Física es una de mis materias favoritas', 'Materias', '{"Ingeniería Mecánica": 2, "Ingeniería Eléctrica": 2, "Ingeniería Electrónica": 1}', 17),
('Disfruto las clases de matemáticas', 'Materias', '{"Ingeniería en Sistemas Computacionales": 2, "Ingeniería Industrial": 1, "Ingeniería Eléctrica": 1}', 18),
('Me gustan las materias relacionadas con negocios y empresas', 'Materias', '{"Ingeniería en Gestión Empresarial": 2, "Ingeniería Industrial": 1}', 19),
('Prefiero las materias donde puedo crear cosas prácticas', 'Materias', '{"Ingeniería Mecánica": 2, "Ingeniería Electrónica": 1, "Ingeniería Industrial": 1}', 20),
('Me interesan las materias de computación y tecnología', 'Materias', '{"Ingeniería en Sistemas Computacionales": 2, "Ingeniería Electrónica": 1}', 21),
('Disfruto las materias de administración y economía', 'Materias', '{"Ingeniería en Gestión Empresarial": 2, "Ingeniería Industrial": 1}', 22),
('Química me parece una materia interesante', 'Materias', '{"Ingeniería Industrial": 1, "Ingeniería Mecánica": 1, "Ingeniería Electrónica": 1}', 23),
('Me gustan las materias donde trabajo con circuitos', 'Materias', '{"Ingeniería Eléctrica": 2, "Ingeniería Electrónica": 2}', 24),

-- Situaciones
('Cuando algo no funciona, busco entender por qué antes de arreglarlo', 'Situaciones', '{"Ingeniería Industrial": 2, "Ingeniería Mecánica": 1, "Ingeniería Eléctrica": 1}', 25),
('Prefiero trabajar en equipo que solo', 'Situaciones', '{"Ingeniería en Gestión Empresarial": 2, "Ingeniería Industrial": 1}', 26),
('Ante un problema, me gusta explorar múltiples soluciones', 'Situaciones', '{"Ingeniería en Sistemas Computacionales": 2, "Ingeniería Industrial": 1, "Ingeniería Electrónica": 1}', 27),
('Me siento realizado cuando puedo mejorar un proceso', 'Situaciones', '{"Ingeniería Industrial": 2, "Ingeniería en Gestión Empresarial": 1}', 28),
('Disfruto proyectos donde puedo diseñar y crear desde cero', 'Situaciones', '{"Ingeniería Mecánica": 2, "Ingeniería Electrónica": 1, "Ingeniería en Sistemas Computacionales": 1}', 29),
('Prefiero trabajos que me permitan estar en constante movimiento', 'Situaciones', '{"Ingeniería Mecánica": 2, "Ingeniería Eléctrica": 1}', 30),
('Me gusta tomar decisiones basándome en datos', 'Situaciones', '{"Ingeniería Industrial": 2, "Ingeniería en Sistemas Computacionales": 1, "Ingeniería en Gestión Empresarial": 1}', 31),
('Prefiero trabajos donde pueda innovar y ser creativo', 'Situaciones', '{"Ingeniería Electrónica": 2, "Ingeniería en Sistemas Computacionales": 1, "Ingeniería Mecánica": 1}', 32);

-- Insert sample teachers
INSERT INTO teachers (name, specialty, career_id, years_experience, bio) 
SELECT 'Dr. Carlos Mendoza', 'Optimización y Procesos', c.id, 15, 'Especialista en Lean Manufacturing y optimización de procesos industriales con publicaciones en revistas internacionales' FROM careers c WHERE c.name = 'Ingeniería Industrial'
UNION ALL
SELECT 'Mtra. Ana García', 'Desarrollo de Software', c.id, 10, 'Experta en metodologías ágiles y desarrollo web moderno con experiencia en empresas Fortune 500' FROM careers c WHERE c.name = 'Ingeniería en Sistemas Computacionales'
UNION ALL
SELECT 'Dr. Roberto Fernández', 'Mecánica de Sólidos', c.id, 20, 'Investigador en materiales avanzados con patentes en diseño mecánico' FROM careers c WHERE c.name = 'Ingeniería Mecánica'
UNION ALL
SELECT 'Ing. María López', 'Sistemas de Potencia', c.id, 12, 'Consultora en sistemas eléctricos industriales con certificación PMP' FROM careers c WHERE c.name = 'Ingeniería Eléctrica'
UNION ALL
SELECT 'Dr. Francisco Ruiz', 'Sistemas Embebidos', c.id, 8, 'Especialista en IoT y sistemas embebidos con proyectos en la industria automotriz' FROM careers c WHERE c.name = 'Ingeniería Electrónica'
UNION ALL
SELECT 'Mtra. Elena Vásquez', 'Estrategia y Gerencia', c.id, 18, 'Consultora empresarial con experiencia en transformación organizacional' FROM careers c WHERE c.name = 'Ingeniería en Gestión Empresarial'
UNION ALL
SELECT 'Dr. Juan Pérez', 'Estadística Industrial', c.id, 14, 'Experto en análisis de calidad y metodología Six Sigma' FROM careers c WHERE c.name = 'Ingeniería Industrial'
UNION ALL
SELECT 'Mtro. Luis Hernández', 'Inteligencia Artificial', c.id, 6, 'Investigador en machine learning con publicaciones en conferencias top' FROM careers c WHERE c.name = 'Ingeniería en Sistemas Computacionales'
UNION ALL
SELECT 'Dr. Pedro Sánchez', 'Termodinámica', c.id, 22, 'Especialista en sistemas térmicos con experiencia en plantas industriales' FROM careers c WHERE c.name = 'Ingeniería Mecánica'
UNION ALL
SELECT 'Ing. Carmen Díaz', 'Subestaciones Eléctricas', c.id, 16, 'Diseñadora de subestaciones con proyectos en toda la región norte' FROM careers c WHERE c.name = 'Ingeniería Eléctrica'
UNION ALL
SELECT 'Dr. Miguel Ángel Torres', 'Comunicaciones', c.id, 11, 'Experto en telecomunicaciones y redes de alta velocidad' FROM careers c WHERE c.name = 'Ingeniería Electrónica'
UNION ALL
SELECT 'Mtro. José Ramírez', 'Finanzas Corporativas', c.id, 13, 'Consultor financiero con experiencia en merges & acquisitions' FROM careers c WHERE c.name = 'Ingeniería en Gestión Empresarial';

-- Insert campus buildings
INSERT INTO campus_buildings (name, description, labs, associated_career_ids, map_coordinates) VALUES
(
  'Edificio A - Laboratorios de Industrial',
  'Centro de operaciones para ingeniería industrial con laboratorios de última generación',
  '["Lab de Ergonomía", "Lab de Metrología", "Lab de Simulación", "Centro de Calidad"]'::jsonb,
  ARRAY[(SELECT id FROM careers WHERE name = 'Ingeniería Industrial')],
  '{"x": 150, "y": 200}'::jsonb
),
(
  'Edificio B - Centro de Cómputo',
  'Centro tecnológico principal con salas de desarrollo y servidores',
  '["Sala de Servidores", "Lab de Redes", "Lab de Desarrollo", "Data Center"]'::jsonb,
  ARRAY[(SELECT id FROM careers WHERE name = 'Ingeniería en Sistemas Computacionales'), (SELECT id FROM careers WHERE name = 'Ingeniería Electrónica')],
  '{"x": 300, "y": 150}'::jsonb
),
(
  'Edificio C - Talleres Mecánicos',
  'Instalaciones para prácticas de manufactura y diseño mecánico',
  '["Taller de Máquinas", "Lab de CAD/CAM", "Taller de Soldadura", "Lab de Materiales"]'::jsonb,
  ARRAY[(SELECT id FROM careers WHERE name = 'Ingeniería Mecánica')],
  '{"x": 450, "y": 280}'::jsonb
),
(
  'Edificio D - Laboratorios Eléctricos',
  'Centro de sistemas eléctricos y de potencia',
  '["Lab de Máquinas Eléctricas", "Lab de Control", "Lab de Alta Tensión", "Subestación Didáctica"]'::jsonb,
  ARRAY[(SELECT id FROM careers WHERE name = 'Ingeniería Eléctrica'), (SELECT id FROM careers WHERE name = 'Ingeniería Electrónica')],
  '{"x": 200, "y": 350}'::jsonb
),
(
  'Edificio E - Electrónica y Telecom',
  'Laboratorios especializados en comunicaciones y sistemas embebidos',
  '["Lab de Telecomunicaciones", "Lab de Micros", "Lab de FPGA", "Centro IoT"]'::jsonb,
  ARRAY[(SELECT id FROM careers WHERE name = 'Ingeniería Electrónica')],
  '{"x": 380, "y": 380}'::jsonb
),
(
  'Edificio F - Aulas Administrativas',
  'Centro de educación en gestión y negocios',
  '["Centro de Negociaciones", "Lab de ERP", "Aula de Emprendimiento", "Centro de Casos"]'::jsonb,
  ARRAY[(SELECT id FROM careers WHERE name = 'Ingeniería en Gestión Empresarial'), (SELECT id FROM careers WHERE name = 'Ingeniería Industrial')],
  '{"x": 120, "y": 420}'::jsonb
),
(
  'Biblioteca Central',
  'Centro de recursos académicos y digitales',
  '["Sala Digital", "Centro de Investigación", "Mediateca", "Cubículos de Estudio"]'::jsonb,
  ARRAY[]::uuid[],
  '{"x": 500, "y": 220}'::jsonb
),
(
  'Centro de Investigación',
  'Laboratorios de investigación multidisciplinaria',
  '["Lab de Robótica", "Lab de Proyectos", "Centro de Innovación", "Incubadora"]'::jsonb,
  ARRAY[(SELECT id FROM careers WHERE name = 'Ingeniería en Sistemas Computacionales'), (SELECT id FROM careers WHERE name = 'Ingeniería Electrónica'), (SELECT id FROM careers WHERE name = 'Ingeniería Mecánica')],
  '{"x": 550, "y": 320}'::jsonb
);
