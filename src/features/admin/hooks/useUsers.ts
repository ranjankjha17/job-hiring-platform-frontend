"use client";

import { useEffect, useState } from "react";
import { fetchUsers, toggleBlockUser, updateUserRole } from "../services/user.service";
import { Role, User } from "@/context/AuthContext";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const onBlockToggle = async (userId: string) => {
    try {
      await toggleBlockUser(userId);
      loadUsers();
    } catch (err: any) {
      alert(err);
    }
  };

  const onRoleChange = async (userId: string, role:Role) => {
    try {
      await updateUserRole(userId, role);
      loadUsers();
    } catch (err: any) {
      alert(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    onBlockToggle,
    onRoleChange,
  };
};
