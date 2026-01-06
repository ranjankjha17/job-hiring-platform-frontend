import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "../types/job";
import { applyJob } from "@/services/jobSeeker.service";
import Link from "next/link";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardContent className="p-4 space-y-3">
        <Link href={`/jobs/${job._id}`}>

          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.company}</p>

          <div className="flex gap-2 flex-wrap">
            <Badge>{job.location}</Badge>
            <Badge>{job.experience}</Badge>
            <Badge>{job.salary}</Badge>
          </div>
        </Link>
        {/* <Button className="w-full" onClick={()=>applyJob("","")}>Apply</Button> */}
      </CardContent>
    </Card>
  );
}
