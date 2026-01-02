export interface ApplicationStatusStat {
  _id: "pending" | "shortlisted" | "rejected";
  count: number;
}

export interface RecruiterStatsResponse {
  totalJobs: number;
  totalApplications: number;
  applicationsByStatus: ApplicationStatusStat[];
}
