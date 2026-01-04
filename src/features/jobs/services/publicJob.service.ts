import { Job } from "@/features/job-seeker/types/job"
import api from "@/services/api"

export const getJobs = async (params?: any): Promise<Job[]> => {
  const res = await api.get("/jobs/public", { params })
  return res.data
}

export const getJobDetails = async (jobId: string): Promise<Job> => {
  const res = await api.get(`/jobs/public/${jobId}`)
  return res.data
}
