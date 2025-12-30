// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Label } from '@/components/ui/label'
// import { Badge } from '@/components/ui/badge'
// import { X, Plus } from 'lucide-react'
// import { toast } from 'sonner'

// export default function PostJobPage() {
//   const [loading, setLoading] = useState(false)
//   const [skillInput, setSkillInput] = useState('')
//   const [skills, setSkills] = useState<string[]>([])

//   const addSkill = () => {
//     if (skillInput && !skills.includes(skillInput)) {
//       setSkills([...skills, skillInput])
//       setSkillInput('')
//     }
//   }

//   const removeSkill = (skill: string) => {
//     setSkills(skills.filter(s => s !== skill))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     // 🔌 API call later
//     setTimeout(() => {
//       toast.success('Job posted successfully 🎉')
//       setLoading(false)
//     }, 1200)
//   }

//   return (
//     <div className="mx-auto max-w-5xl p-6">
//       <h1 className="mb-6 text-3xl font-bold">Post a Job</h1>

//       <form onSubmit={handleSubmit}>
//         <Card>
//           <CardHeader>
//             <CardTitle>Job Details</CardTitle>
//           </CardHeader>

//           <CardContent className="grid gap-6 md:grid-cols-2">
//             {/* Job Title */}
//             <div>
//               <Label>Job Title</Label>
//               <Input placeholder="Frontend Developer" required />
//             </div>

//             {/* Location */}
//             <div>
//               <Label>Location</Label>
//               <Input placeholder="Remote / Bangalore / Delhi" />
//             </div>

//             {/* Job Type */}
//             <div>
//               <Label>Job Type</Label>
//               <Input placeholder="Full-time / Part-time / Internship" />
//             </div>

//             {/* Experience */}
//             <div>
//               <Label>Experience (Years)</Label>
//               <Input type="number" placeholder="2 - 5" />
//             </div>

//             {/* Salary */}
//             <div>
//               <Label>Salary Range</Label>
//               <Input placeholder="₹5L – ₹10L" />
//             </div>

//             {/* Skills */}
//             <div className="md:col-span-2">
//               <Label>Required Skills</Label>

//               <div className="mt-2 flex gap-2">
//                 <Input
//                   placeholder="Add skill (React, Node...)"
//                   value={skillInput}
//                   onChange={e => setSkillInput(e.target.value)}
//                 />
//                 <Button type="button" onClick={addSkill}>
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>

//               <div className="mt-3 flex flex-wrap gap-2">
//                 {skills.map(skill => (
//                   <Badge key={skill} variant="secondary">
//                     {skill}
//                     <X
//                       className="ml-1 h-3 w-3 cursor-pointer"
//                       onClick={() => removeSkill(skill)}
//                     />
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="md:col-span-2">
//               <Label>Job Description</Label>
//               <Textarea
//                 rows={6}
//                 placeholder="Describe responsibilities, requirements, benefits..."
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Footer */}
//         <div className="mt-6 flex justify-end gap-4">
//           <Button variant="outline" type="reset">
//             Cancel
//           </Button>
//           <Button disabled={loading}>
//             {loading ? 'Posting...' : 'Post Job'}
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }





// 'use client'

// import { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Slider } from '@/components/ui/slider'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { toast } from 'sonner'
// import JobPreview from '@/components/job/JobPreview'
// import { createJob } from '@/services/job.service'
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// export default function PostJobPage() {
//   const [mounted, setMounted] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [preview, setPreview] = useState(false)

//   const [job, setJob] = useState({
//     title: '',
//     location: '',
//     jobType: '',
//     salary: '',
//     experience: 1,
//     expiryDate: '',
//     description: '',
//   })

//   // ✅ Fix SSR hydration
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: '',
//     immediatelyRender: false, // 🔥 REQUIRED
//     onUpdate: ({ editor }) => {
//       setJob(prev => ({
//         ...prev,
//         description: editor.getHTML(),
//       }))
//     },
//   })

//   if (!mounted || !editor) return null

