'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'

import { Briefcase, Users, CheckCircle, FileText } from 'lucide-react'
import StatCard from '@/features/recruiter/dashboard/StatCard'
import RecentJobs from '@/features/recruiter/dashboard/RecentJobs'
import RecentApplicants from '@/features/recruiter/dashboard/RecentApplicants'

export default function RecruiterDashboard() {
  const [stats, setStats] = useState<any>(null)
  console.log({ stats })
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const statsRes = await api.get('/recruiter/stats')
      // console.log({ statsRes })
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
        <StatCard title="Shortlisted"
          value={
            stats?.applicationsByStatus?.find(
              (item) => item.status === "Shortlisted" || "shortlisted"
            )?.count ?? 0          }

          icon={CheckCircle} />
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



