"use client"

import { Button } from "@/components/ui/button"
import { applyJob } from "@/services/jobSeeker.service"
import { useState } from "react"
import { toast } from "sonner"

export default function ApplyButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState(false)

  const handleApply = async () => {
    try {
      setLoading(true)
      await applyJob(jobId)
      toast.success("Applied successfully")
      setApplied(true)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Apply failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleApply}
      disabled={loading || applied}
      className="w-full"
    >
      {applied ? "Applied" : loading ? "Applying..." : "Apply Now"}
    </Button>
  )
}
