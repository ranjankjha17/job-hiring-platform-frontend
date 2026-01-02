"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'

export default function RecentApplicants({ applicants }: { applicants: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applicants</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {applicants.map(app => (
          <div
            key={app._id}
            className="flex items-center justify-between border-b pb-2 text-sm"
          >
            <div>
              <p className="font-medium">{app.applicant.name}</p>
              <p className="text-muted-foreground">{app.job.title}</p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline">{app.status}</Badge>

              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/api/files/${app.resumeFileId}`}
                target="_blank"
              >
                <FileText className="h-4 w-4 text-blue-600" />
              </a>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
