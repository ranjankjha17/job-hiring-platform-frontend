import { Job } from "./job";

export interface Application {
  _id: string;
  job: Job;
  status: "applied" | "shortlisted" | "rejected";
  appliedAt: string;
}
