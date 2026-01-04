export interface DashboardStats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;

  jobStatus: {
    open: number;
    closed: number;
    paused: number;
  };

  applicationsByMonth: {
    month: string;
    count: number;
  }[];
}
