import api from './axios';
import type { User, PaginatedResponse } from '@/types';

export const usersApi = {
  list: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<User>>('/users/', { params }),

  get: (id: number) =>
    api.get<User>(`/users/${id}/`),

  create: (data: Record<string, string>) =>
    api.post<User>('/auth/register/', data),

  update: (id: number, data: Partial<User & { password?: string }>) =>
    api.put<User>(`/users/${id}/`, data),

  delete: (id: number) =>
    api.delete(`/users/${id}/`),
};
