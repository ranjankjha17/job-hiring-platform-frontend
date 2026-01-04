import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ApplyButton from "@/features/jobs/components/ApplyButton"
import { getJobDetails } from "@/features/jobs/services/publicJob.service"

export default async function JobDetailsPage({
  params,
}: {
  params: { jobId: string }
}) {
  const job = await getJobDetails(params.jobId)

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-muted-foreground">
          {job.company?.name} • {job.location}
        </p>
      </div>

      <div className="flex gap-2">
        <Badge>{job.type}</Badge>
        <Badge>{job.experience}</Badge>
        <Badge>{job.salary}</Badge>
      </div>

      <section>
        <h2 className="font-semibold text-lg mb-2">Job Description</h2>
        <p className="text-muted-foreground whitespace-pre-line">
          {job.description}
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-2">Requirements</h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          {job.requirements?.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      {/* ✅ Apply only after seeing details */}
      <ApplyButton jobId={job._id} />
    </div>
  )
}
