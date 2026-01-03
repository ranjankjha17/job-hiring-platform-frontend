import { Job } from '@/features/job-seeker/types/job';
import api from '@/services/api'

export const createJob = async (payload: any) => {
  const { data } = await api.post('/jobs', payload)
  return data
}

export const getJobs = async (params?: any): Promise<Job[]> => {
  const res = await api.get("/jobs", { params });
  return res.data;
};


export const getMyJobs = async (filters: any) => {
  const res = await api.get('/job-seeker/jobs')
  // console.log(res.data)
  return res.data
}

export const deleteJob = async (id: string) => {
  return api.delete(`/jobs/${id}`)
}

export const toggleJobStatus = async (id: string) => {
  return api.patch(`/jobs/${id}/toggle`)
}

export const duplicateJob = async (id: string) => {
  const { data } = await api.get(`/jobs/duplicate/${id}`)
  return data
}
