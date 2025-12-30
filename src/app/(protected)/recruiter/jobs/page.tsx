'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMyJobs } from '@/services/job.service'
import MyJobsTable from '@/components/job/MyJobsTable'

export default function MyJobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const loadJobs = async () => {
    setLoading(true)
    const data = await getMyJobs()
    setJobs(data)
    setLoading(false)
  }

  useEffect(() => {
    loadJobs()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Jobs</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-muted-foreground">
              No jobs posted yet
            </p>
          ) : (
            <MyJobsTable jobs={jobs} refresh={loadJobs} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
