import api from "@/services/api"
import { Profile } from "../types/profile"

export const getProfile = async (): Promise<Profile> => {
  const res = await api.get("/profile")
  return res.data
}

export const updateProfile = async (data: any) => {
  return api.put("/profile", data)
}

export const uploadResume = async (file: File) => {
  const formData = new FormData()
  formData.append("resume", file)

  return api.post("/profile/resume", formData)
}
