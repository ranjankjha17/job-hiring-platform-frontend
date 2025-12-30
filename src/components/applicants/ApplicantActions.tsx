'use client'

import { Button } from '@/components/ui/button'
import { Check, X, FileText } from 'lucide-react'
import { toast } from 'sonner'
import {
  updateApplicantStatus,
  downloadResume,
} from '@/services/applicant.service'

export default function ApplicantActions({
  applicant,
  refresh,
}: {
  applicant: any
  refresh: () => void
}) {
  const updateStatus = async (status: 'Shortlisted' | 'Rejected') => {
    await updateApplicantStatus(applicant._id, status)
    toast.success(`Applicant ${status}`)
    refresh()
  }

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={() => downloadResume(applicant.resumeFileId)}
      >
        <FileText size={16} />
      </Button>

      <Button
        size="icon"
        className="bg-green-600 hover:bg-green-700"
        onClick={() => updateStatus('Shortlisted')}
      >
        <Check size={16} />
      </Button>

      <Button
        size="icon"
        variant="destructive"
        onClick={() => updateStatus('Rejected')}
      >
        <X size={16} />
      </Button>
    </div>
  )
}
