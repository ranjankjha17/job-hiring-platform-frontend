'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isAuthenticated, actionLoading, authLoading } = useAuth()
    const router = useRouter();
    
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.replace('/dashboard')
        }
    }, [authLoading, isAuthenticated, router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post("/auth/login", { email, password })
            console.log(response.data.data)
            const { _id, name, role, token } = response.data.data
            if (response.data.success) {
                toast.success(response.data.message)
                login(token, { id: _id, name, role })
                setEmail('')
                setPassword('')
            }
        } catch (error: any) {
            console.error(error?.response?.data?.message || "Login Failed")
        }
    }
    if (authLoading) return null


    return (
        <div className=' flex h-screen items-center justify-center bg-gray-100'>
            <Card className="w-[400px]">
                <CardContent className='space-y-4 p-6'>
                    <h2 className='text-2xl font-bold'>Login</h2>
                    <Input
                        type='text'
                        placeholder='Email Id'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={actionLoading}
                    />
                    <Button onClick={handleLogin} className='w-full'>
                        {actionLoading ? "Logging in..." : "Login"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
