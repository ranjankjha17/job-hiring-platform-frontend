import api from '@/services/api'

export const getApplicants = async (jobId?: string) => {
  const res = await api.get('/applicants', {
    params: { jobId },
  })
  return res.data
}

export const updateApplicantStatus = async (
  id: string,
  status: 'Shortlisted' | 'Rejected'
) => {
  return api.patch(`/applicants/${id}/status`, { status })
}

export const downloadResume = (fileId: string) => {
  window.open(`/api/files/${fileId}`, '_blank')
}
