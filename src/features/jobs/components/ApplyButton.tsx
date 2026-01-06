// "use client"

// import { Button } from "@/components/ui/button"
// import { useProfile } from "@/features/profile/hooks/useProfile"
// import { applyJob } from "@/services/jobSeeker.service"
// import { useState } from "react"
// import { toast } from "sonner"

// export default function ApplyButton({ jobId }: { jobId: string }) {
//   const [loading, setLoading] = useState(false)
//   const [applied, setApplied] = useState(false)
//   const { profile } = useProfile()
//   const resumeFileId = profile?.resume

//   const handleApply = async () => {
//     try {
//       setLoading(true)
//       await applyJob(jobId,resumeFileId)
//       toast.success("Applied successfully")
//       setApplied(true)
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Apply failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Button
//       onClick={handleApply}
//       disabled={loading || applied}
//       className="w-full"
//     >
//       {applied ? "Applied" : loading ? "Applying..." : "Apply Now"}
//     </Button>
//   )
// }



"use client"

import { Button } from "@/components/ui/button"
import { useProfile } from "@/features/profile/hooks/useProfile"
import { applyJob} from "@/services/jobSeeker.service"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { checkJobApplied } from "../services/publicJob.service"

export default function ApplyButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState(false)

  const { profile } = useProfile()
  const resumeFileId = profile?.resume

  // ✅ Check on page load
  useEffect(() => {
    if (!jobId) return

    checkJobApplied(jobId)
      .then(res => setApplied(res.data.applied))
      .catch(() => setApplied(false))
  }, [jobId])

  const handleApply = async () => {
    try {
      setLoading(true)
      await applyJob(jobId, resumeFileId)
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
