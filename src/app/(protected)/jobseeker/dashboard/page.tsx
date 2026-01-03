// 'use client'

// import { Button } from "@/components/ui/button"
// import { useAuth } from "@/hooks/useAuth"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// export default function JobseekerDashboard(){
//         const { user, isAuthenticated, authLoading, logout } = useAuth()
//         const router = useRouter()
    
//         useEffect(() => {
//             if (!authLoading && !isAuthenticated) {
//                 router.replace('/login')
//             }
//         }, [isAuthenticated, authLoading, router])
    
//         if (authLoading || !isAuthenticated || !user) {
//             return null // or <LoadingSpinner />
//         }
    
//     return(
//         <div className='p-6'>
//             <h1 className='text-2xl font-bold'>Jobseeker Dashboard</h1>
//             <p className='mt-2'>Name: {user.name}</p>
//             <p>Role: {user.role}</p>
//             <Button onClick={logout} className='mt-4'>Logout</Button>
//         </div>
//     )
// }




"use client";

import StatsCard from "@/features/job-seeker/components/StatsCard";
import { useApplications } from "@/features/job-seeker/hooks/useApplications";


export default function DashboardPage() {
  const { applications } = useApplications();
  console.log({applications})
console.log(applications.filter(a => a.status === "shortlisted" || "Shortlisted").length)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <StatsCard title="Applied Jobs" value={applications.length} />
        <StatsCard
          title="Shortlisted"
          value={applications.filter(a => a.status === "shortlisted" || "Shortlisted").length}
        />
        <StatsCard
          title="Rejected"
          value={applications.filter(a => a.status === "rejected").length}
        />
      </div>
    </div>
  );
}
