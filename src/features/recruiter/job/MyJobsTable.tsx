// 'use client'

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { Button } from '@/components/ui/button'
// import JobStatusBadge from './JobStatusBadge'
// import JobActions from './JobActions'
// import { toggleJobStatus } from '@/services/job.service'
// import { toast } from 'sonner'

// export default function MyJobsTable({
//   jobs,
//   refresh,
// }: {
//   jobs: any[]
//   refresh: () => void
// }) {
//   const toggleStatus = async (id: string) => {
//     await toggleJobStatus(id)
//     toast.success('Job status updated')
//     refresh()
//   }

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Title</TableHead>
//           <TableHead>Location</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Applicants</TableHead>
//           <TableHead>Action</TableHead>
//         </TableRow>
//       </TableHeader>

//       <TableBody>
//         {jobs.map(job => (
//           <TableRow key={job._id}>
//             <TableCell className="font-medium">
//               {job.title}
//             </TableCell>
//             <TableCell>{job.location}</TableCell>

//             <TableCell>
//               <JobStatusBadge status={job.status} />
//             </TableCell>

//             <TableCell>{job.applicantCount}</TableCell>

//             <TableCell className="flex gap-2">
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => toggleStatus(job._id)}
//               >
//                 {job.status === 'Active' ? 'Close' : 'Publish'}
//               </Button>

//               <JobActions
//                 jobId={job._id}
//                 onRefresh={refresh}
//               />
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }






// 'use client'

// import { useState } from 'react'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Separator } from '@/components/ui/separator'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from '@/components/ui/hover-card'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Progress } from '@/components/ui/progress'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Skeleton } from '@/components/ui/skeleton'
// import { toast } from 'sonner'
// import JobStatusBadge from './JobStatusBadge'
// import JobActions from './JobActions'
// import { toggleJobStatus } from '@/services/job.service'
// import {
//   Briefcase,
//   MapPin,
//   Users,
//   Clock,
//   Eye,
//   EyeOff,
//   Pencil,
//   Trash2,
//   Copy,
//   Share2,
//   BarChart3,
//   Filter,
//   Search,
//   MoreVertical,
//   ChevronRight,
//   Calendar,
//   DollarSign,
//   Building,
//   Download,
//   Star,
//   TrendingUp,
//   TrendingDown,
//   CheckCircle2,
//   XCircle,
//   AlertCircle
// } from 'lucide-react'
// import { cn } from '@/lib/utils'

// export default function MyJobsTable({
//   jobs,
//   refresh,
//   loading = false,
// }: {
//   jobs: any[]
//   refresh: () => void
//   loading?: boolean
// }) {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('all')
//   const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
//   const [selectedJob, setSelectedJob] = useState<any>(null)
//   const [stats, setStats] = useState({
//     totalViews: 1245,
//     totalApplicants: 89,
//     conversionRate: 7.1,
//   })

//   const toggleStatus = async (id: string) => {
//     const job = jobs.find(j => j._id === id)
//     const action = job?.status === 'Active' ? 'close' : 'publish'
    
//     toast.promise(
//       toggleJobStatus(id),
//       {
//         loading: `${action === 'close' ? 'Closing' : 'Publishing'} job...`,
//         success: () => {
//           refresh()
//           return `Job ${action === 'close' ? 'closed' : 'published'} successfully`
//         },
//         error: `Failed to ${action} job`,
//       }
//     )
//   }

//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = 
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.department?.toLowerCase().includes(searchTerm.toLowerCase())
    
//     const matchesStatus = 
//       statusFilter === 'all' || 
//       job.status.toLowerCase() === statusFilter.toLowerCase()
    
//     return matchesSearch && matchesStatus
//   })

//   const handleJobClick = (job: any) => {
//     setSelectedJob(job)
//   }

