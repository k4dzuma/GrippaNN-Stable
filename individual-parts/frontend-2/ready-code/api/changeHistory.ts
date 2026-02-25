import api from './axios';
import type { ChangeHistoryItem, PaginatedResponse } from '@/types';

export const changeHistoryApi = {
  list: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<ChangeHistoryItem>>('/change-history/', { params }),
};
