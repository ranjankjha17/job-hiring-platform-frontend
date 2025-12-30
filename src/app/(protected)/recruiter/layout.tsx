'use client'

import DashboardShell from "@/components/layout/DashboardShell"
import { useAuth } from "@/hooks/useAuth"
import { redirect } from "next/navigation"

export default function RecruiterLayout({
    children,
}:{
    children:React.ReactNode
}){
    const {authLoading,user}=useAuth()
    if(authLoading) return null
    if(user?.role!=='recruiter'){
        redirect('/unauthorized')
    }

    return <DashboardShell>{children}</DashboardShell>
}