import { useEffect, useState } from "react";
import { AdminApplication } from "../types/admin";
import { fetchApplications } from "../services/admin.service";

export const useAdminApplications = () => {
  const [apps, setApps] = useState<AdminApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications()
      .then(setApps)
      .finally(() => setLoading(false));
  }, []);

  return { apps, loading };
};
