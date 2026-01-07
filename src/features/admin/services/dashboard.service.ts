import api from "@/services/api";
import { DashboardStats } from "../types/dashboard.types";

export const fetchDashboardStats = async (
  from?: string,
  to?: string
): Promise<DashboardStats> => {
  const { data } = await api.get("/admin/dashboard", {
    params: { from, to },
  });
  return data;
};
