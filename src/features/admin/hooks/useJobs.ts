"use client";

import { useEffect, useState } from "react";
import {
  fetchAdminJobs,
  toggleJobBlock,
  updateJobStatus,
} from "../services/job.service";
import { Job, JobStatus } from "@/features/job-seeker/types/job";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAdminJobs();
      setJobs(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // const onStatusChange = async (
  //   jobId: string,
  //   status: JobStatus
  // ) => {
  //   try {
  //     await updateJobStatus(jobId, status);
  //     loadJobs();
  //   } catch (err: any) {
  //     alert(err);
  //   }
  // };

  const onStatusChange = async (
  jobId: string,
  status: JobStatus
) => {
  try {
    await updateJobStatus(jobId, status);

    setJobs((prev) =>
      prev.map((job) =>
        job._id === jobId
          ? { ...job, status }
          : job
      )
    );
  } catch (err: any) {
    alert(err?.response?.data?.message || "Failed to update job status");
  }
};

  const onBlockToggle = async (jobId: string) => {
    try {
      await toggleJobBlock(jobId);
      loadJobs();
    } catch (err: any) {
      alert(err);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    onStatusChange,
    onBlockToggle,
  };
};