//   const submitJob = async () => {
//     setLoading(true)
//     try {
//       await createJob(job)
//       toast.success('Job posted successfully 🎉')
//     } catch (error) {
//       toast.error('Failed to post job')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
//       {/* FORM */}
//       <div className="space-y-6 lg:col-span-2">
//         <h1 className="text-3xl font-bold">Post a Job</h1>

//         <Card>
//           <CardHeader>
//             <CardTitle>Job Information</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {/* Job Title */}
//             <div>
//               <Label>Job Title</Label>
//               <Input
//                 value={job.title}
//                 onChange={e =>
//                   setJob({ ...job, title: e.target.value })
//                 }
//               />
//             </div>

//             {/* Location */}
//             <div>
//               <Label>Location</Label>
//               <Input
//                 value={job.location}
//                 onChange={e =>
//                   setJob({ ...job, location: e.target.value })
//                 }
//               />
//             </div>

//             {/* Job Type */}
//             <div>
//               <Label>Job Type</Label>
//               <Select
//                 value={job.jobType}
//                 onValueChange={val =>
//                   setJob({ ...job, jobType: val })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select job type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Full-time">
//                     Full-time
//                   </SelectItem>
//                   <SelectItem value="Part-time">
//                     Part-time
//                   </SelectItem>
//                   <SelectItem value="Internship">
//                     Internship
//                   </SelectItem>
//                   <SelectItem value="Contract">
//                     Contract
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Experience */}
//             <div>
//               <Label>Experience (Years)</Label>
//               <Slider
//                 value={[job.experience]}
//                 max={15}
//                 step={1}
//                 onValueChange={([val]) =>
//                   setJob({ ...job, experience: val })
//                 }
//               />
//               <p className="mt-1 text-sm text-muted-foreground">
//                 {job.experience}+ years
//               </p>
//             </div>

//             {/* Salary */}
//             <div>
//               <Label>Salary</Label>
//               <Input
//                 value={job.salary}
//                 onChange={e =>
//                   setJob({ ...job, salary: e.target.value })
//                 }
//                 placeholder="₹5L – ₹10L"
//               />
//             </div>

//             {/* Expiry */}
//             <div>
//               <Label>Job Expiry Date</Label>
//               <Input
//                 type="date"
//                 value={job.expiryDate}
//                 onChange={e =>
//                   setJob({
//                     ...job,
//                     expiryDate: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <Label>Description</Label>
//               <div className="rounded-md border p-2 min-h-[150px]">
//                 <EditorContent editor={editor} />
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-end gap-3">
//               <Button
//                 variant="outline"
//                 onClick={() => setPreview(!preview)}
//               >
//                 {preview ? 'Hide Preview' : 'Preview'}
//               </Button>
//               <Button onClick={submitJob} disabled={loading}>
//                 {loading ? 'Posting...' : 'Post Job'}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* PREVIEW */}
//       {preview && <JobPreview job={job} />}
//     </div>
//   )
// }





'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import JobPreview from '@/components/job/JobPreview'
import { createJob } from '@/services/job.service'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { 
  Calendar,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  X,
  Download,
  Upload
} from 'lucide-react'
import { cn } from '@/lib/utils'

const jobTypes = [
  { value: 'Full-time', label: 'Full-time', icon: Briefcase },
  { value: 'Part-time', label: 'Part-time', icon: Clock },
  { value: 'Internship', label: 'Internship', icon: Briefcase },
  { value: 'Contract', label: 'Contract', icon: DollarSign },
  { value: 'Remote', label: 'Remote', icon: MapPin },
  { value: 'Hybrid', label: 'Hybrid', icon: MapPin },
]

const experienceLevels = [
  { label: 'Entry Level', value: 0, description: '0-2 years' },
  { label: 'Mid Level', value: 3, description: '3-5 years' },
  { label: 'Senior Level', value: 6, description: '6-8 years' },
  { label: 'Lead', value: 9, description: '9+ years' },
]

