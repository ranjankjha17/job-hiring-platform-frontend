'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ApplicantProfileModal({
  applicant,
  open,
  onClose,
}: {
  applicant: any
  open: boolean
  onClose: () => void
}) {
  if (!applicant) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{applicant.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p>Email: {applicant.email}</p>
          <p>Experience: {applicant.experience} years</p>
          <p>Skills: {applicant.skills.join(', ')}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
