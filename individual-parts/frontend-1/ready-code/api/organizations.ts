import api from './axios';
import type { Organization, PaginatedResponse } from '@/types';

export const organizationsApi = {
  list: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Organization>>('/organizations/', { params }),

  get: (id: number) =>
    api.get<Organization>(`/organizations/${id}/`),

  create: (data: Partial<Organization>) =>
    api.post<Organization>('/organizations/', data),

  update: (id: number, data: Partial<Organization>) =>
    api.put<Organization>(`/organizations/${id}/`, data),

  delete: (id: number) =>
    api.delete(`/organizations/${id}/`),
};
