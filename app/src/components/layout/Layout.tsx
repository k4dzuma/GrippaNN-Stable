import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center px-8 sticky top-0 z-10">
          <div className="flex-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Рабочая область</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-500">Статус системы</p>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5" />
                ОНЛАЙН
              </p>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
