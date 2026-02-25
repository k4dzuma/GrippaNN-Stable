import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Building2, 
  Users, 
  Briefcase, 
  Contact2, 
  FileText, 
  History, 
  UserCog, 
  LogOut,
  LayoutDashboard
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Панель управления', icon: LayoutDashboard },
  { to: '/organizations', label: 'Организации', icon: Building2 },
  { to: '/departments', label: 'Отделы', icon: Users },
  { to: '/positions', label: 'Должности', icon: Briefcase },
  { to: '/employees', label: 'Сотрудники', icon: Contact2 },
  { to: '/hr-operations', label: 'Кадровые операции', icon: FileText },
  { to: '/history', label: 'История изменений', icon: History },
];

const adminItems = [
  { to: '/users', label: 'Пользователи системы', icon: UserCog },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-72 bg-slate-900 text-slate-300 min-h-screen p-6 flex flex-col shadow-2xl">
      <div className="mb-10 flex items-center space-x-3 px-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Home className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">GrippaNN</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">HR Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Навигация</p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <div className="mt-8">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Администрирование</p>
            {adminItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20'
                      : 'hover:bg-slate-800 hover:text-white text-slate-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-amber-400'}`} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-2xl mb-2 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.last_name} {user?.first_name}
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              {user?.role === 'admin' ? 'Администратор' : 'Менеджер'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-950/30 hover:text-red-400 transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          <span>Выйти из системы</span>
        </button>
      </div>
    </aside>
  );
}
