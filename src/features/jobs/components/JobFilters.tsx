"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"

export default function JobFilters({ onChange }: any) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Input
        placeholder="Search jobs..."
        onChange={(e) => onChange((prev: any) => ({ ...prev, q: e.target.value }))}
      />

      <Select onValueChange={(v) => onChange((p: any) => ({ ...p, location: v }))}>
        <SelectTrigger>
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="India">India</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(v) => onChange((p: any) => ({ ...p, type: v }))}>
        <SelectTrigger>
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Full-time">Full-time</SelectItem>
          <SelectItem value="Part-time">Part-time</SelectItem>
          <SelectItem value="Internship">Internship</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
