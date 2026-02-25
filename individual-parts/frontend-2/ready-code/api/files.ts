import api from './axios';
import type { FileItem, PaginatedResponse } from '@/types';

export const filesApi = {
  list: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<FileItem>>('/files/', { params }),

  upload: (employeeId: number, title: string, file: File) => {
    const formData = new FormData();
    formData.append('employee', String(employeeId));
    formData.append('title', title);
    formData.append('file', file);
    return api.post<FileItem>('/files/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete: (id: number) =>
    api.delete(`/files/${id}/`),
};
