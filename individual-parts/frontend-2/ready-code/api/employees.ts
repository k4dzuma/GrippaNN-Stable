import api from './axios';
import type { Employee, PaginatedResponse } from '@/types';

export const employeesApi = {
  list: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Employee>>('/employees/', { params }),

  get: (id: number) =>
    api.get<Employee>(`/employees/${id}/`),

  create: (data: Partial<Employee>) =>
    api.post<Employee>('/employees/', data),

  update: (id: number, data: Partial<Employee>) =>
    api.put<Employee>(`/employees/${id}/`, data),

  delete: (id: number) =>
    api.delete(`/employees/${id}/`),
};
