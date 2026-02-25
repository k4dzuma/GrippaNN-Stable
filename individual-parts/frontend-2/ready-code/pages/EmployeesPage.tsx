import { useState, useEffect } from 'react';
import { employeesApi } from '@/api/employees';
import { filesApi } from '@/api/files';
import type { Employee, FileItem } from '@/types';
import { 
  Users, 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  FileText, 
  UserCircle, 
  MapPin, 
  Fingerprint, 
  Upload, 
  X, 
  Check,
  Eye,
  Download
} from 'lucide-react';

export default function EmployeesPage() {
  const [items, setItems] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [showDetail, setShowDetail] = useState<Employee | null>(null);
  const [empFiles, setEmpFiles] = useState<FileItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    last_name: '', first_name: '', middle_name: '', birth_date: '',
    passport_series: '', passport_number: '', passport_issue_date: '',
    passport_issued_by: '', passport_code: '',
    address_region: '', address_city: '', address_street: '',
    address_house: '', address_building: '', address_flat: '',
  });
  const [fileTitle, setFileTitle] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await employeesApi.list();
      setItems(data.results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const loadFiles = async (empId: number) => {
    const { data } = await filesApi.list({ employee: String(empId) });
    setEmpFiles(data.results);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, birth_date: form.birth_date || null, passport_issue_date: form.passport_issue_date || null };
    if (editing) {
      await employeesApi.update(editing.id, payload);
    } else {
      await employeesApi.create(payload);
    }
    setShowForm(false);
    setEditing(null);
    resetForm();
    load();
  };

  const resetForm = () => setForm({
    last_name: '', first_name: '', middle_name: '', birth_date: '',
    passport_series: '', passport_number: '', passport_issue_date: '',
    passport_issued_by: '', passport_code: '',
    address_region: '', address_city: '', address_street: '',
    address_house: '', address_building: '', address_flat: '',
  });

  const handleEdit = (item: Employee) => {
    setEditing(item);
    setForm({
      last_name: item.last_name, first_name: item.first_name, middle_name: item.middle_name,
      birth_date: item.birth_date || '',
      passport_series: item.passport_series, passport_number: item.passport_number,
      passport_issue_date: item.passport_issue_date || '',
      passport_issued_by: item.passport_issued_by, passport_code: item.passport_code,
      address_region: item.address_region, address_city: item.address_city,
      address_street: item.address_street, address_house: item.address_house,
      address_building: item.address_building, address_flat: item.address_flat,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Удалить карточку сотрудника?')) {
      await employeesApi.delete(id);
      load();
    }
  };

  const handleFileUpload = async (empId: number) => {
    if (!fileInput || !fileTitle) return;
    await filesApi.upload(empId, fileTitle, fileInput);
    setFileTitle('');
    setFileInput(null);
    loadFiles(empId);
  };

  const handleViewDetail = (item: Employee) => {
    setShowDetail(item);
    loadFiles(item.id);
  };

  const filteredItems = items.filter(item => 
    item.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Users className="h-7 w-7 text-blue-600" />
            Личный состав
          </h1>
          <p className="text-slate-500 text-sm mt-1">Реестр сотрудников и персональные данные</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); resetForm(); }}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            showForm ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700'
          }`}
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{showForm ? 'Закрыть форму' : 'Добавить сотрудника'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in zoom-in-95 duration-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
          <h2 className="text-xl font-bold text-slate-800 mb-8">
            {editing ? 'Редактирование профиля' : 'Новый сотрудник'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <UserCircle className="h-4 w-4" /> Основные данные
                </h3>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Фамилия *</label>
                <input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Имя *</label>
                <input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Отчество</label>
                <input value={form.middle_name} onChange={(e) => setForm({ ...form, middle_name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Дата рождения</label>
                <input type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="md:col-span-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Fingerprint className="h-4 w-4" /> Паспортные данные
                </h3>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Серия</label>
                <input value={form.passport_series} onChange={(e) => setForm({ ...form, passport_series: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Номер</label>
                <input value={form.passport_number} onChange={(e) => setForm({ ...form, passport_number: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Дата выдачи</label>
                <input type="date" value={form.passport_issue_date} onChange={(e) => setForm({ ...form, passport_issue_date: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-slate-700">Кем выдан</label>
                <input value={form.passport_issued_by} onChange={(e) => setForm({ ...form, passport_issued_by: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Код подразделения</label>
                <input value={form.passport_code} onChange={(e) => setForm({ ...form, passport_code: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="md:col-span-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4" /> Адрес проживания
                </h3>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Регион / Область</label>
                <input value={form.address_region} onChange={(e) => setForm({ ...form, address_region: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Город / НП</label>
                <input value={form.address_city} onChange={(e) => setForm({ ...form, address_city: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Улица</label>
                <input value={form.address_street} onChange={(e) => setForm({ ...form, address_street: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <button type="submit" className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
                <Check className="h-5 w-5" />
                {editing ? 'Сохранить изменения' : 'Принять сотрудника'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                className="bg-slate-100 text-slate-600 px-8 py-4 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      {showDetail && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-200">
                  {showDetail.last_name[0]}{showDetail.first_name[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{showDetail.full_name}</h2>
                  <p className="text-slate-500 font-medium">Сотрудник системы</p>
                </div>
              </div>
              <button onClick={() => setShowDetail(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="h-6 w-6 text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <UserCircle className="h-4 w-4" /> Личная информация
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-sm text-slate-500">Дата рождения</span>
                      <span className="text-sm font-bold text-slate-900">{showDetail.birth_date || 'Не указана'}</span>
                    </div>
                  </div>
                </section>
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Fingerprint className="h-4 w-4" /> Паспорт
                  </h3>
                  <p className="text-sm font-bold text-slate-900">{showDetail.passport_series} {showDetail.passport_number}</p>
                  <p className="text-xs text-slate-500 mt-1">{showDetail.passport_issued_by}</p>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Документы
                  </h3>
                  <div className="space-y-3">
                    {empFiles.map((f) => (
                      <div key={f.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <span className="text-sm font-semibold text-slate-700">{f.title}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a href={f.file} target="_blank" rel="noreferrer" className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md">
                            <Download className="h-4 w-4" />
                          </a>
                          <button onClick={async () => { await filesApi.delete(f.id); loadFiles(showDetail.id); }}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-md">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {empFiles.length === 0 && <p className="text-slate-400 text-sm italic">Файлы не загружены</p>}
                  </div>
                  
                  <div className="mt-6 p-4 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
                    <input placeholder="Название документа..." value={fileTitle} onChange={(e) => setFileTitle(e.target.value)}
                      className="w-full border-none bg-transparent text-sm focus:ring-0 p-0 mb-2 placeholder-slate-400 font-semibold" />
                    <div className="flex items-center justify-between">
                      <input type="file" id="file-upload" className="hidden" onChange={(e) => setFileInput(e.target.files?.[0] || null)} />
                      <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                        <Upload className="h-4 w-4" />
                        {fileInput ? fileInput.name : 'Выбрать файл'}
                      </label>
                      <button onClick={() => handleFileUpload(showDetail.id)}
                        disabled={!fileInput || !fileTitle}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 disabled:opacity-30">
                        Загрузить
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Поиск по ФИО..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500">Загрузка данных...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Сотрудник</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Дата рождения</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Документы</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Управление</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs border border-slate-200">
                          {item.last_name[0]}{item.first_name[0]}
                        </div>
                        <div className="font-bold text-slate-900">{item.full_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {item.birth_date || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md">ID: {item.id}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => handleViewDetail(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Карточка">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleEdit(item)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Изменить">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Удалить">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
