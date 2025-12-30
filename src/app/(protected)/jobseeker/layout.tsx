'use client'

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function JobseekerLayout({
    children
}:{
    children:React.ReactNode
}){

    const {authLoading,user}=useAuth()
    if(authLoading) return null
    if(user?.role!=='jobseeker'){
        redirect('/unauthorized')
    }

    return<>{children}</>

}


