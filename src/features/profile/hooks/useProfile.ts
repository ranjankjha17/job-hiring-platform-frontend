"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  getProfile,
  updateProfile,
  uploadResume
} from "../services/profile.service"

export function useProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    try {
      const data = await getProfile()
      setProfile(data)
    } catch {
      toast.error("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async (payload: any) => {
    try {
      await updateProfile(payload)
      toast.success("Profile updated")
      fetchProfile()
    } catch {
      toast.error("Profile update failed")
    }
  }

  const uploadUserResume = async (file: File) => {
    try {
      await uploadResume(file)
      toast.success("Resume uploaded")
      fetchProfile()
    } catch {
      toast.error("Resume upload failed")
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profile,
    loading,
    saveProfile,
    uploadUserResume
  }
}
