import { Badge } from '@/components/ui/badge'

export default function ApplicantStatusBadge({
  status,
}: {
  status: string
}) {
  const styles: Record<string, string> = {
    Applied: 'bg-blue-100 text-blue-700',
    Shortlisted: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  }

  return (
    <Badge className={styles[status]}>
      {status}
    </Badge>
  )
}
