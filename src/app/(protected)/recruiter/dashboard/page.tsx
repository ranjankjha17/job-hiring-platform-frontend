'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RecruiterDashboard(){
        const { user, isAuthenticated, authLoading, logout } = useAuth()
        const router = useRouter()
    
        useEffect(() => {
            if (!authLoading && !isAuthenticated) {
                router.replace('/login')
            }
        }, [isAuthenticated, authLoading, router])
    
        if (authLoading || !isAuthenticated || !user) {
            return null // or <LoadingSpinner />
        }
    
    return(
        <div className='p-6'>
            <h1 className='text-2xl font-bold'>Recruiter Dashboard</h1>
            <p className='mt-2'>Name: {user.name}</p>
            <p>Role: {user.role}</p>
            <Button onClick={logout} className='mt-4'>Logout</Button>
        </div>
    )
}