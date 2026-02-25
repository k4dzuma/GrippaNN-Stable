import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { organizationsApi } from '@/api/organizations';
import { employeesApi } from '@/api/employees';
import { positionsApi } from '@/api/positions';
import { 
  Users, 
  Building2, 
  Briefcase, 
  Calendar,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    employees: 0,
    organizations: 0,
    positions: 0,
    loading: true
  });

  const today = new Date().toLocaleDateString('ru-RU', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [empRes, orgRes, posRes] = await Promise.all([
          employeesApi.list(),
          organizationsApi.list(),
          positionsApi.list()
        ]);
        setStats({
          employees: empRes.data.count,
          organizations: orgRes.data.count,
          positions: posRes.data.count,
          loading: false
        });
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    loadStats();
  }, []);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 6) return 'Доброй ночи';
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  const statCards = [
    { label: 'Сотрудники', value: stats.employees, icon: Users, color: 'bg-blue-500', link: '/employees' },
    { label: 'Организации', value: stats.organizations, icon: Building2, color: 'bg-purple-500', link: '/organizations' },
    { label: 'Должности', value: stats.positions, icon: Briefcase, color: 'bg-emerald-500', link: '/positions' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {getTimeOfDay()}, {user?.first_name}!
          </h1>
          <p className="text-slate-500 mt-1 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Сегодня {today}
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div 
            key={stat.label} 
            onClick={() => navigate(stat.link)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {stats.loading ? '...' : stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-3">Готовы к работе?</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            В системе GrippaNN вы можете управлять штатным расписанием, отслеживать историю изменений и контролировать кадровые операции в режиме реального времени.
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => navigate('/employees')}
              className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              Добавить сотрудника
            </button>
            <button 
              onClick={() => navigate('/history')}
              className="bg-blue-500/30 text-white border border-blue-400/30 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-500/50 transition-colors"
            >
              История изменений
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
