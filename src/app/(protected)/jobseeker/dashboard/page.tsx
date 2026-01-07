"use client";

import StatsCard from "@/features/job-seeker/components/StatsCard";
import { useApplications } from "@/features/job-seeker/hooks/useApplications";


export default function DashboardPage() {
  const { applications } = useApplications();
  console.log({applications})
console.log(applications.filter(a => a.status === "shortlisted" || "Shortlisted").length)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <StatsCard title="Applied Jobs" 
        // value={applications.length} 
        value={applications.filter(a => a.status === "applied" || "Applied").length}
        />
        <StatsCard
          title="Shortlisted"
          value={applications.filter(a => a.status === "shortlisted" || "Shortlisted").length}
        />
        <StatsCard
          title="Rejected"
          value={applications.filter(a => a.status === "rejected").length}
        />
      </div>
    </div>
  );
}
