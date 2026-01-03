"use client";

import AppliedJobCard from "@/features/job-seeker/components/AppliedJobCard";
import { useApplications } from "@/features/job-seeker/hooks/useApplications";


export default function AppliedJobsPage() {
  const { applications, loading } = useApplications();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      <div className="space-y-4">
        {applications.map(app => (
          <AppliedJobCard key={app._id} app={app} />
        ))}
      </div>
    </div>
  );
}
