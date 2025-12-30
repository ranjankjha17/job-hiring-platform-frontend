'use client'
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function adminLayout({
    children
}:{
    children:React.ReactNode
}){
    const {authLoading,user}=useAuth()
    if(authLoading) return null
    if(user?.role!=='admin'){
        redirect('/unauthorized')
    }



    return<>{children}</>
}