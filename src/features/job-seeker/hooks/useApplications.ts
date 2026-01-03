import { useEffect, useState } from "react";
import { Application } from "../types/application";
import { getMyApplications } from "@/services/applicant.service";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyApplications().then(data => {
      setApplications(data);
      setLoading(false);
    });
  }, []);

  return { applications, loading };
}
