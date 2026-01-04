"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobs } from "@/features/admin/hooks/useJobs";
import { JobStatus } from "@/features/job-seeker/types/job";

export default function AdminJobsPage() {
  const {
    jobs,
    loading,
    error,
    onStatusChange,
    onBlockToggle,
  } = useJobs();

  if (loading) {
    return <p className="p-6">Loading jobs...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load jobs: {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Job Management</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>

              <TableCell>
                <Select
                  value={job.status}
                  onValueChange={(value: JobStatus) =>
                    onStatusChange(job._id, value)
                  }
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                {job.applicationCount}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant={job.isBlocked ? "default" : "destructive"}
                  onClick={() => onBlockToggle(job._id)}
                >
                  {job.isBlocked ? "Unblock" : "Block"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
