import api from "@/services/api";
import { AdminReport } from "../types/report.types";

export const fetchAdminReports = async (): Promise<AdminReport> => {
  const { data } = await api.get("/admin/reports");
  return data;
};
