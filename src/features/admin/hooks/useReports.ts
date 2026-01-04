"use client";

import { useEffect, useState } from "react";
import { fetchAdminReports } from "../services/report.service";
import { AdminReport } from "../types/report.types";

export const useReports = () => {
  const [data, setData] = useState<AdminReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchAdminReports();
      setData(res);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
