// "use client";

// import { useEffect, useState } from "react";
// import { fetchDashboardStats } from "../services/dashboard.service";
// import { DashboardStats } from "../types/dashboard.types";

// export const useDashboard = () => {
//   const [data, setData] = useState<DashboardStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await fetchDashboardStats();
//       setData(res);
//     } catch (err: any) {
//       setError(
//         err?.response?.data?.message ||
//         "Failed to load dashboard"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   return {
//     data,
//     loading,
//     error,
//   };
// };




"use client";

import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../services/dashboard.service";
import { DashboardStats } from "../types/dashboard.types";

export const useDashboard = (from?: Date, to?: Date) => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetchDashboardStats(
        from?.toISOString(),
        to?.toISOString()
      );

      setData(res);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [from, to]);

  return { data, loading, error };
};
