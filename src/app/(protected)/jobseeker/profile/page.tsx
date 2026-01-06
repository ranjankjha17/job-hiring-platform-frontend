"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useProfile } from "@/features/profile/hooks/useProfile"

export default function ProfilePage() {
  const { profile, loading, saveProfile, uploadUserResume } = useProfile()
  const [file, setFile] = useState<File | null>(null)
  const [form, setForm] = useState<any>({})

  if (loading) return <p className="p-6">Loading...</p>

  const update = () => {
    saveProfile({
      name: form.name || profile.name,
      phone: form.phone || profile.profile?.phone,
      location: form.location || profile.profile?.location,
      // skills: (form.skills || profile.profile?.skills)?.split(","),
      skills: form.skills
        ? form.skills.split(",").map(s => s.trim()).filter(Boolean)
        : profile.profile?.skills || [],

      experience: form.experience || profile.profile?.experience
    })
  }

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-5">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <Input
        defaultValue={profile.name}
        placeholder="Name"
        onChange={e =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <Input
        value={profile.email}
        disabled
      />

      <Input
        defaultValue={profile.profile?.phone}
        placeholder="Phone"
        onChange={e =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <Input
        defaultValue={profile.profile?.location}
        placeholder="Location"
        onChange={e =>
          setForm({ ...form, location: e.target.value })
        }
      />

      <Input
        defaultValue={profile.profile?.skills?.join(", ")}
        placeholder="Skills"
        onChange={e =>
          setForm({ ...form, skills: e.target.value })
        }
      />

      <Input
        defaultValue={profile.profile?.experience}
        placeholder="Experience"
        onChange={e =>
          setForm({ ...form, experience: e.target.value })
        }
      />

      <Button onClick={update} className="w-full">
        Save Profile
      </Button>

      <hr />

      {/* 📄 Resume Section */}
      <div className="space-y-2">
        <p className="font-semibold">
          Resume:{" "}
          {profile.resume ? "Uploaded" : "Not Uploaded"}
        </p>

        <Input
          type="file"
          accept=".pdf"
          onChange={e =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <Button
          disabled={!file}
          onClick={() => uploadUserResume(file!)}
        >
          {profile.resume ? "Change Resume" : "Upload Resume"}
        </Button>
      </div>
    </div>
  )
}
