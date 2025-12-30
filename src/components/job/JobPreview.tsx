// 'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function JobPreview({ job }: { job: any }) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>{job.title || 'Job Title'}</CardTitle>
        <p className="text-sm text-muted-foreground">{job.location}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          <Badge>{job.jobType}</Badge>
          <Badge variant="secondary">{job.experience}+ yrs</Badge>
          <Badge variant="outline">{job.salary}</Badge>
        </div>

        <div
          className="prose prose-sm"
          dangerouslySetInnerHTML={{
            __html: job.description || '<p>Job description preview...</p>',
          }}
        />
      </CardContent>
    </Card>
  )
}
