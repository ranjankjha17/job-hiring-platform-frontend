"use client";

import JobCard from "@/features/job-seeker/components/JobCard";
import { useJobs } from "@/features/job-seeker/hooks/useJobs";

export default function FindJobsPage() {
  const { jobs, loading } = useJobs();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Find Jobs</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
