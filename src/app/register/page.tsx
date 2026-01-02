'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import api from '@/services/api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select' // Changed this import
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'jobseeker'
    })

    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('form data', form)
        try {
            const res = await api.post('/auth/register', form)
            if (res.data.success) {
                toast.success(res.data.message)
                setForm({
                    name: '',
                    email: '',
                    password: '',
                    role: 'jobseeker'
                })
                router.push('/login')
            }
        } catch (err: any) {
            console.log(err.response?.data?.message)
            toast.error(err.response?.data?.message || 'Registration failed')
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <Card className='w-[420px]'>
                <CardContent className='space-y-4 p-6'>
                    <h1 className='text-amber-900 text-5xl'>Register</h1>
                    <form onSubmit={handleRegister} className='space-y-4'>
                        <Input
                            type='text'
                            placeholder='Full Name'
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                        <Input
                            placeholder='Email'
                            type='email'
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                        <Input
                            placeholder='Password'
                            type='password'
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                        
                        <Select
                            value={form.role}
                            onValueChange={(value) => setForm({ ...form, role: value })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="jobseeker">Job Seeker</SelectItem>
                                <SelectItem value="recruiter">Recruiter</SelectItem>
                            </SelectContent>
                        </Select>
                        
                        <Button type="submit" className='w-full'>
                            Create Account
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register