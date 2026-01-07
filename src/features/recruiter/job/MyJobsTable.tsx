'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { toggleJobStatus } from '@/services/job.service'
import {
  Briefcase,
  MapPin,
  Users,
  Filter,
  Search,
  Eye,
  EyeOff,
  MoreVertical,
  ChevronRight,
  Calendar,
  Building,
  Download
} from 'lucide-react'

// Import the components - Make sure these paths are correct
import JobStatusBadge from '@/features/recruiter/job/JobStatusBadge'
import JobActions from '@/features/recruiter/job/JobActions'

export default function MyJobsTable({
  jobs,
  refresh,
}: {
  jobs: any[]
  refresh: () => void
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const toggleStatus = async (id: string) => {
    try {
      await toggleJobStatus(id)
      toast.success('Job status updated successfully')
      refresh()
    } catch (error) {
      toast.error('Failed to update job status')
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      statusFilter === 'all' || 
      job.status?.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Header with Filters */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>My Job Listings</CardTitle>
              <CardDescription>
                Manage and track all your job postings
              </CardDescription>
            </div>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm('')}
            className="text-red-600 hover:text-red-700"
          >
            Clear search
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Job Title
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Posted
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Applicants
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Briefcase className="h-12 w-12 text-gray-300" />
                    <p className="text-lg font-medium text-gray-600">No jobs found</p>
                    <p className="text-sm text-gray-500">
                      {searchTerm ? 'Try a different search term' : 'Create your first job posting'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold">
                        {job.title?.charAt(0) || 'J'}
                      </div>
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {job.department || 'General'}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {job.location}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">
                      {job.createdAt 
                        ? new Date(job.createdAt).toLocaleDateString()
                        : 'N/A'
                      }
                    </span>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      {job.applicantCount || 0}
                    </Badge>
                  </TableCell>
                  
                  {/* Status Column - Now using JobStatusBadge */}
                  <TableCell>
                    <JobStatusBadge status={job.status || 'Draft'} />
                  </TableCell>
                  
                  {/* Actions Column */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleStatus(job._id)}
                        className="gap-2"
                      >
                        {job.status === 'Active' ? (
                          <>
                            <EyeOff className="h-4 w-4" />
                            Close
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            Publish
                          </>
                        )}
                      </Button>
                      
                      <JobActions
                        jobId={job._id}
                        jobTitle={job.title}
                        onRefresh={refresh}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}





