import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function JobCard({ job }) {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-semibold">{job.title}</h3>
      <p className="text-muted-foreground">{job.company}</p>

      <Link href={`/jobs/${job._id}`}>
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </Link>
    </Card>
  )
}
