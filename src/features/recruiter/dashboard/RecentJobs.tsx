"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RecentJobs({ jobs }: { jobs: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {jobs.map(job => (
          <div
            key={job._id}
            className="flex items-center justify-between border-b pb-2 text-sm"
          >
            <div>
              <p className="font-medium">{job.title}</p>
              <p className="text-muted-foreground">{job.location}</p>
            </div>
            <span className="text-xs text-muted-foreground">
              {job.applicationsCount} applicants
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
