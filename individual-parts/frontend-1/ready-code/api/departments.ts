import api from './axios';
import type { Department, PaginatedResponse } from '@/types';

export const departmentsApi = {
  list: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Department>>('/departments/', { params }),

  get: (id: number) =>
    api.get<Department>(`/departments/${id}/`),

  create: (data: Partial<Department>) =>
    api.post<Department>('/departments/', data),

  update: (id: number, data: Partial<Department>) =>
    api.put<Department>(`/departments/${id}/`, data),

  delete: (id: number) =>
    api.delete(`/departments/${id}/`),
};
