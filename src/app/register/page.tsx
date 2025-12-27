'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import api from '@/services/api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
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

    const handleRegister = async (e:any) => {
        e.preventDefault()
        console.log('form data',form)
        try {
            const res = await api.post('/auth/register', form)
            // console.log("res register", res)
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
            console.log(err.response.data.message)
        }


    }
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 '>
            <Card className='w-[420px]'>
                <CardContent className='space-y-4 p-6'>
                    <h1 className='text-amber-900 text-5xl'>Register</h1>
                    <Input
                        type='text'
                        placeholder='Full Name'
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                        placeholder='Email'
                        type='text'
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Input
                        placeholder='Password'
                        type='password'
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    
                    <Select
                        value={form.role}
                        onValueChange={(value) => setForm({ ...form, role: value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>

                        <SelectContent
                            position="popper"
                            className="z-50 w-full bg-white"
                            sideOffset={5}
                        >
                            <SelectItem value="jobseeker">Job Seeker</SelectItem>
                            <SelectItem value="recruiter">Recruiter</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleRegister} className='w-full'>Create Account</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register