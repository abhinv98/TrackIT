// src/components/jobs/JobBoard.tsx
import { useJobs } from "@/hooks/useJobs"
import { JobCard } from "./JobCard"
import { JobForm } from "./JobForm"
import { JobMetrics } from "./JobMetrics"
import { LoadingState } from "@/components/ui/loading-state"
import { Separator } from "@/components/ui/separator"
import type { Job, JobStatus } from "@/types/job"

export function JobBoard() {
  const { jobs, isLoading, createJob, updateJob, deleteJob } = useJobs()

  const handleStatusChange = (id: number, status: JobStatus) => {
    updateJob({ id, status })
  }

  if (isLoading) {
    return <LoadingState />
  }

  const columns: JobStatus[] = ['applied', 'next_steps', 'interview', 'offer', 'accepted', 'rejected']

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <JobForm onSubmit={createJob} />
      </div>
      
      <JobMetrics jobs={jobs || []} />
      
      <Separator className="my-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {columns.map((status) => (
          <div key={status} className="space-y-4">
            <h2 className="text-lg font-semibold capitalize">
              {status.replace('_', ' ')}
              <span className="ml-2 text-sm text-muted-foreground">
                ({jobs?.filter(job => job.status === status).length || 0})
              </span>
            </h2>
            <div className="space-y-4">
              {jobs
                ?.filter(job => job.status === status)
                .map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onStatusChange={handleStatusChange}
                    onDelete={deleteJob}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}