import type { DatosDemoData } from '../components/DatosDemo';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000';

export interface CarreraResult {
  carrera_id: string;
  nombre_carrera: string;
  porcentaje_match: number;
  razonamiento: string;
}

export interface PredictResponse {
  top3: CarreraResult[];
  texto_analisis: string | null;
  confianza: number;
}

export async function predict(
  swipeResponses: Record<string, number>,
  textoLibre: string = '',
  datosDemo?: DatosDemoData
): Promise<PredictResponse> {
  const res = await fetch(`${BACKEND_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      swipe_responses: swipeResponses,
      texto_libre: textoLibre,
      datos_demo: datosDemo ?? null,
    }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
