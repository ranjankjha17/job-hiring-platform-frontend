// 'use client'

// import { Button } from "@/components/ui/button"
// import { useAuth } from "@/hooks/useAuth"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// export default function RecruiterDashboard(){
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
//             <h1 className='text-2xl font-bold'>Recruiter Dashboard</h1>
//             <p className='mt-2'>Name: {user.name}</p>
//             <p>Role: {user.role}</p>
//             <Button onClick={logout} className='mt-4'>Logout</Button>
//         </div>
//     )
// }



'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'

import { Briefcase, Users, CheckCircle, FileText } from 'lucide-react'
import StatCard from '@/features/recruiter/dashboard/StatCard'
import RecentJobs from '@/features/recruiter/dashboard/RecentJobs'
import RecentApplicants from '@/features/recruiter/dashboard/RecentApplicants'

export default function RecruiterDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const statsRes = await api.get('/recruiter/stats')
      console.log({statsRes})
      const jobsRes = await api.get('/jobs')
      const appRes = await api.get('/applicants')

      setStats(statsRes.data)
      setJobs(jobsRes.data.slice(0, 5))
      setApplications(appRes.data.slice(0, 5))
    }

    loadData()
  }, [])

  if (!stats) return <div>Loading dashboard...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard title="Total Jobs" value={stats.totalJobs} icon={Briefcase} />
        <StatCard title="Applications" value={stats.totalApplications} icon={Users} />
        <StatCard title="Shortlisted" value={stats.applicationsByStatus[0].count} icon={CheckCircle} />
        <StatCard title="Resumes" value={stats.totalApplications} icon={FileText} />
      </div>

      {/* TABLES */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentJobs jobs={jobs} />
        <RecentApplicants applicants={applications} />
      </div>
    </div>
  )
}



// "use client";

// import { useEffect, useState } from "react";
// import api from "@/services/api";
// import { RecruiterStatsResponse } from "@/features/recruiter/types/recruiter";
// import StatusBarChart from "@/features/recruiter/dashboard/charts/StatusBarChart";
// import StatusPieChart from "@/features/recruiter/dashboard/charts/StatusPieChart";

// interface ChartData {
//   status: string;
//   count: number;
// }

// const RecruiterDashboardPage = () => {
//   const [stats, setStats] = useState<RecruiterStatsResponse | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         // const res = await axios.get<RecruiterStatsResponse>(
//         //   "/api/recruiter/stats"
//         // );
//         const res=await api.get('/recruiter/stats')
//         setStats(res.data);
//       } catch (error) {
//         console.error("Failed to load recruiter stats", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) return <p>Loading dashboard...</p>;
//   if (!stats) return <p>No data available</p>;

//   const chartData: ChartData[] = stats.applicationsByStatus.map((item) => ({
//     status: item._id,
//     count: item.count,
//   }));

//   return (
//     <div className="space-y-6">
//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <StatCard title="Total Jobs" value={stats.totalJobs} />
//         <StatCard title="Total Applications" value={stats.totalApplications} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <ChartCard title="Applications by Status">
//           <StatusBarChart data={chartData} />
//         </ChartCard>

//         <ChartCard title="Application Distribution">
//           <StatusPieChart data={chartData} />
//         </ChartCard>
//       </div>
//     </div>
//   );
// };

// export default RecruiterDashboardPage;

// /* ------------------ Reusable UI ------------------ */

// interface StatCardProps {
//   title: string;
//   value: number;
// }

// const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
//   <div className="border rounded-lg p-4">
//     <p className="text-sm text-gray-500">{title}</p>
//     <h2 className="text-3xl font-bold">{value}</h2>
//   </div>
// );

// interface ChartCardProps {
//   title: string;
//   children: React.ReactNode;
// }

// const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
//   <div className="border rounded-lg p-4">
//     <h3 className="mb-4 font-semibold">{title}</h3>
//     {children}
//   </div>
// );
