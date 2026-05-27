import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Wrench, Zap, CircuitBoard, TrendingUp, Users, Briefcase, Search, Filter, MapPin, ChevronRight, Award } from 'lucide-react';
import { supabase, Career } from '../lib/supabase';
import Footer from '../components/Footer';

const areaIcons: Record<string, any> = { Industrial: TrendingUp, Sistemas: Cpu, Mecanica: Wrench, Electrica: Zap, Electronica: CircuitBoard, Administracion: Users };
const areaFilters = ['Todas', 'Industrial', 'Sistemas', 'Mecanica', 'Electrica', 'Electronica', 'Administracion'];

export default function Explore() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { loadCareers(); }, []);
  useEffect(() => { filterCareers(); }, [careers, searchQuery, selectedArea]);

  const loadCareers = async () => {
    try {
      const { data, error } = await supabase.from('careers').select('*').order('name');
      if (error) throw error;
      setCareers(data || []);
    } catch (error) { console.error('Error:', error); }
    finally { setIsLoading(false); }
  };

  const filterCareers = () => {
    let filtered = [...careers];
    if (selectedArea !== 'Todas') filtered = filtered.filter((c) => c.area === selectedArea);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(query) || c.tagline.toLowerCase().includes(query));
    }
    setFilteredCareers(filtered);
  };

  if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16"><div className="text-center"><div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" /><p>Cargando...</p></div></div>;

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="relative bg-gradient-to-br from-blue-600 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explora las carreras del TecNM</h1>
            <p className="text-xl text-white/80">Descubre las 6 ingenierias disponibles.</p>
          </motion.div>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar carrera..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
              {areaFilters.map((area) => (
                <button key={area} onClick={() => setSelectedArea(area)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedArea === area ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{area}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredCareers.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"><Search className="w-10 h-10 text-gray-400" /></div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No se encontraron carreras</h3>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career, index) => {
              const IconComponent = areaIcons[career.area] || Cpu;
              return (
                <motion.div key={career.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group border border-gray-100">
                  <Link to={`/carreras/${career.id}`}>
                    <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center"><IconComponent className="w-8 h-8 text-white" /></div>
                    </div>
                    <div className="p-6">
                      <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-3"><MapPin className="w-3 h-3" />{career.area}</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{career.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{career.tagline}</p>
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1"><Users className="w-4 h-4" /><span>{career.graduate_count} egresados</span></div>
                        <div className="flex items-center gap-1"><Briefcase className="w-4 h-4" /><span>{career.job_roles?.length || 0} puestos</span></div>
                      </div>
                      <div className="flex items-center text-blue-600 font-semibold text-sm"><span>Conocer mas</span><ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1" /></div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[{ icon: Users, title: '+6,000 egresados', desc: 'Trabajan en empresas lideres' },
              { icon: Briefcase, title: 'Alta empleabilidad', desc: '85% consigue empleo en 6 meses' },
              { icon: Award, title: 'Calidad educativa', desc: 'Acreditacion COPA' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4"><item.icon className="w-8 h-8 text-white" /></div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
