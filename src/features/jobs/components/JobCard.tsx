// import { Button } from "@/components/ui/button"
// import { Job } from "@/features/job-seeker/types/job"

// export default function JobCard({ job }: { job: Job }) {
//   return (
//     <div className="rounded-xl border p-5 shadow-sm hover:shadow-md transition">
//       <h3 className="text-lg font-semibold">{job.title}</h3>
//       <p className="text-sm text-muted-foreground">{job.company}</p>

//       <div className="mt-2 flex flex-wrap gap-2 text-sm">
//         <span>📍 {job.location}</span>
//         <span>💼 {job.type}</span>
//         {job.salary && <span>💰 {job.salary}</span>}
//       </div>

//       <Button className="mt-4 w-full">Apply</Button>
//     </div>
//   )
// }




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
