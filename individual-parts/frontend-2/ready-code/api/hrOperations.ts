import api from './axios';
import type { HrOperation, PaginatedResponse } from '@/types';

export const hrOperationsApi = {
  list: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<HrOperation>>('/hr-operations/', { params }),

  get: (id: number) =>
    api.get<HrOperation>(`/hr-operations/${id}/`),

  create: (data: Partial<HrOperation>) =>
    api.post<HrOperation>('/hr-operations/', data),

  update: (id: number, data: Partial<HrOperation>) =>
    api.put<HrOperation>(`/hr-operations/${id}/`, data),

  delete: (id: number) =>
    api.delete(`/hr-operations/${id}/`),
};
