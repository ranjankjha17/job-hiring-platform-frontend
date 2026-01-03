import { useEffect, useState } from "react";
import { Job } from "../types/job";
import { getMyJobs } from "@/services/job.service";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (filters?: any) => {
    setLoading(true);
    const data = await getMyJobs(filters);
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, loading, fetchJobs };
}
