'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { sidebarMenu } from '@/config/sidebarMenu'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

export default function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  if (!user) return null

  const menu = sidebarMenu[user.role]

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'flex h-screen flex-col border-r bg-gradient-to-b from-slate-50 to-white transition-all duration-300',
          collapsed ? 'w-20 px-2' : 'w-64 px-4'
        )}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {user.role.toUpperCase()}
              </h2>
              <p className="text-xs text-slate-500">Control Panel</p>
            </div>
          )}

          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            ☰
          </Button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1">
          {menu.map(item => {
            const Icon = item.icon
            const active = pathname === item.href

            const link = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5',
                    active
                      ? 'text-white'
                      : 'text-slate-500 group-hover:text-slate-700'
                  )}
                />

                {!collapsed && <span>{item.label}</span>}
              </Link>
            )

            return collapsed ? (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              link
            )
          })}
        </nav>

        {/* Logout */}
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            'mt-4 flex items-center gap-3 text-red-600 hover:bg-red-50',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && 'Logout'}
        </Button>
      </aside>
    </TooltipProvider>
  )
}
