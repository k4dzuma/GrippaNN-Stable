export interface User {
  id: number;
  username: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  role: 'admin' | 'hr_manager';
  is_active: boolean;
  deleted_at: string | null;
}

export interface Organization {
  id: number;
  name: string;
  comment: string;
  deleted_at: string | null;
}

export interface Department {
  id: number;
  organization: number;
  organization_name: string;
  name: string;
  parent: number | null;
  parent_name: string | null;
  comment: string;
  deleted_at: string | null;
}

export interface Position {
  id: number;
  name: string;
  comment: string;
  deleted_at: string | null;
}

export interface Employee {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  full_name: string;
  birth_date: string | null;
  passport_series: string;
  passport_number: string;
  passport_issue_date: string | null;
  passport_issued_by: string;
  passport_code: string;
  address_region: string;
  address_city: string;
  address_street: string;
  address_house: string;
  address_building: string;
  address_flat: string;
  deleted_at: string | null;
}

export interface FileItem {
  id: number;
  employee: number;
  title: string;
  file: string;
  uploaded_at: string;
  deleted_at: string | null;
}

export interface HrOperation {
  id: number;
  employee: number;
  employee_name: string;
  operation_type: 'hire' | 'salary_change' | 'department_change' | 'dismissal';
  operation_type_display: string;
  department: number | null;
  department_name: string | null;
  position: number | null;
  position_name: string | null;
  salary: string | null;
  effective_date: string;
  created_by: number | null;
  created_by_name: string | null;
  deleted_at: string | null;
}

export interface ChangeHistoryItem {
  id: number;
  date: string;
  user: number | null;
  user_name: string | null;
  object_type: string;
  object_type_display: string;
  object_id: number;
  changed_fields: string[];
  old_values: Record<string, string | null>;
  new_values: Record<string, string | null>;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AuthTokens {
  access: string;
  refresh: string;
  user: User;
}
