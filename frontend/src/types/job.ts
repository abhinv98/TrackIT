// src/types/job.ts
export type JobStatus =
  | "applied"
  | "next_steps"
  | "interview"
  | "offer"
  | "rejected"
  | "accepted";

export interface Job {
  id?: number;
  company: string;
  title: string;
  location: string;
  url: string;
  status: JobStatus;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

