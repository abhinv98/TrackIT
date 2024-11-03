// src/services/api.ts
import axios from "axios";
import type { Job } from "@/types/job";
import type { ApiResponse } from "@/types/api";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const jobsApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Job[]>>("/jobs");
    return response.data;
  },

  create: async (job: Omit<Job, "id">) => {
    const response = await api.post<ApiResponse<Job>>("/jobs", job);
    return response.data;
  },

  update: async (id: number, job: Partial<Job>) => {
    const response = await api.patch<ApiResponse<Job>>(`/jobs/${id}`, job);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete<ApiResponse<void>>(`/jobs/${id}`);
    return response.data;
  },
};