//   const getInitials = (title: string) => {
//     return title
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   const getDaysAgo = (dateString: string) => {
//     const date = new Date(dateString)
//     const now = new Date()
//     const diffTime = Math.abs(now.getTime() - date.getTime())
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//     return diffDays === 0 ? 'Today' : `${diffDays}d ago`
//   }

//   const QuickActions = ({ jobId }: { jobId: string }) => {
//     const job = jobs.find(j => j._id === jobId)
    
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="icon">
//             <MoreVertical className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-48">
//           <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={() => toggleStatus(jobId)}>
//             {job?.status === 'Active' ? (
//               <>
//                 <EyeOff className="h-4 w-4 mr-2" />
//                 Close Job
//               </>
//             ) : (
//               <>
//                 <Eye className="h-4 w-4 mr-2" />
//                 Publish Job
//               </>
//             )}
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => {
//             navigator.clipboard.writeText(`${window.location.origin}/jobs/${jobId}`)
//             toast.success('Link copied to clipboard')
//           }}>
//             <Copy className="h-4 w-4 mr-2" />
//             Copy Link
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => {
//             toast.info('Share feature coming soon!')
//           }}>
//             <Share2 className="h-4 w-4 mr-2" />
//             Share
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => {
//             toast.info('Analytics dashboard coming soon!')
//           }}>
//             <BarChart3 className="h-4 w-4 mr-2" />
//             View Analytics
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem className="text-red-600" onClick={() => {
//             toast.error('Delete feature coming soon!')
//           }}>
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     )
//   }

//   const JobCard = ({ job }: { job: any }) => (
//     <Card 
//       className={cn(
//         "hover:shadow-lg transition-all duration-300 cursor-pointer group",
//         "border-l-4",
//         job.status === 'Active' ? "border-l-green-500" : "border-l-gray-300"
//       )}
//       onClick={() => handleJobClick(job)}
//     >
//       <CardHeader className="pb-3">
//         <div className="flex justify-between items-start">
//           <div className="flex items-start gap-3">
//             <Avatar className="h-12 w-12 border">
//               <AvatarFallback className="bg-blue-100 text-blue-700">
//                 {getInitials(job.title)}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
//                 {job.title}
//               </CardTitle>
//               <CardDescription className="flex items-center gap-2 mt-1">
//                 <Building className="h-3 w-3" />
//                 {job.company || 'Your Company'}
//               </CardDescription>
//             </div>
//           </div>
//           <JobStatusBadge status={job.status} size="sm" />
//         </div>
//       </CardHeader>
      
//       <CardContent className="pt-0">
//         <div className="space-y-3">
//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-1 text-muted-foreground">
//                 <MapPin className="h-4 w-4" />
//                 <span>{job.location}</span>
//               </div>
//               <div className="flex items-center gap-1 text-muted-foreground">
//                 <DollarSign className="h-4 w-4" />
//                 <span>{job.salary || 'Not specified'}</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-1 text-muted-foreground">
//               <Clock className="h-4 w-4" />
//               <span>{getDaysAgo(job.createdAt)}</span>
//             </div>
//           </div>

//           <Separator />

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-1">
//               <p className="text-xs text-muted-foreground">Applicants</p>
//               <div className="flex items-center gap-2">
//                 <Users className="h-4 w-4 text-blue-600" />
//                 <span className="font-semibold">{job.applicantCount || 0}</span>
//                 {job.applicantCount > 0 && (
//                   <span className={cn(
//                     "text-xs px-2 py-0.5 rounded-full",
//                     job.applicantCount > 20 
//                       ? "bg-green-100 text-green-700" 
//                       : "bg-yellow-100 text-yellow-700"
//                   )}>
//                     {job.applicantCount > 20 ? 'High' : 'Low'} demand
//                   </span>
//                 )}
//               </div>
//             </div>
            
//             <div className="space-y-1">
//               <p className="text-xs text-muted-foreground">Views</p>
//               <div className="flex items-center gap-2">
//                 <Eye className="h-4 w-4 text-purple-600" />
//                 <span className="font-semibold">{job.viewCount || 0}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between items-center pt-2">
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button 
//                     variant={job.status === 'Active' ? "outline" : "default"} 
//                     size="sm"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       toggleStatus(job._id)
//                     }}
//                     className="gap-2"
//                   >
//                     {job.status === 'Active' ? (
//                       <>
//                         <EyeOff className="h-4 w-4" />
//                         Close
//                       </>
//                     ) : (
//                       <>
//                         <Eye className="h-4 w-4" />
//                         Publish
//                       </>
//                     )}
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   {job.status === 'Active' ? 'Close this job posting' : 'Publish this job'}
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <div className="flex items-center gap-1">
//               <QuickActions jobId={job._id} />
//               <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )

//   const LoadingSkeleton = () => (
//     <div className="space-y-4">
//       {[1, 2, 3].map((i) => (
//         <Card key={i}>
//           <CardContent className="pt-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <Skeleton className="h-12 w-12 rounded-full" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-[250px]" />
//                   <Skeleton className="h-3 w-[200px]" />
//                 </div>
//               </div>
//               <Skeleton className="h-6 w-20" />
//             </div>
//             <div className="mt-6 grid grid-cols-2 gap-4">
//               <Skeleton className="h-4 w-full" />
//               <Skeleton className="h-4 w-full" />
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )

//   if (loading) {
//     return <LoadingSkeleton />
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with Stats and Controls */}
//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <CardTitle className="text-2xl">My Job Listings</CardTitle>
//               <CardDescription>
//                 Manage and track all your job postings
//               </CardDescription>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant={viewMode === 'table' ? 'default' : 'outline'}
//                   size="sm"
//                   onClick={() => setViewMode('table')}
//                   className="gap-2"
//                 >
//                   <div className="h-4 w-4 grid grid-cols-2 gap-0.5">
//                     {[...Array(4)].map((_, i) => (
//                       <div key={i} className="bg-current rounded-sm" />
//                     ))}
//                   </div>
//                   Table
//                 </Button>
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'outline'}
//                   size="sm"
//                   onClick={() => setViewMode('grid')}
//                   className="gap-2"
//                 >
//                   <div className="h-4 w-4 grid grid-cols-3 gap-0.5">
//                     {[...Array(9)].map((_, i) => (
//                       <div key={i} className="bg-current rounded-sm" />
//                     ))}
//                   </div>
//                   Grid
//                 </Button>
//               </div>
              
//               <Button variant="outline" size="sm" className="gap-2">
//                 <Download className="h-4 w-4" />
//                 Export
//               </Button>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent>
//           {/* Stats Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-blue-700">Active Jobs</p>
//                     <p className="text-3xl font-bold text-blue-900">
//                       {jobs.filter(j => j.status === 'Active').length}
//                     </p>
//                   </div>
//                   <Briefcase className="h-8 w-8 text-blue-600" />
//                 </div>
//               </CardContent>
//             </Card>
            
//             <Card className="bg-gradient-to-r from-green-50 to-green-100">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-green-700">Total Applicants</p>
//                     <p className="text-3xl font-bold text-green-900">
//                       {jobs.reduce((sum, job) => sum + (job.applicantCount || 0), 0)}
//                     </p>
//                   </div>
//                   <Users className="h-8 w-8 text-green-600" />
//                 </div>
//               </CardContent>
//             </Card>
            
//             <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-purple-700">Conversion Rate</p>
//                     <p className="text-3xl font-bold text-purple-900">
//                       {stats.conversionRate}%
//                     </p>
//                   </div>
//                   <TrendingUp className="h-8 w-8 text-purple-600" />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Filters and Search */}
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search jobs by title, location, or department..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
            
//             <div className="flex gap-2">
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-[180px]">
//                   <Filter className="h-4 w-4 mr-2" />
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="active">Active</SelectItem>
//                   <SelectItem value="closed">Closed</SelectItem>
//                   <SelectItem value="draft">Draft</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Button variant="outline" size="icon">
//                 <MoreVertical className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Results Count */}
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-muted-foreground">
//           Showing {filteredJobs.length} of {jobs.length} jobs
//         </p>
//         {searchTerm && (
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setSearchTerm('')}
//             className="text-red-600 hover:text-red-700"
//           >
//             Clear search
//           </Button>
//         )}
//       </div>

//       {/* Table View */}
//       {viewMode === 'table' ? (
//         <Card>
//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[300px]">
//                     <div className="flex items-center gap-2">
//                       <Briefcase className="h-4 w-4" />
//                       Job Title
//                     </div>
//                   </TableHead>
//                   <TableHead>
//                     <div className="flex items-center gap-2">
//                       <MapPin className="h-4 w-4" />
//                       Location
//                     </div>
//                   </TableHead>
//                   <TableHead>
//                     <div className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       Posted
//                     </div>
//                   </TableHead>
//                   <TableHead>
//                     <div className="flex items-center gap-2">
//                       <Users className="h-4 w-4" />
//                       Applicants
//                     </div>
//                   </TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredJobs.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center py-12">
//                       <div className="flex flex-col items-center justify-center gap-3">
//                         <Briefcase className="h-12 w-12 text-gray-300" />
//                         <p className="text-lg font-medium text-gray-600">No jobs found</p>
//                         <p className="text-sm text-gray-500">
//                           {searchTerm ? 'Try a different search term' : 'Create your first job posting'}
//                         </p>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredJobs.map((job) => (
//                     <HoverCard key={job._id}>
//                       <HoverCardTrigger asChild>
//                         <TableRow className="group hover:bg-blue-50/50 cursor-pointer">
//                           <TableCell>
//                             <div className="flex items-center gap-3">
//                               <Avatar className="h-8 w-8 border">
//                                 <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
//                                   {getInitials(job.title)}
//                                 </AvatarFallback>
//                               </Avatar>
//                               <div>
//                                 <p className="font-medium group-hover:text-blue-600 transition-colors">
//                                   {job.title}
//                                 </p>
//                                 <p className="text-sm text-muted-foreground">
//                                   {job.department || 'General'}
//                                 </p>
//                               </div>
//                             </div>
//                           </TableCell>
//                           <TableCell>
//                             <div className="flex items-center gap-2">
//                               <MapPin className="h-4 w-4 text-muted-foreground" />
//                               {job.location}
//                             </div>
//                           </TableCell>
//                           <TableCell>
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger>
//                                   <span className="text-sm">
//                                     {getDaysAgo(job.createdAt)}
//                                   </span>
//                                 </TooltipTrigger>
//                                 <TooltipContent>
//                                   {new Date(job.createdAt).toLocaleDateString()}
//                                 </TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                           </TableCell>
//                           <TableCell>
//                             <div className="flex items-center gap-3">
//                               <Badge variant="outline" className="gap-1">
//                                 <Users className="h-3 w-3" />
//                                 {job.applicantCount || 0}
//                               </Badge>
//                               {job.applicantCount > 0 && (
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   className="h-6 px-2 text-xs"
//                                   onClick={(e) => {
//                                     e.stopPropagation()
//                                     toast.info('Applicant list coming soon!')
//                                   }}
//                                 >
//                                   View
//                                 </Button>
//                               )}
//                             </div>
//                           </TableCell>
//                           <TableCell>
//                             <JobStatusBadge status={job.status} />
//                           </TableCell>
//                           <TableCell className="text-right">
//                             <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                               <TooltipProvider>
//                                 <Tooltip>
//                                   <TooltipTrigger asChild>
//                                     <Button
//                                       variant="ghost"
//                                       size="icon"
//                                       onClick={(e) => {
//                                         e.stopPropagation()
//                                         toggleStatus(job._id)
//                                       }}
//                                     >
//                                       {job.status === 'Active' ? (
//                                         <EyeOff className="h-4 w-4" />
//                                       ) : (
//                                         <Eye className="h-4 w-4" />
//                                       )}
//                                     </Button>
//                                   </TooltipTrigger>
//                                   <TooltipContent>
//                                     {job.status === 'Active' ? 'Close job' : 'Publish job'}
//                                   </TooltipContent>
//                                 </Tooltip>
//                               </TooltipProvider>

//                               <QuickActions jobId={job._id} />
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       </HoverCardTrigger>
//                       <HoverCardContent className="w-80" align="start">
//                         <div className="space-y-3">
//                           <div className="flex items-start justify-between">
//                             <div>
//                               <h4 className="font-semibold">{job.title}</h4>
//                               <p className="text-sm text-muted-foreground">
//                                 {job.company || 'Your Company'} • {job.location}
//                               </p>
//                             </div>
//                             <JobStatusBadge status={job.status} />
//                           </div>
                          
//                           <div className="grid grid-cols-2 gap-3">
//                             <div>
//                               <p className="text-xs text-muted-foreground">Salary</p>
//                               <p className="text-sm font-medium">
//                                 {job.salary || 'Not specified'}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-xs text-muted-foreground">Type</p>
//                               <p className="text-sm font-medium">
//                                 {job.jobType || 'Full-time'}
//                               </p>
//                             </div>
//                           </div>

//                           <Separator />

//                           <div className="flex items-center justify-between">
//                             <Button size="sm" variant="outline" className="gap-2">
//                               <Pencil className="h-3 w-3" />
//                               Edit
//                             </Button>
//                             <Button size="sm" variant="outline" className="gap-2">
//                               <BarChart3 className="h-3 w-3" />
//                               Analytics
//                             </Button>
//                             <Button size="sm" className="gap-2">
//                               View Details
//                             </Button>
//                           </div>
//                         </div>
//                       </HoverCardContent>
//                     </HoverCard>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       ) : (
//         /* Grid View */
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredJobs.length === 0 ? (
//             <div className="col-span-full">
//               <Card className="border-dashed">
//                 <CardContent className="pt-12 pb-12 text-center">
//                   <Briefcase className="h-16 w-16 mx-auto text-gray-300 mb-4" />
//                   <h3 className="text-lg font-semibold text-gray-600 mb-2">
//                     No jobs found
//                   </h3>
//                   <p className="text-gray-500 mb-6">
//                     {searchTerm 
//                       ? 'Try adjusting your search terms'
//                       : 'Get started by creating your first job posting'
//                     }
//                   </p>
//                   <Button>
//                     <Briefcase className="h-4 w-4 mr-2" />
//                     Create New Job
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           ) : (
//             filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
//           )}
//         </div>
//       )}

//       {/* Job Details Dialog */}
//       <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           {selectedJob && (
//             <>
//               <DialogHeader>
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <DialogTitle className="text-2xl flex items-center gap-3">
//                       <Avatar className="h-10 w-10">
//                         <AvatarFallback className="bg-blue-100 text-blue-700">
//                           {getInitials(selectedJob.title)}
//                         </AvatarFallback>
//                       </Avatar>
//                       {selectedJob.title}
//                     </DialogTitle>
//                     <DialogDescription className="flex items-center gap-3 mt-2">
//                       <span className="flex items-center gap-1">
//                         <Building className="h-4 w-4" />
//                         {selectedJob.company || 'Your Company'}
//                       </span>
//                       •
//                       <span className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4" />
//                         {selectedJob.location}
//                       </span>
//                     </DialogDescription>
//                   </div>
//                   <JobStatusBadge status={selectedJob.status} />
//                 </div>
//               </DialogHeader>

//               <Tabs defaultValue="overview" className="w-full">
//                 <TabsList className="grid grid-cols-4">
//                   <TabsTrigger value="overview">Overview</TabsTrigger>
//                   <TabsTrigger value="applicants">Applicants</TabsTrigger>
//                   <TabsTrigger value="analytics">Analytics</TabsTrigger>
//                   <TabsTrigger value="settings">Settings</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="overview" className="space-y-4">
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <Card>
//                       <CardContent className="pt-6">
//                         <div className="text-center">
//                           <p className="text-2xl font-bold">{selectedJob.applicantCount || 0}</p>
//                           <p className="text-sm text-muted-foreground">Total Applicants</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                     <Card>
//                       <CardContent className="pt-6">
//                         <div className="text-center">
//                           <p className="text-2xl font-bold">{selectedJob.viewCount || 0}</p>
//                           <p className="text-sm text-muted-foreground">Total Views</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                     <Card>
//                       <CardContent className="pt-6">
//                         <div className="text-center">
//                           <p className="text-2xl font-bold">
//                             {selectedJob.applicantCount && selectedJob.viewCount 
//                               ? ((selectedJob.applicantCount / selectedJob.viewCount) * 100).toFixed(1)
//                               : '0'
//                             }%
//                           </p>
//                           <p className="text-sm text-muted-foreground">Conversion Rate</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                     <Card>
//                       <CardContent className="pt-6">
//                         <div className="text-center">
//                           <p className="text-2xl font-bold">
//                             {getDaysAgo(selectedJob.createdAt)}
//                           </p>
//                           <p className="text-sm text-muted-foreground">Days Active</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="applicants">
//                   <Card>
//                     <CardContent className="pt-6">
//                       <p>Applicant management coming soon...</p>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 <TabsContent value="analytics">
//                   <Card>
//                     <CardContent className="pt-6">
//                       <p>Analytics dashboard coming soon...</p>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 <TabsContent value="settings">
//                   <Card>
//                     <CardContent className="pt-6 space-y-4">
//                       <div className="space-y-2">
//                         <Label>Job Status</Label>
//                         <div className="flex items-center gap-4">
//                           <Button
//                             variant={selectedJob.status === 'Active' ? 'default' : 'outline'}
//                             onClick={() => toggleStatus(selectedJob._id)}
//                             className="gap-2"
//                           >
//                             {selectedJob.status === 'Active' ? (
//                               <>
//                                 <EyeOff className="h-4 w-4" />
//                                 Close Job
//                               </>
//                             ) : (
//                               <>
//                                 <Eye className="h-4 w-4" />
//                                 Publish Job
//                               </>
//                             )}
//                           </Button>
//                           <Button variant="outline" className="gap-2">
//                             <Pencil className="h-4 w-4" />
//                             Edit Job
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>

//               <DialogFooter className="gap-2">
//                 <Button variant="outline" onClick={() => setSelectedJob(null)}>
//                   Close
//                 </Button>
//                 <Button onClick={() => {
//                   toast.success('Job details updated')
//                   setSelectedJob(null)
//                 }}>
//                   Save Changes
//                 </Button>
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }







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





