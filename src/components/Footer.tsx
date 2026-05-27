import { Link } from 'react-router-dom';
import { Compass, MapPin, Phone, Mail, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-sm text-white/60 mb-4 text-center">Construido con</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              { name: 'React 18', logo: 'React' },
              { name: 'TypeScript', logo: 'TS' },
              { name: 'Tailwind CSS', logo: 'CSS' },
              { name: 'Framer Motion', logo: 'FM' },
              { name: 'Recharts', logo: 'Charts' },
              { name: 'Supabase', logo: 'SB' },
            ].map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 text-white/80">
                <span className="text-lg font-bold text-blue-400">{tech.logo}</span>
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">BrujulaTec</span>
                <p className="text-xs text-white/60">ITSM Monclova</p>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              Tu guia vocacional para descubrir la ingenieria perfecta para ti.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explora</h4>
            <ul className="space-y-2">
              <li><Link to="/test" className="text-sm text-white/70 hover:text-white">Test Vocacional</Link></li>
              <li><Link to="/carreras" className="text-sm text-white/70 hover:text-white">Explorar Carreras</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Carreras</h4>
            <ul className="space-y-2">
              <li><Link to="/carreras" className="text-sm text-white/70 hover:text-white">Ingenieria Industrial</Link></li>
              <li><Link to="/carreras" className="text-sm text-white/70 hover:text-white">Sistemas Computacionales</Link></li>
              <li><Link to="/carreras" className="text-sm text-white/70 hover:text-white">Ingenieria Mecanica</Link></li>
              <li><Link to="/carreras" className="text-sm text-white/70 hover:text-white">Ingenieria Electrica</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>TecNM Campus Monclova</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4" />
                <span>(866) 631-1000</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4" />
                <span>orientacion@itsm.edu.mx</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-white/50">
            {new Date().getFullYear()} BrujulaTec - TecNM Campus Monclova
          </p>
        </div>
      </div>
    </footer>
  );
}
