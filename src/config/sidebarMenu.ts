// import { Role } from '@/context/AuthContext'

// export interface SidebarItem {
//   label: string
//   href: string
// }

// export const sidebarMenu: Record<Role, SidebarItem[]> = {
//   recruiter: [
//     { label: 'Dashboard', href: '/recruiter/dashboard' },
//     { label: 'Post Job', href: '/recruiter/post-job' },
//     { label: 'My Jobs', href: '/recruiter/jobs' },
//     { label: 'Applicants', href: '/recruiter/applicants' },
//     { label: 'Messages', href: '/recruiter/messages' },
//     { label: 'Company Profile', href: '/recruiter/settings' },
//   ],

//   admin: [
//     { label: 'Dashboard', href: '/admin/dashboard' },
//     { label: 'Users', href: '/admin/users' },
//     { label: 'Jobs', href: '/admin/jobs' },
//     { label: 'Reports', href: '/admin/reports' },
//     { label: 'Settings', href: '/admin/settings' },
//   ],

//   jobseeker: [
//     { label: 'Dashboard', href: '/dashboard' },
//     { label: 'Find Jobs', href: '/jobs' },
//     { label: 'Applications', href: '/applications' },
//     { label: 'Saved Jobs', href: '/saved-jobs' },
//     { label: 'Profile', href: '/profile' },
//   ],
// }



import {
  LayoutDashboard,
  Briefcase,
  Users,
  FilePlus,
  MessageSquare,
  Settings,
  Bookmark,
  User,
  Shield,
} from 'lucide-react'
import { Role } from '@/context/AuthContext'

export interface SidebarItem {
  label: string
  href: string
  icon: React.ElementType
}

export const sidebarMenu: Record<Role, SidebarItem[]> = {
  recruiter: [
    { label: 'Dashboard', href: '/recruiter/dashboard', icon: LayoutDashboard },
    { label: 'Post Job', href: '/recruiter/post-job', icon: FilePlus },
    { label: 'My Jobs', href: '/recruiter/jobs', icon: Briefcase },
    { label: 'Applicants', href: '/recruiter/applicants', icon: Users },
    { label: 'Messages', href: '/recruiter/messages', icon: MessageSquare },
    { label: 'Company Profile', href: '/recruiter/settings', icon: Settings },
  ],

  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Jobs', href: '/admin/jobs', icon: Briefcase },
    { label: 'Reports', href: '/admin/reports', icon: Shield },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ],

  jobseeker: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Find Jobs', href: '/jobs', icon: Briefcase },
    { label: 'Applications', href: '/applications', icon: FilePlus },
    { label: 'Saved Jobs', href: '/saved-jobs', icon: Bookmark },
    { label: 'Profile', href: '/profile', icon: User },
  ],
}
