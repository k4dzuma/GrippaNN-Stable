import { useState, useEffect } from 'react';
import { hrOperationsApi } from '@/api/hrOperations';
import { employeesApi } from '@/api/employees';
import { departmentsApi } from '@/api/departments';
import { positionsApi } from '@/api/positions';
import type { HrOperation, Employee, Department, Position } from '@/types';

const operationTypes = [
  { value: 'hire', label: 'Принятие на работу' },
  { value: 'salary_change', label: 'Изменение зарплаты' },
  { value: 'department_change', label: 'Изменение отдела' },
  { value: 'dismissal', label: 'Увольнение' },
];

export default function HrOperationsPage() {
  const [items, setItems] = useState<HrOperation[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    employee: '', operation_type: 'hire', department: '', position: '', salary: '', effective_date: '',
  });

  const load = async () => {
    setLoading(true);
    try {
      const [opsRes, empRes, depRes, posRes] = await Promise.all([
        hrOperationsApi.list(),
        employeesApi.list(),
        departmentsApi.list(),
        positionsApi.list(),
      ]);
      setItems(opsRes.data.results);
      setEmployees(empRes.data.results);
      setDepartments(depRes.data.results);
      setPositions(posRes.data.results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await hrOperationsApi.create({
      employee: Number(form.employee),
      operation_type: form.operation_type as HrOperation['operation_type'],
      department: form.department ? Number(form.department) : null,
      position: form.position ? Number(form.position) : null,
      salary: form.salary || null,
      effective_date: form.effective_date,
    });
    setShowForm(false);
    setForm({ employee: '', operation_type: 'hire', department: '', position: '', salary: '', effective_date: '' });
    load();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Удалить операцию?')) {
      await hrOperationsApi.delete(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Кадровые операции</h1>
        <button onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Добавить</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Новая операция</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Сотрудник *</label>
              <select value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" required>
                <option value="">Выберите...</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.full_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Тип операции *</label>
              <select value={form.operation_type} onChange={(e) => setForm({ ...form, operation_type: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" required>
                {operationTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
              <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="">—</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
              <select value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="">—</option>
                {positions.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Зарплата</label>
              <input type="number" step="0.01" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Дата вступления в силу *</label>
              <input type="date" value={form.effective_date} onChange={(e) => setForm({ ...form, effective_date: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" required />
            </div>
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Сохранить</button>
              <button type="button" onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300">Отмена</button>
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
                <th className="text-left px-4 py-3 font-medium text-gray-600">Сотрудник</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Тип</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Отдел</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Должность</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Зарплата</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Дата</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{item.employee_name}</td>
                  <td className="px-4 py-3 text-gray-500">{item.operation_type_display}</td>
                  <td className="px-4 py-3 text-gray-500">{item.department_name || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{item.position_name || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{item.salary || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{item.effective_date}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 text-sm">Удалить</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">Нет данных</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
