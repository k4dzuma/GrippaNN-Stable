import { useState, useEffect } from 'react';
import { organizationsApi } from '@/api/organizations';
import type { Organization } from '@/types';
import { 
  Building2, 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  AlertCircle,
  X,
  Check
} from 'lucide-react';

export default function OrganizationsPage() {
  const [items, setItems] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Organization | null>(null);
  const [form, setForm] = useState({ name: '', comment: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await organizationsApi.list();
      setItems(data.results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await organizationsApi.update(editing.id, form);
      } else {
        await organizationsApi.create(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm({ name: '', comment: '' });
      load();
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };

  const handleEdit = (item: Organization) => {
    setEditing(item);
    setForm({ name: item.name, comment: item.comment || '' });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту организацию?')) {
      await organizationsApi.delete(id);
      load();
    }
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Building2 className="h-7 w-7 text-blue-600" />
            Реестр организаций
          </h1>
          <p className="text-slate-500 text-sm mt-1">Управление юридическими лицами и филиалами</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', comment: '' }); }}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            showForm ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{showForm ? 'Закрыть форму' : 'Добавить организацию'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in zoom-in-95 duration-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            {editing ? <Pencil className="h-5 w-5 text-amber-500" /> : <Plus className="h-5 w-5 text-blue-500" />}
            {editing ? 'Редактирование организации' : 'Регистрация новой организации'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Полное наименование</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Напр: ООО «Вектор»"
                required
              />
            </div>
            <div className="space-y-2 md:row-span-2">
              <label className="block text-sm font-semibold text-slate-700">Комментарий или описание</label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-full min-h-[120px]"
                placeholder="Дополнительная информация об организации..."
              />
            </div>
            <div className="flex items-end gap-3">
              <button type="submit" className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                {editing ? 'Обновить данные' : 'Создать запись'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Поиск по названию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="flex items-center text-xs text-slate-500 font-medium">
            Всего записей: <span className="ml-1 text-slate-900 font-bold">{filteredItems.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Получение данных...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Код</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Организация</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Примечание</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Управление</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">#{item.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 italic max-w-xs truncate">
                      {item.comment || '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Редактировать"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="h-10 w-10 text-slate-200 mb-2" />
                        <p className="text-slate-400 font-medium text-sm">Ничего не найдено</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
