type Tab = 'home' | 'test' | 'maestros' | 'campus' | 'dashboard';

interface NavbarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onStartTest: () => void;
}

export type { Tab };

export function Navbar({ activeTab, onTabChange, onStartTest }: NavbarProps) {
  const navLinks: { id: Tab; label: string }[] = [
    { id: 'home',      label: 'Inicio' },
    { id: 'test',      label: 'Test' },
    { id: 'maestros',  label: 'Maestros' },
    { id: 'campus',    label: 'Campus' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-sm font-black">B</span>
          </div>
          <div className="leading-none">
            <p className="font-black text-gray-900 text-sm">Compasslife</p>
            <p className="text-blue-500 text-xs font-medium">ITSM Monclova</p>
          </div>
        </button>

        {/* Links de navegación — desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => onTabChange(link.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === link.id
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Derecha */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onTabChange('dashboard')}
            className="hidden sm:block text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors px-3 py-1.5"
          >
            Iniciar sesión
          </button>
          <button
            onClick={onStartTest}
            className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-all active:scale-98"
          >
            Hacer el test
          </button>
        </div>
      </div>

      {/* Mobile nav — tabs en la parte inferior */}
      <div className="sm:hidden flex border-t border-gray-100">
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => onTabChange(link.id)}
            className={`flex-1 py-2.5 text-xs font-medium transition-all border-b-2 ${
              activeTab === link.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-400'
            }`}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex-1 py-2.5 text-xs font-medium transition-all border-b-2 ${
            activeTab === 'dashboard'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-400'
          }`}
        >
          Admin
        </button>
      </div>
    </nav>
  );
}