export default function PostJobPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false)
  const [activeTab, setActiveTab] = useState('details')
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [requirements, setRequirements] = useState<string[]>([''])
  const [benefits, setBenefits] = useState<string[]>([''])
  const [applicationLink, setApplicationLink] = useState('')
  const [isRemote, setIsRemote] = useState(false)
  const [urgentHiring, setUrgentHiring] = useState(false)

  const [job, setJob] = useState({
    title: '',
    location: '',
    jobType: '',
    salary: '',
    salaryCurrency: 'INR',
    salaryPeriod: 'year',
    experience: 1,
    expiryDate: '',
    description: '',
    companyName: '',
    department: '',
    vacancies: 1,
    skills: [] as string[],
    education: '',
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields = [
      'title',
      'location',
      'jobType',
      'salary',
      'description',
      'expiryDate'
    ]
    const filledFields = requiredFields.filter(field => {
      const value = job[field as keyof typeof job]
      return value && value.toString().trim().length > 0
    }).length
    const progress = (filledFields / requiredFields.length) * 100
    setFormProgress(progress)
  }, [job])

  // ✅ Fix SSR hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Write a detailed job description including responsibilities, requirements, and qualifications...',
      })
    ],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setJob(prev => ({
        ...prev,
        description: editor.getHTML(),
      }))
    },
  })

  if (!mounted || !editor) return null

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!job.title.trim()) errors.title = 'Job title is required'
    if (!job.location.trim() && !isRemote) errors.location = 'Location is required for non-remote jobs'
    if (!job.jobType) errors.jobType = 'Job type is required'
    if (!job.salary.trim()) errors.salary = 'Salary information is required'
    if (!job.description.trim() || job.description === '<p></p>') errors.description = 'Description is required'
    if (!job.expiryDate) errors.expiryDate = 'Expiry date is required'
    
    // Date validation
    if (job.expiryDate) {
      const expiryDate = new Date(job.expiryDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (expiryDate <= today) {
        errors.expiryDate = 'Expiry date must be in the future'
      }
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submitJob = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        icon: <AlertCircle className="h-4 w-4" />
      })
      return
    }

    setLoading(true)
    try {
      const jobData = {
        ...job,
        requirements: requirements.filter(r => r.trim()),
        benefits: benefits.filter(b => b.trim()),
        applicationLink: applicationLink || null,
        isRemote,
        urgentHiring,
        postedDate: new Date().toISOString().split('T')[0],
      }
      
      await createJob(jobData)
      toast.success('Job posted successfully 🎉', {
        description: 'Your job listing is now live and visible to candidates.',
        duration: 5000,
        action: {
          label: 'View Job',
          onClick: () => console.log('Navigate to job listing')
        }
      })
      
      // Reset form
      setJob({
        title: '',
        location: '',
        jobType: '',
        salary: '',
        salaryCurrency: 'INR',
        salaryPeriod: 'year',
        experience: 1,
        expiryDate: '',
        description: '',
        companyName: '',
        department: '',
        vacancies: 1,
        skills: [],
        education: '',
      })
      setRequirements([''])
      setBenefits([''])
      setApplicationLink('')
      setIsRemote(false)
      setUrgentHiring(false)
      editor?.commands.clearContent()
      
    } catch (error) {
      toast.error('Failed to post job', {
        description: 'Please try again or contact support if the problem persists.',
        icon: <AlertCircle className="h-4 w-4" />
      })
    } finally {
      setLoading(false)
    }
  }

  const addRequirement = () => {
    setRequirements([...requirements, ''])
  }

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements]
    newRequirements[index] = value
    setRequirements(newRequirements)
  }

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      const newRequirements = requirements.filter((_, i) => i !== index)
      setRequirements(newRequirements)
    }
  }

  const addBenefit = () => {
    setBenefits([...benefits, ''])
  }

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits]
    newBenefits[index] = value
    setBenefits(newBenefits)
  }

  const removeBenefit = (index: number) => {
    if (benefits.length > 1) {
      const newBenefits = benefits.filter((_, i) => i !== index)
      setBenefits(newBenefits)
    }
  }

  const loadTemplate = (template: string) => {
    const templates: Record<string, Partial<typeof job>> = {
      'software-engineer': {
        title: 'Senior Software Engineer',
        jobType: 'Full-time',
        location: 'Bangalore, India',
        salary: '₹20L – ₹35L',
        experience: 5,
        description: '<p>We are looking for a skilled Senior Software Engineer to join our team...</p>',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        education: 'Bachelor\'s degree in Computer Science or related field'
      },
      'marketing-manager': {
        title: 'Marketing Manager',
        jobType: 'Full-time',
        location: 'Remote',
        salary: '₹15L – ₹25L',
        experience: 4,
        description: '<p>Seeking an experienced Marketing Manager to lead our marketing efforts...</p>',
        skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
        education: 'Bachelor\'s degree in Marketing or related field'
      }
    }
    
    const selectedTemplate = templates[template]
    if (selectedTemplate) {
      setJob(prev => ({ ...prev, ...selectedTemplate }))
      if (selectedTemplate.description) {
        editor?.commands.setContent(selectedTemplate.description)
      }
      setIsTemplateDialogOpen(false)
      toast.info('Template loaded successfully')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Post a Job Opening</h1>
              <p className="mt-2 text-gray-600">
                Fill in the details below to create your job listing. Preview your posting before publishing.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setIsTemplateDialogOpen(true)}
            >
              <Download className="h-4 w-4" />
              Load Template
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Form Completion: {Math.round(formProgress)}%
              </span>
              <Badge variant={formProgress === 100 ? "default" : "outline"}>
                {formProgress === 100 ? 'Ready to Post' : 'In Progress'}
              </Badge>
            </div>
            <Progress value={formProgress} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* FORM */}
          <div className="space-y-6 lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="details" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  Job Details
                </TabsTrigger>
                <TabsTrigger value="requirements" className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Requirements
                </TabsTrigger>
                <TabsTrigger value="additional" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Additional Info
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Basic Information
                    </CardTitle>
                    <CardDescription>
                      Provide essential details about the job position
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {/* Job Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="flex items-center gap-2">
                        Job Title *
                        {validationErrors.title && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </Label>
                      <Input
                        id="title"
                        value={job.title}
                        onChange={e => setJob({ ...job, title: e.target.value })}
                        placeholder="e.g., Senior Frontend Developer"
                        className={cn(
                          validationErrors.title && "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {validationErrors.title && (
                        <p className="text-sm text-red-500">{validationErrors.title}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Location with Remote Option */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="location" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Location *
                          </Label>
                          <Input
                            id="location"
                            value={job.location}
                            onChange={e => setJob({ ...job, location: e.target.value })}
                            placeholder="e.g., New York, NY"
                            disabled={isRemote}
                            className={cn(
                              validationErrors.location && "border-red-500 focus-visible:ring-red-500",
                              isRemote && "opacity-50"
                            )}
                          />
                          {validationErrors.location && (
                            <p className="text-sm text-red-500">{validationErrors.location}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="remote"
                            checked={isRemote}
                            onCheckedChange={setIsRemote}
                          />
                          <Label htmlFor="remote">This is a remote position</Label>
                        </div>
                      </div>

                      {/* Job Type */}
                      <div className="space-y-2">
                        <Label htmlFor="jobType" className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Job Type *
                        </Label>
                        <Select
                          value={job.jobType}
                          onValueChange={val => setJob({ ...job, jobType: val })}
                        >
                          <SelectTrigger className={cn(
                            validationErrors.jobType && "border-red-500 focus-visible:ring-red-500"
                          )}>
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            {jobTypes.map((type) => {
                              const Icon = type.icon
                              return (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    {type.label}
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        {validationErrors.jobType && (
                          <p className="text-sm text-red-500">{validationErrors.jobType}</p>
                        )}
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Salary Information *
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          value={job.salary}
                          onChange={e => setJob({ ...job, salary: e.target.value })}
                          placeholder="e.g., 80000 or 80,000 - 120,000"
                          className={cn(
                            validationErrors.salary && "border-red-500 focus-visible:ring-red-500"
                          )}
                        />
                        <Select
                          value={job.salaryCurrency}
                          onValueChange={val => setJob({ ...job, salaryCurrency: val })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">₹ INR</SelectItem>
                            <SelectItem value="USD">$ USD</SelectItem>
                            <SelectItem value="EUR">€ EUR</SelectItem>
                            <SelectItem value="GBP">£ GBP</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={job.salaryPeriod}
                          onValueChange={val => setJob({ ...job, salaryPeriod: val })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="year">Per Year</SelectItem>
                            <SelectItem value="month">Per Month</SelectItem>
                            <SelectItem value="hour">Per Hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {validationErrors.salary && (
                        <p className="text-sm text-red-500">{validationErrors.salary}</p>
                      )}
                    </div>

                    {/* Experience & Vacancies */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Label>Experience Required</Label>
                        <Slider
                          value={[job.experience]}
                          max={15}
                          step={1}
                          onValueChange={([val]) => setJob({ ...job, experience: val })}
                          className="py-4"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          {experienceLevels.map((level) => (
                            <div
                              key={level.value}
                              className={cn(
                                "text-center cursor-pointer",
                                job.experience >= level.value && "text-blue-600 font-medium"
                              )}
                              onClick={() => setJob({ ...job, experience: level.value })}
                            >
                              <div>{level.label}</div>
                              <div className="text-xs">{level.description}</div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-2 text-sm font-medium">
                          {job.experience}+ years of experience required
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Number of Vacancies</Label>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setJob({ ...job, vacancies: Math.max(1, job.vacancies - 1) })}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={job.vacancies}
                            onChange={e => setJob({ ...job, vacancies: parseInt(e.target.value) || 1 })}
                            className="text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setJob({ ...job, vacancies: job.vacancies + 1 })}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expiry Date */}
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Application Deadline *
                      </Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="expiryDate"
                          type="date"
                          value={job.expiryDate}
                          onChange={e => setJob({ ...job, expiryDate: e.target.value })}
                          className={cn(
                            "max-w-xs",
                            validationErrors.expiryDate && "border-red-500 focus-visible:ring-red-500"
                          )}
                        />
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="urgent"
                            checked={urgentHiring}
                            onCheckedChange={setUrgentHiring}
                          />
                          <Label htmlFor="urgent" className="text-orange-600 font-medium">
                            Urgent Hiring
                          </Label>
                        </div>
                      </div>
                      {validationErrors.expiryDate && (
                        <p className="text-sm text-red-500">{validationErrors.expiryDate}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Requirements & Description</CardTitle>
                    <CardDescription>
                      Detail the skills, qualifications, and responsibilities for this position
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Skills */}
                    <div className="space-y-3">
                      <Label>Required Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="gap-1">
                            {skill}
                            <button
                              onClick={() => {
                                const newSkills = [...job.skills]
                                newSkills.splice(index, 1)
                                setJob({ ...job, skills: newSkills })
                              }}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill (press Enter)"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              e.preventDefault()
                              setJob({
                                ...job,
                                skills: [...job.skills, e.currentTarget.value.trim()]
                              })
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const input = document.querySelector('input[placeholder="Add a skill"]') as HTMLInputElement
                            if (input?.value.trim()) {
                              setJob({
                                ...job,
                                skills: [...job.skills, input.value.trim()]
                              })
                              input.value = ''
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="space-y-2">
                      <Label>Education Requirements</Label>
                      <Textarea
                        value={job.education}
                        onChange={e => setJob({ ...job, education: e.target.value })}
                        placeholder="e.g., Bachelor's degree in Computer Science or equivalent experience"
                        rows={2}
                      />
                    </div>

                    {/* Description Editor */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        Job Description *
                        {validationErrors.description && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </Label>
                      <div className={cn(
                        "rounded-lg border p-4 min-h-[200px]",
                        validationErrors.description && "border-red-500"
                      )}>
                        <EditorContent editor={editor} />
                      </div>
                      {validationErrors.description && (
                        <p className="text-sm text-red-500">{validationErrors.description}</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Tip: Include responsibilities, day-to-day tasks, and what success looks like in this role.
                      </p>
                    </div>

                    {/* Requirements List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Key Requirements</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={addRequirement}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Requirement
                        </Button>
                      </div>
                      {requirements.map((req, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <Input
                            value={req}
                            onChange={e => updateRequirement(index, e.target.value)}
                            placeholder="e.g., 3+ years of experience with React"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeRequirement(index)}
                            disabled={requirements.length === 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="additional" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>
                      Provide extra details to make your job posting stand out
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Benefits */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Benefits & Perks</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={addBenefit}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Benefit
                        </Button>
                      </div>
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                          <Input
                            value={benefit}
                            onChange={e => updateBenefit(index, e.target.value)}
                            placeholder="e.g., Health insurance, Remote work options"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeBenefit(index)}
                            disabled={benefits.length === 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Company Info */}
                    <div className="space-y-4">
                      <Label>Company Information (Optional)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company Name</Label>
                          <Input
                            value={job.companyName}
                            onChange={e => setJob({ ...job, companyName: e.target.value })}
                            placeholder="Your company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Department</Label>
                          <Input
                            value={job.department}
                            onChange={e => setJob({ ...job, department: e.target.value })}
                            placeholder="e.g., Engineering, Marketing"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Application Link */}
                    <div className="space-y-2">
                      <Label>Custom Application Link (Optional)</Label>
                      <Input
                        value={applicationLink}
                        onChange={e => setApplicationLink(e.target.value)}
                        placeholder="https://yourcompany.com/apply"
                        type="url"
                      />
                      <p className="text-sm text-muted-foreground">
                        If left empty, candidates will apply through our platform
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="sticky bottom-6 bg-white/80 backdrop-blur-sm rounded-lg border p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPreview(!preview)}
                    className="gap-2"
                  >
                    {preview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {preview ? 'Hide Preview' : 'Live Preview'}
                  </Button>
                  <Button variant="ghost" onClick={() => window.print()}>
                    Save as Draft
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (confirm('Are you sure you want to clear the form? All data will be lost.')) {
                        setJob({
                          title: '',
                          location: '',
                          jobType: '',
                          salary: '',
                          salaryCurrency: 'INR',
                          salaryPeriod: 'year',
                          experience: 1,
                          expiryDate: '',
                          description: '',
                          companyName: '',
                          department: '',
                          vacancies: 1,
                          skills: [],
                          education: '',
                        })
                        editor?.commands.clearContent()
                        setRequirements([''])
                        setBenefits([''])
                        toast.info('Form cleared')
                      }
                    }}
                  >
                    Clear Form
                  </Button>
                  <Button
                    onClick={submitJob}
                    disabled={loading}
                    className={cn(
                      "gap-2 min-w-[120px]",
                      loading && "opacity-70"
                    )}
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Post Job
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* PREVIEW SIDEBAR */}
          <div className="lg:col-span-1">
            <div className={cn(
              "sticky top-6 transition-all duration-300",
              preview ? "block" : "hidden lg:block"
            )}>
              <JobPreview 
                job={{
                  ...job,
                  requirements: requirements.filter(r => r.trim()),
                  benefits: benefits.filter(b => b.trim()),
                  isRemote,
                  urgentHiring,
                  vacancies: job.vacancies,
                  skills: job.skills,
                  education: job.education,
                  companyName: job.companyName,
                  department: job.department,
                }} 
              />
              {!preview && (
                <Card className="mt-4 border-dashed">
                  <CardContent className="pt-6 text-center">
                    <Eye className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Preview will appear here. Click "Live Preview" to see changes in real-time.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Template Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Job Template</DialogTitle>
            <DialogDescription>
              Choose a template to quickly populate the form with pre-filled content.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 py-4">
            <Button
              variant="outline"
              className="h-auto py-4 justify-start"
              onClick={() => loadTemplate('software-engineer')}
            >
              <div className="text-left">
                <div className="font-semibold">Software Engineer</div>
                <div className="text-sm text-muted-foreground">
                  Senior full-stack developer position with modern tech stack
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 justify-start"
              onClick={() => loadTemplate('marketing-manager')}
            >
              <div className="text-left">
                <div className="font-semibold">Marketing Manager</div>
                <div className="text-sm text-muted-foreground">
                  Marketing leadership role with digital focus
                </div>
              </div>
            </Button>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsTemplateDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}