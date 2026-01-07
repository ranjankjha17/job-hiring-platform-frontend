'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { deleteJob, duplicateJob } from '@/services/job.service'
import {
  MoreVertical,
  Pencil,
  Copy,
  Trash2,
  Eye,
  BarChart3,
  Share2,
  Archive,
  Download
} from 'lucide-react'

interface JobActionsProps {
  jobId: string
  onRefresh: () => void
  jobTitle?: string
}

export default function JobActions({ jobId, onRefresh, jobTitle }: JobActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDuplicate = async () => {
    setIsLoading(true)
    try {
      await duplicateJob(jobId)
      toast.success('Job duplicated successfully')
      onRefresh()
    } catch (error) {
      toast.error('Failed to duplicate job')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteJob(jobId)
      toast.success('Job deleted successfully')
      onRefresh()
    } catch (error) {
      toast.error('Failed to delete job')
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleExport = () => {
    toast.info('Export feature coming soon!')
  }

  const handleViewAnalytics = () => {
    toast.info('Analytics dashboard coming soon!')
  }

  const handleShare = () => {
    const url = `${window.location.origin}/jobs/${jobId}`
    navigator.clipboard.writeText(url)
    toast.success('Job link copied to clipboard')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => toast.info('Edit feature coming soon!')}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Job
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleDuplicate} disabled={isLoading}>
            <Copy className="h-4 w-4 mr-2" />
            {isLoading ? 'Duplicating...' : 'Duplicate'}
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleViewAnalytics}>
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => toast.info('Archive feature coming soon!')}>
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {jobTitle ? `"${jobTitle}"` : 'this job'}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete Job'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}