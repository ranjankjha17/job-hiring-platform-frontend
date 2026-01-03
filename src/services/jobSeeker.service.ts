import api from "./api";

export const applyJob = async (jobId: string, resumeFileId: string) => {
  const res = await api.post("/job-seeker/apply", {
    jobId,
    resumeFileId,
  });
    console.log(res.data)

  return res.data;
};
