import { Role, User } from "@/context/AuthContext";
import api from "@/services/api";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const toggleBlockUser = async (userId: string) => {
  return api.patch(`/admin/users/${userId}/block`);
};

export const updateUserRole = async (
  userId: string,
  role: Role
) => {
  return api.patch(`/admin/users/${userId}/role`, { role });
};
