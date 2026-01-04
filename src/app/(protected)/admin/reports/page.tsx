"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReports } from "@/features/admin/hooks/useReports";

export default function AdminReportsPage() {
  const { data, loading, error } = useReports();

  if (loading) {
    return <p className="p-6">Loading reports...</p>;
  }

  if (error || !data) {
    return (
      <div className="p-6 text-red-500">
        {error || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Reports</h1>

      {/* USERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReportCard title="Total Users" value={data.totalUsers} />
        <ReportCard title="Blocked Users" value={data.blockedUsers} />
      </div>

      {/* JOBS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ReportCard title="Total Jobs" value={data.totalJobs} />
        <ReportCard title="Open Jobs" value={data.openJobs} />
        <ReportCard title="Closed Jobs" value={data.closedJobs} />
        <ReportCard title="Paused Jobs" value={data.pausedJobs} />
      </div>

      {/* APPLICATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReportCard
          title="Total Applications"
          value={data.totalApplications}
        />
      </div>
    </div>
  );
}

function ReportCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
