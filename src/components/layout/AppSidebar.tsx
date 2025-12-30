// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
// import { LogOut } from 'lucide-react'
// import { useAuth } from '@/hooks/useAuth'
// import { sidebarMenu } from '@/config/sidebarMenu'

// export default function AppSidebar() {
//   const pathname = usePathname()
//   const { user, logout } = useAuth()

//   if (!user) return null

//   const menu = sidebarMenu[user.role]

//   return (
//     <aside className="w-64 border-r bg-white p-4">
//       <h2 className="mb-6 text-xl font-bold capitalize">
//         {user.role} Panel
//       </h2>

//       <nav className="space-y-2">
//         {menu.map(item => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={cn(
//               'block rounded-md px-3 py-2 text-sm transition',
//               pathname === item.href
//                 ? 'bg-black text-white'
//                 : 'text-gray-700 hover:bg-gray-100'
//             )}
//           >
//             {item.label}
//           </Link>
//         ))}
//       </nav>

//       <Button
//         variant="destructive"
//         className="mt-6 w-full"
//         onClick={logout}
//       >
//         <LogOut className="mr-2 h-4 w-4" />
//         Logout
//       </Button>
//     </aside>
//   )
// }





// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
// import { LogOut } from 'lucide-react'
// import { useAuth } from '@/hooks/useAuth'
// import { sidebarMenu } from '@/config/sidebarMenu'

// export default function AppSidebar() {
//   const pathname = usePathname()
//   const { user, logout } = useAuth()

//   if (!user) return null

//   const menu = sidebarMenu[user.role]

//   return (
//     <aside className="flex h-screen w-64 flex-col border-r bg-gradient-to-b from-slate-50 to-white px-4 py-6">
      
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-lg font-bold tracking-wide text-slate-900">
//           {user.role.toUpperCase()}
//         </h2>
//         <p className="text-xs text-slate-500">Control Panel</p>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 space-y-1">
//         {menu.map(item => {
//           const Icon = item.icon
//           const active = pathname === item.href

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={cn(
//                 'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
//                 active
//                   ? 'bg-blue-600 text-white shadow-sm'
//                   : 'text-slate-700 hover:bg-slate-100'
//               )}
//             >
//               <Icon
//                 className={cn(
//                   'h-4 w-4',
//                   active ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
//                 )}
//               />
//               {item.label}

//               {active && (
//                 <span className="ml-auto h-2 w-2 rounded-full bg-white" />
//               )}
//             </Link>
//           )
//         })}
//       </nav>

//       {/* Logout */}
//       <Button
//         variant="ghost"
//         onClick={logout}
//         className="mt-6 flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
//       >
//         <LogOut className="h-4 w-4" />
//         Logout
//       </Button>
//     </aside>
//   )
// }






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
