'use client'

import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, authLoading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login")
    }
  }, [isAuthenticated, authLoading, router])

  if (authLoading) {
    return <div className="p-10">Loading...</div>
  }

  if (!isAuthenticated) {
    return null 
  }

  return <>{children}</>
}