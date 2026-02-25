import api from './axios';
import type { Position, PaginatedResponse } from '@/types';

export const positionsApi = {
  list: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Position>>('/positions/', { params }),

  get: (id: number) =>
    api.get<Position>(`/positions/${id}/`),

  create: (data: Partial<Position>) =>
    api.post<Position>('/positions/', data),

  update: (id: number, data: Partial<Position>) =>
    api.put<Position>(`/positions/${id}/`, data),

  delete: (id: number) =>
    api.delete(`/positions/${id}/`),
};
