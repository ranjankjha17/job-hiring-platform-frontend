export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  skills: string[];
  isBlocked: boolean;
  applicationCount: number;
  status: JobStatus;
  createdAt: string;
}

export type JobStatus = "open" | "closed" | "paused";
