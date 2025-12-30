'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ApplicantsTable from '@/components/applicants/ApplicantsTable'
import { getApplicants } from '@/services/applicant.service'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [jobId, setJobId] = useState<string | undefined>()

  const loadApplicants = async () => {
    setLoading(true)
    const data = await getApplicants(jobId)
    setApplicants(data)
    setLoading(false)
  }

  useEffect(() => {
    loadApplicants()
  }, [jobId])

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Applicants</CardTitle>

          <Select onValueChange={setJobId}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by Job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {/* map recruiter jobs */}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading applicants...</p>
          ) : applicants.length === 0 ? (
            <p className="text-muted-foreground">
              No applicants found
            </p>
          ) : (
            <ApplicantsTable
              applicants={applicants}
              refresh={loadApplicants}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
