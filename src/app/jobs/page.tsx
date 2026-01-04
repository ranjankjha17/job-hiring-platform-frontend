"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useJobs } from "@/features/jobs/hooks/useJobs"
import JobFilters from "@/features/jobs/components/JobFilters"
import JobCard from "@/features/jobs/components/JobCard"

export default function JobsPage() {
  const [filters, setFilters] = useState({})
  const { jobs, loading, error } = useJobs(filters)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Jobs</h1>

      <JobFilters onChange={setFilters} />

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && jobs.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">
          No jobs found
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  )
}
