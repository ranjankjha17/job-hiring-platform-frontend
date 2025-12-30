// import { Badge } from '@/components/ui/badge'

// export default function JobStatusBadge({ status }: { status: string }) {
//   const colors: Record<string, string> = {
//     Active: 'bg-green-100 text-green-700',
//     Closed: 'bg-red-100 text-red-700',
//     Draft: 'bg-gray-100 text-gray-700',
//   }

//   return (
//     <Badge className={colors[status] || 'bg-muted'}>
//       {status}
//     </Badge>
//   )
// }




'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react'

interface JobStatusBadgeProps {
  status: string
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export default function JobStatusBadge({ status, size = 'default', className }: JobStatusBadgeProps) {
  const statusConfig = {
    Active: {
      label: 'Active',
      icon: CheckCircle2,
      className: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200',
      iconClassName: 'text-green-600',
    },
    Published: {
      label: 'Published',
      icon: CheckCircle2,
      className: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200',
      iconClassName: 'text-green-600',
    },
    Closed: {
      label: 'Closed',
      icon: XCircle,
      className: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200',
      iconClassName: 'text-red-600',
    },
    Draft: {
      label: 'Draft',
      icon: Clock,
      className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200',
      iconClassName: 'text-yellow-600',
    },
    Pending: {
      label: 'Pending',
      icon: AlertCircle,
      className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200',
      iconClassName: 'text-blue-600',
    },
    Expired: {
      label: 'Expired',
      icon: XCircle,
      className: 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200',
      iconClassName: 'text-gray-600',
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    icon: AlertCircle,
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200',
    iconClassName: 'text-gray-600',
  }

  const Icon = config.icon
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center gap-1.5 font-medium',
        config.className,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={cn('h-3 w-3', config.iconClassName)} />
      {config.label}
    </Badge>
  )
}