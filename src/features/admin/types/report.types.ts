export interface AdminReport {
  totalUsers: number;
  blockedUsers: number;

  totalJobs: number;
  openJobs: number;
  closedJobs: number;
  pausedJobs: number;

  totalApplications: number;
}
