import { Job, JobStatus } from "@/features/job-seeker/types/job";
import api from "@/services/api";

export const fetchAdminJobs = async (): Promise<Job[]> => {
  const { data } = await api.get("/admin/jobs");
  return data;
};

export const updateJobStatus = async (
  jobId: string,
  status: JobStatus
) => {
  return api.patch(`/admin/jobs/${jobId}/status`, { status });
};

export const toggleJobBlock = async (jobId: string) => {
  return api.patch(`/admin/jobs/${jobId}/block`);
};
