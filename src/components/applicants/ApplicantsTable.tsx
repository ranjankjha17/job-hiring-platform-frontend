'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ApplicantActions from './ApplicantActions'
import { useState } from 'react'
import ApplicantProfileModal from './ApplicantProfileModal'
import ApplicantStatusBadge from './ApplicantStatusBadge'

export default function ApplicantsTable({
  applicants,
  refresh,
}: {
  applicants: any[]
  refresh: () => void
}) {
  const [selected, setSelected] = useState<any>(null)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants.map(app => (
            <TableRow
              key={app._id}
              className="cursor-pointer"
              onClick={() => setSelected(app)}
            >
              <TableCell className="font-medium">
                {app.applicant.name}
              </TableCell>
              <TableCell>{app.job.title}</TableCell>
              <TableCell>
                <ApplicantStatusBadge status={app.status} />
              </TableCell>
              <TableCell>
                {new Date(app.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell onClick={e => e.stopPropagation()}>
                <ApplicantActions
                  applicant={app}
                  refresh={refresh}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ApplicantProfileModal
        applicant={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  )
}
