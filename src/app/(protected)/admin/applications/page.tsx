"use client";

import { Button } from "@/components/ui/button";
import { useAdminApplications } from "@/features/admin/hooks/useAdminApplications";
import { downloadResume } from "@/features/admin/services/admin.service";

export default function AdminApplications() {
  const { apps, loading } = useAdminApplications();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      {apps.map(app => (
        <div
          key={app._id}
          className="border p-4 rounded flex justify-between"
        >
          <div>
            <p className="font-semibold">{app.job.title}</p>
            <p>{app.applicant.name} ({app.applicant.email})</p>
          </div>

          <Button
            onClick={() => downloadResume(app.resumeFileId)}
          >
            Download Resume
          </Button>
        </div>
      ))}
    </div>
  );
}
