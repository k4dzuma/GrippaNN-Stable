import { useState, useEffect } from 'react';
import { changeHistoryApi } from '@/api/changeHistory';
import type { ChangeHistoryItem } from '@/types';

export default function HistoryPage() {
  const [items, setItems] = useState<ChangeHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await changeHistoryApi.list();
        setItems(data.results);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">История изменений</h1>

      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded mr-2">
                    {item.object_type_display}
                  </span>
                  <span className="text-sm text-gray-500">ID: {item.object_id}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleString('ru-RU')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Кто изменил: <strong>{item.user_name || 'Система'}</strong>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Изменённые поля: {item.changed_fields.join(', ')}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-red-50 p-2 rounded">
                  <p className="font-medium text-red-600 mb-1">Старые значения:</p>
                  {Object.entries(item.old_values).map(([k, v]) => (
                    <p key={k}><code>{k}</code>: {v ?? '—'}</p>
                  ))}
                  {Object.keys(item.old_values).length === 0 && <p className="text-gray-400">Создание</p>}
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <p className="font-medium text-green-600 mb-1">Новые значения:</p>
                  {Object.entries(item.new_values).map(([k, v]) => (
                    <p key={k}><code>{k}</code>: {v ?? '—'}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-400">Нет данных</div>
          )}
        </div>
      )}
    </div>
  );
}
