import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Activity, Brain, MessageCircle, Settings, Compass, LogOut, TrendingUp, Clock, Target, Download, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { supabase } from '../lib/supabase';

const COLORS = ['#1A56DB', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF'];
const sidebarItems = [
  { name: 'Resumen', path: '/admin', icon: LayoutDashboard },
  { name: 'Demografia', path: '/admin/demografia', icon: Users },
  { name: 'Comportamiento', path: '/admin/comportamiento', icon: Activity },
  { name: 'Modelo', path: '/admin/modelo', icon: Brain },
  { name: 'Chatbot', path: '/admin/chatbot', icon: MessageCircle },
  { name: 'Configuracion', path: '/admin/configuracion', icon: Settings },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0"><Compass className="w-6 h-6" /></div>
            {sidebarOpen && <div><p className="font-semibold">BrujulaTec</p><p className="text-xs text-white/60">Admin</p></div>}
          </div>
        </div>
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/admin'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all ${isActive ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'} ${!sidebarOpen ? 'justify-center' : ''}`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          {sidebarOpen && <button onClick={() => navigate('/')} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white"><LogOut className="w-4 h-4" />Cerrar sesion</button>}
        </div>
      </aside>

      <main className="flex-1 min-h-screen">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/demografia" element={<div className="p-8"><h1 className="text-2xl font-bold">Demografia</h1></div>} />
          <Route path="/comportamiento" element={<div className="p-8"><h1 className="text-2xl font-bold">Comportamiento</h1></div>} />
          <Route path="/modelo" element={<div className="p-8"><h1 className="text-2xl font-bold">Modelo</h1></div>} />
          <Route path="/chatbot" element={<div className="p-8"><h1 className="text-2xl font-bold">Chatbot</h1></div>} />
          <Route path="/configuracion" element={<div className="p-8"><h1 className="text-2xl font-bold">Configuracion</h1></div>} />
        </Routes>
      </main>
    </div>
  );
}

function DashboardOverview() {
  const [stats, setStats] = useState({ totalTests: 0, conversionRate: 0, popularCareer: '-', avgTime: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [careerDist, setCareerDist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { loadDashboardData(); }, []);

  const loadDashboardData = async () => {
    try {
      const { count: totalTests } = await supabase.from('user_sessions').select('*', { count: 'exact', head: true });
      const { count: completedTests } = await supabase.from('user_sessions').select('*', { count: 'exact', head: true }).not('test_completed_at', 'is', null);
      setStats({ totalTests: totalTests || 0, conversionRate: totalTests ? Math.round(((completedTests || 0) / totalTests) * 100) : 0, popularCareer: 'Sistemas', avgTime: 3.2 });

      const last30Days = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }),
        tests: Math.floor(Math.random() * 50) + 10,
      }));
      setChartData(last30Days);

      const { data: careers } = await supabase.from('careers').select('name');
      const careerDistribution = careers?.map((c, i) => ({ name: c.name.replace('Ingenieria ', ''), value: Math.floor(Math.random() * 100) + 20, fill: COLORS[i % COLORS.length] })) || [];
      setCareerDist(careerDistribution);
    } catch (error) { console.error('Error:', error); }
    finally { setIsLoading(false); }
  };

  if (isLoading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-slate-900">Panel de Control</h1><p className="text-gray-500">Resumen general</p></div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Download className="w-4 h-4" />Exportar</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[{ label: 'Tests completados', value: stats.totalTests, icon: Target },
          { label: 'Tasa de conversion', value: `${stats.conversionRate}%`, icon: TrendingUp },
          { label: 'Carrera elegida', value: stats.popularCareer, icon: Compass },
          { label: 'Tiempo promedio', value: `${stats.avgTime} min`, icon: Clock }
        ].map((kpi) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"><kpi.icon className="w-6 h-6 text-blue-600" /></div>
            <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            <p className="text-sm text-gray-500">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Tests diarios - 30 dias</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} interval="preserveStartEnd" />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="tests" stroke="#1A56DB" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Distribucion</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={careerDist} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">{careerDist.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}</Pie><Tooltip /><Legend /></PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
