import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Users, Briefcase, Calendar, BookOpen, Building2, Award, Clock, X } from 'lucide-react';
import { supabase, Career, Teacher, CampusBuilding } from '../lib/supabase';
import Footer from '../components/Footer';

export default function CareerDetail() {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState<Career | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [buildings, setBuildings] = useState<CampusBuilding[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuilding | null>(null);
  const [expandedSemesters, setExpandedSemesters] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { loadData(); }, [careerId]);

  const loadData = async () => {
    try {
      const [careerRes, teachersRes, buildingsRes] = await Promise.all([
        supabase.from('careers').select('*').eq('id', careerId).single(),
        supabase.from('teachers').select('*').eq('career_id', careerId),
        supabase.from('campus_buildings').select('*'),
      ]);
      if (careerRes.data) setCareer(careerRes.data);
      if (teachersRes.data) setTeachers(teachersRes.data);
      if (buildingsRes.data) setBuildings(buildingsRes.data);
    } catch (error) { console.error('Error:', error); }
    finally { setIsLoading(false); }
  };

  const toggleSemester = (semester: number) => {
    setExpandedSemesters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(semester)) newSet.delete(semester);
      else newSet.add(semester);
      return newSet;
    });
  };

  if (isLoading) return <div className="min-h-screen bg-white flex items-center justify-center pt-16"><div className="text-center"><div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" /><p>Cargando...</p></div></div>;
  if (!career) return <div className="min-h-screen bg-white flex items-center justify-center pt-16"><div className="text-center"><p className="text-xl mb-4">Carrera no encontrada</p><button onClick={() => navigate('/carreras')} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Ver carreras</button></div></div>;

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="relative bg-gradient-to-br from-blue-600 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 relative">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80 hover:text-white mb-6"><ChevronLeft className="w-5 h-5" />Volver</button>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4"><MapPin className="w-4 h-4" /><span className="text-sm">{career.area}</span></div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{career.name}</h1>
              <p className="text-xl text-white/90 mb-6">{career.tagline}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg"><Users className="w-5 h-5" /><span>{career.graduate_count} egresados</span></div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg"><Calendar className="w-5 h-5" /><span>9 semestres</span></div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Industria aplicable</h3>
              <div className="flex flex-wrap gap-2">{career.industry_tags?.map((tag) => (<span key={tag} className="bg-white/20 px-3 py-1 rounded-full text-sm">{tag}</span>))}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre esta carrera</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{career.description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-blue-600" />Caracteristicas ideales</h3>
              <div className="flex flex-wrap gap-3">{career.compatibility_traits?.map((trait) => (<span key={trait} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">{trait}</span>))}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" />Plan de estudios</h3>
              <div className="space-y-3">{career.study_plan?.map((semester) => (
                <div key={semester.semester} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => toggleSemester(semester.semester)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                    <span className="font-semibold text-slate-900">Semestre {semester.semester}</span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSemesters.has(semester.semester) ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSemesters.has(semester.semester) && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{semester.subjects.map((subject) => (<div key={subject} className="bg-white px-3 py-2 rounded-lg text-sm text-gray-700 border border-gray-200">{subject}</div>))}</div>
                    </div>
                  )}
                </div>
              ))}</div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="sticky top-24">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-blue-600" />Maestros destacados</h3>
              {teachers.length > 0 ? (
                <div className="space-y-4">{teachers.map((teacher) => (
                  <div key={teacher.id} className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"><span className="text-blue-700 font-semibold text-lg">{teacher.name.charAt(0)}</span></div>
                      <div><h4 className="font-semibold text-slate-900">{teacher.name}</h4><p className="text-sm text-blue-600">{teacher.specialty}</p><p className="text-xs text-gray-500 mt-1">{teacher.years_experience} anos</p></div>
                    </div>
                  </div>
                ))}</div>
              ) : <div className="text-center py-8 bg-gray-50 rounded-xl"><p className="text-gray-500">Informacion proximamente</p></div>}
            </motion.div>
          </div>
        </div>
      </div>

      {selectedBuilding && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBuilding(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-48 bg-blue-600 flex items-center justify-center">
              <Building2 className="w-16 h-16 text-white/30" />
              <button onClick={() => setSelectedBuilding(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><X className="w-5 h-5 text-white" /></button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedBuilding.name}</h3>
              <p className="text-gray-600">{selectedBuilding.description}</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
