import axios from "axios";

// api/users.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


interface ApiResponse<T> {
  status: string;
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
  roles: Role[];
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Permission {
  permissionName: string;
  description: string;
  category: string;
}

interface PaginatedUsers {
  totalElements: number;
  totalPages: number;
  content: User[];
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

// ------------------ USER ------------------

export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get<ApiResponse<User>>("/users/me");
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function updateCurrentUser(dataInput: {
  username: string;
  email: string;
}): Promise<User> {
  const { data } = await api.put<ApiResponse<User>>("/users/me", dataInput);
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function changePassword(dataInput: {
  oldPassword: string;
  newPassword: string;
}): Promise<void> {
  const { data } = await api.post<ApiResponse<{}>>("/users/me/change-password", dataInput);
  if (!data.success) throw new Error(data.error);
}

// ------------------ ADMIN USERS ------------------

export async function getUsers(page = 0, size = 10): Promise<PaginatedUsers> {
  const { data } = await api.get<ApiResponse<PaginatedUsers>>(
    `/admin/users?page=${page}&size=${size}`
  );
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function getUserById(userId: string): Promise<User> {
  const { data } = await api.get<ApiResponse<User>>(`/admin/users/${userId}`);
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  roleNames: string[];
  verified: boolean;
}): Promise<User> {
  const { data } = await api.post<ApiResponse<User>>("/admin/users", userData);
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function updateUser(
  userId: string,
  updateData: {
    username: string;
    email: string;
    roleNames: string[];
    verified: boolean;
  }
): Promise<User> {
  const { data } = await api.put<ApiResponse<User>>(`/admin/users/${userId}`, updateData);
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function deleteUser(userId: string): Promise<void> {
  const { data } = await api.delete<ApiResponse<{}>>(`/admin/users/${userId}`);
  if (!data.success) throw new Error(data.error);
}

export async function resetUserPassword(userId: string, newPassword: string): Promise<void> {
  const { data } = await api.post<ApiResponse<{}>>(`/admin/users/${userId}/reset-password`, {
    newPassword,
  });
  if (!data.success) throw new Error(data.error);
}

// ------------------ ROLES ------------------

export async function getRoles(): Promise<Role[]> {
  const { data } = await api.get<ApiResponse<Role[]>>("/admin/roles");
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function getRoleById(roleId: number): Promise<Role> {
  const { data } = await api.get<ApiResponse<Role>>(`/admin/roles/${roleId}`);
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function createRole(roleData: {
  name: string;
  permissionNames: string[];
}): Promise<void> {
  const { data } = await api.post<ApiResponse<{}>>("/admin/roles", roleData);
  if (!data.success) throw new Error(data.error);
}

export async function updateRole(
  roleId: number,
  roleData: {
    name: string;
    permissionNames: string[];
  }
): Promise<void> {
  const { data } = await api.put<ApiResponse<{}>>(`/admin/roles/${roleId}`, roleData);
  if (!data.success) throw new Error(data.error);
}

export async function deleteRole(roleId: number): Promise<void> {
  const { data } = await api.delete<ApiResponse<{}>>(`/admin/roles/${roleId}`);
  if (!data.success) throw new Error(data.error);
}

// ------------------ PERMISSIONS ------------------

export async function getPermissions(): Promise<Permission[]> {
  const { data } = await api.get<ApiResponse<Permission[]>>("/admin/permissions");
  if (!data.success) throw new Error(data.error);
  return data.data;
}
