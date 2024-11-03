// src/hooks/useJobs.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "@/services/api";
import { useJobStore } from "@/store/useJobStore";
import type { Job } from "@/types/job";

export function useJobs() {
  const queryClient = useQueryClient();
  const { setJobs, addJob, updateJob, deleteJob } = useJobStore();

  const { data, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await jobsApi.getAll();
      setJobs(response.data);
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newJob: Omit<Job, "id">) => jobsApi.create(newJob),
    onSuccess: (response) => {
      addJob(response.data);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }: Partial<Job> & { id: number }) =>
      jobsApi.update(id, updates),
    onSuccess: (response) => {
      if (response.data.id) {
        updateJob(response.data.id, response.data);
      }
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => jobsApi.delete(id),
    onSuccess: (_, id) => {
      deleteJob(id);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return {
    jobs: data,
    isLoading,
    createJob: createMutation.mutate,
    updateJob: updateMutation.mutate,
    deleteJob: deleteMutation.mutate,
  };
}
