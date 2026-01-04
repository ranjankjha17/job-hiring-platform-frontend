import api from "@/services/api";

export const approveJob = (id: string) =>
  api.put(`/admin/jobs/${id}/approve`);

export const toggleUserBlock = (id: string) =>
  api.put(`/admin/users/${id}/block`);

export const fetchApplications = async () => {
  const { data } = await api.get("/admin/applications");
  return data;
};

export const downloadResume = (fileId: string) =>
  window.open(`/admin/resume/${fileId}`, "_blank");

export const makeAdmin = (id: string) =>
  api.put(`/admin/users/${id}/make-admin`);
