import { useState, useEffect } from 'react';
import { departmentsApi } from '@/api/departments';
import { organizationsApi } from '@/api/organizations';
import type { Department, Organization } from '@/types';

export default function DepartmentsPage() {
  const [items, setItems] = useState<Department[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [form, setForm] = useState({ name: '', organization: '', parent: '', comment: '' });

  const load = async () => {
    setLoading(true);
    try {
      const [depsRes, orgsRes] = await Promise.all([
        departmentsApi.list(),
        organizationsApi.list(),
      ]);
      setItems(depsRes.data.results);
      setOrgs(orgsRes.data.results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      organization: Number(form.organization),
      parent: form.parent ? Number(form.parent) : null,
      comment: form.comment,
    };
    if (editing) {
      await departmentsApi.update(editing.id, payload);
    } else {
      await departmentsApi.create(payload);
    }
    setShowForm(false);
    setEditing(null);
    setForm({ name: '', organization: '', parent: '', comment: '' });
    load();
  };

  const handleEdit = (item: Department) => {
    setEditing(item);
    setForm({
      name: item.name,
      organization: String(item.organization),
      parent: item.parent ? String(item.parent) : '',
      comment: item.comment,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Удалить отдел?')) {
      await departmentsApi.delete(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Отделы</h1>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', organization: '', parent: '', comment: '' }); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          Добавить
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">{editing ? 'Редактировать' : 'Новый отдел'}</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Организация</label>
              <select
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              >
                <option value="">Выберите...</option>
                {orgs.map((o) => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Наименование</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Родительский отдел</label>
              <select
                value={form.parent}
                onChange={(e) => setForm({ ...form, parent: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Нет (корневой отдел)</option>
                {items.filter((d) => d.id !== editing?.id).map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Сохранить
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300">
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Наименование</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Организация</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Родитель</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 text-gray-500">{item.organization_name}</td>
                  <td className="px-4 py-3 text-gray-500">{item.parent_name || '—'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 text-sm">Изменить</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 text-sm">Удалить</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Нет данных</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
