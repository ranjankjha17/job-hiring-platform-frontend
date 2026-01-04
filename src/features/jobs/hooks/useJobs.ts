import { useEffect, useState } from "react"
import { Job } from "@/features/job-seeker/types/job"
import { getJobs } from "../services/publicJob.service"

export const useJobs = (filters: any) => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const data = await getJobs(filters)
        setJobs(data)
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load jobs")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters])

  return { jobs, loading, error }
}
