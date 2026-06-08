export type TipoCard = 'perfil' | 'habilidad' | 'desafio';

export interface Pregunta {
  id: string;
  texto: string;
  tipo: TipoCard;
  empresa?: string; // contexto regional para desafíos
}

export const PREGUNTAS: Pregunta[] = [
  // ── Perfil general ──────────────────────────────────
  { id: 'p_01_prefiere_trabajar_con_manos',        texto: '¿Prefieres trabajar con las manos que frente a una computadora?',   tipo: 'perfil' },
  { id: 'p_02_prefiere_trabajar_en_equipo',         texto: '¿Prefieres trabajar en equipo que solo?',                           tipo: 'perfil' },
  { id: 'p_03_le_atrae_crear_cosas_fisicas',        texto: '¿Te atrae más crear cosas físicas que resolver cosas abstractas?',  tipo: 'perfil' },
  { id: 'p_04_le_gusta_liderar_coordinar',          texto: '¿Te gusta liderar o coordinar a otras personas?',                   tipo: 'perfil' },
  { id: 'p_05_curioso_por_como_funcionan_cosas',    texto: '¿Eres curioso sobre cómo funcionan las cosas?',                     tipo: 'perfil' },
  { id: 'p_06_prefiere_interior_sobre_campo',       texto: '¿Preferirías trabajar en oficina/laboratorio que en campo abierto?',tipo: 'perfil' },
  { id: 'p_07_comodo_con_numeros_formulas',         texto: '¿Te sientes cómodo con números y fórmulas?',                       tipo: 'perfil' },

  // ── Informática ──────────────────────────────────────
  { id: 'inf_01_disfruta_escribir_codigo',                  texto: '¿Disfrutas escribir código o programar?',                             tipo: 'habilidad' },
  { id: 'inf_02_entiende_o_quiere_aprender_algoritmos',     texto: '¿Te interesan los algoritmos y la lógica de programación?',           tipo: 'habilidad' },
  { id: 'inf_03_le_llama_atencion_ciberseguridad',          texto: '¿Te llama la atención la ciberseguridad?',                            tipo: 'habilidad' },
  { id: 'inf_04_trabaja_comodo_con_bases_de_datos',         texto: '¿Te sientes cómodo trabajando con bases de datos?',                   tipo: 'habilidad' },
  { id: 'inf_05_le_interesa_desarrollo_web_o_movil',        texto: '¿Te interesa el desarrollo de apps web o móviles?',                   tipo: 'habilidad' },
  { id: 'inf_06_le_gusta_automatizar_tareas_repetitivas',   texto: '¿Te gusta automatizar tareas repetitivas con scripts o bots?',        tipo: 'habilidad' },
  { id: 'inf_07_analisis_de_datos_toma_decisiones',         texto: '¿Te interesa el análisis de datos para tomar decisiones?',            tipo: 'habilidad' },
  { id: 'inf_08_resuelve_problemas_con_logica_paso_a_paso', texto: '¿Resuelves problemas paso a paso con lógica sistemática?',            tipo: 'habilidad' },

  // ── Industrial ───────────────────────────────────────
  { id: 'ind_01_le_interesa_optimizar_lineas_de_produccion',texto: '¿Te interesa optimizar líneas de producción en fábricas?',            tipo: 'desafio', empresa: 'AHMSA Monclova' },
  { id: 'ind_02_trabaja_con_estandares_iso_o_calidad',      texto: '¿Te interesan estándares de calidad como ISO 9001?',                  tipo: 'habilidad' },
  { id: 'ind_03_disfruta_medir_y_reducir_tiempos_proceso',  texto: '¿Disfrutas medir y reducir tiempos en procesos?',                     tipo: 'habilidad' },
  { id: 'ind_04_gestiona_inventarios_o_cadena_suministro',  texto: '¿Te interesa gestionar inventarios o cadenas de suministro?',         tipo: 'habilidad' },
  { id: 'ind_05_aplica_lean_manufacturing_o_six_sigma',     texto: '¿Conoces o te interesa Lean Manufacturing o Six Sigma?',              tipo: 'habilidad' },
  { id: 'ind_06_trabaja_en_planta_supervisando_operarios',  texto: '¿Te ves trabajando en planta supervisando operarios?',                tipo: 'desafio', empresa: 'Zona Industrial' },
  { id: 'ind_07_hace_balanceo_de_lineas_y_cargas_trabajo',  texto: '¿Te interesa el balanceo de líneas y cargas de trabajo?',             tipo: 'habilidad' },
  { id: 'ind_08_usa_herramientas_estadisticas_procesos',    texto: '¿Usarías herramientas estadísticas para controlar procesos?',         tipo: 'habilidad' },

  // ── Electrónica ──────────────────────────────────────
  { id: 'elec_01_programa_microcontroladores_arduino_pic',  texto: '¿Programas o te gustaría programar microcontroladores (Arduino, PIC)?',tipo: 'habilidad' },
  { id: 'elec_02_disena_o_analiza_circuitos_electronicos',  texto: '¿Diseñas o analizas circuitos electrónicos?',                         tipo: 'habilidad' },
  { id: 'elec_03_configura_y_programa_plc_automatizacion',  texto: '¿Te interesa configurar y programar PLCs para automatización?',       tipo: 'desafio', empresa: 'Planta Monclova' },
  { id: 'elec_04_trabaja_con_sensores_actuadores_sistemas', texto: '¿Trabajas o quisieras trabajar con sensores y actuadores?',            tipo: 'habilidad' },
  { id: 'elec_05_entiende_senales_analogicas_y_digitales',  texto: '¿Entiendes señales analógicas y digitales?',                          tipo: 'habilidad' },
  { id: 'elec_06_instala_o_mantiene_equipos_electronicos',  texto: '¿Te interesa instalar o mantener equipos electrónicos?',              tipo: 'habilidad' },
  { id: 'elec_07_disena_sistemas_de_control_realimentado',  texto: '¿Te llama la atención diseñar sistemas de control con retroalimentación?', tipo: 'habilidad' },
  { id: 'elec_08_trabaja_con_comunicaciones_industriales',  texto: '¿Te interesan las comunicaciones industriales (MODBUS, redes)?',      tipo: 'habilidad' },

  // ── Mecánica ─────────────────────────────────────────
  { id: 'mec_01_disena_piezas_en_cad_solidworks_autocad',   texto: '¿Diseñas o quisieras diseñar piezas en CAD (SolidWorks, AutoCAD)?',   tipo: 'habilidad' },
  { id: 'mec_02_calcula_esfuerzos_resistencia_materiales',  texto: '¿Te interesa calcular esfuerzos y resistencia de materiales?',        tipo: 'habilidad' },
  { id: 'mec_03_opera_o_programa_maquinas_cnc',             texto: '¿Operarías o programarías máquinas CNC?',                             tipo: 'desafio', empresa: 'Manufactura Regional' },
  { id: 'mec_04_selecciona_materiales_para_fabricacion',    texto: '¿Te interesa seleccionar materiales para fabricación?',               tipo: 'habilidad' },
  { id: 'mec_05_disena_sistemas_de_transmision_potencia',   texto: '¿Te llama la atención diseñar sistemas de transmisión de potencia?',  tipo: 'habilidad' },
  { id: 'mec_06_realiza_mantenimiento_preventivo_maquinaria',texto: '¿Realizarías mantenimiento preventivo a maquinaria?',               tipo: 'desafio', empresa: 'Industria Pesada' },
  { id: 'mec_07_analiza_fallas_en_equipos_mecanicos',       texto: '¿Te interesa analizar fallas en equipos mecánicos?',                  tipo: 'habilidad' },
  { id: 'mec_08_trabaja_en_manufactura_o_taller_maquinado', texto: '¿Te ves trabajando en manufactura o taller de maquinado?',            tipo: 'habilidad' },

  // ── Energías Renovables ──────────────────────────────
  { id: 'enrv_01_dimensiona_sistemas_fotovoltaicos',        texto: '¿Te interesa dimensionar sistemas fotovoltaicos (paneles solares)?',  tipo: 'habilidad' },
  { id: 'enrv_02_evalua_viabilidad_proyectos_energia_limpia',texto:'¿Evaluarías la viabilidad de proyectos de energía limpia?',          tipo: 'desafio', empresa: 'Región Centro Coahuila' },
  { id: 'enrv_03_realiza_auditorias_energeticas_edificios', texto: '¿Realizarías auditorías energéticas en edificios o empresas?',        tipo: 'habilidad' },
  { id: 'enrv_04_conoce_normativa_ambiental_nom_semarnat',  texto: '¿Te interesa la normativa ambiental (NOM, SEMARNAT)?',               tipo: 'habilidad' },
  { id: 'enrv_05_trabaja_en_campo_instalando_equipos',      texto: '¿Estarías dispuesto a trabajar en campo instalando equipos?',         tipo: 'habilidad' },
  { id: 'enrv_06_calcula_huella_carbono_empresas',          texto: '¿Te interesa calcular la huella de carbono de empresas?',             tipo: 'habilidad' },
  { id: 'enrv_07_gestiona_proyectos_de_infraestructura',    texto: '¿Gestionarías proyectos de infraestructura energética?',              tipo: 'habilidad' },
  { id: 'enrv_08_conoce_mercados_electricos_y_tarifas_cfe', texto: '¿Te interesan los mercados eléctricos y tarifas de CFE?',             tipo: 'habilidad' },

  // ── Gestión Empresarial ──────────────────────────────
  { id: 'ge_01_elabora_estados_financieros_y_presupuestos', texto: '¿Elaborarías estados financieros y presupuestos?',                    tipo: 'habilidad' },
  { id: 'ge_02_disena_estrategias_de_marketing_y_ventas',   texto: '¿Diseñarías estrategias de marketing y ventas?',                      tipo: 'habilidad' },
  { id: 'ge_03_gestiona_equipos_de_trabajo_y_rrhh',         texto: '¿Te interesa gestionar equipos de trabajo y recursos humanos?',       tipo: 'habilidad' },
  { id: 'ge_04_realiza_analisis_financiero_inversiones',    texto: '¿Realizarías análisis financiero de inversiones?',                    tipo: 'habilidad' },
  { id: 'ge_05_negocia_contratos_con_clientes_proveedores', texto: '¿Negociarías contratos con clientes y proveedores?',                  tipo: 'habilidad' },
  { id: 'ge_06_aplica_derecho_empresarial_y_fiscal',        texto: '¿Te interesa el derecho empresarial y fiscal?',                       tipo: 'habilidad' },
  { id: 'ge_07_usa_indicadores_kpi_cuadro_mando_integral',  texto: '¿Usarías KPIs y cuadro de mando integral (Balanced Scorecard)?',     tipo: 'habilidad' },
  { id: 'ge_08_elabora_planes_de_negocio_o_modelo_canvas',  texto: '¿Elaborarías planes de negocio o modelo Canvas?',                    tipo: 'habilidad' },

  // ── Desafíos situacionales ───────────────────────────
  { id: 'd_01_prefiere_programar_app_que_disenar_pieza',                  texto: '¿Preferirías programar una app antes que diseñar una pieza mecánica?',               tipo: 'desafio', empresa: 'Startup local' },
  { id: 'd_02_prefiere_optimizar_proceso_que_gestionar_gente',            texto: '¿Preferirías optimizar un proceso de producción antes que gestionar personas?',       tipo: 'desafio', empresa: 'Planta regional' },
  { id: 'd_03_prefiere_cablear_circuito_que_instalar_panel',              texto: '¿Preferirías cablear un circuito antes que instalar un panel solar?',                 tipo: 'desafio', empresa: 'Industria eléctrica' },
  { id: 'd_04_prefiere_escribir_codigo_que_supervisar_planta',            texto: '¿Preferirías escribir código antes que supervisar una planta?',                       tipo: 'desafio', empresa: 'Empresa tecnológica' },
  { id: 'd_05_prefiere_calcular_resistencia_que_auditoria_energetica',    texto: '¿Preferirías calcular la resistencia de un material antes que hacer una auditoría energética?', tipo: 'desafio', empresa: 'Ingeniería aplicada' },
  { id: 'd_06_prefiere_automatizar_maquina_que_hacer_presupuesto',        texto: '¿Preferirías automatizar una máquina antes que hacer un presupuesto financiero?',    tipo: 'desafio', empresa: 'Fábrica de Monclova' },
];
