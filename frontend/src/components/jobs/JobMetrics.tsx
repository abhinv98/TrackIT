// src/components/jobs/JobMetrics.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Job } from "@/types/job"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface JobMetricsProps {
  jobs: Job[]
}

export function JobMetrics({ jobs }: JobMetricsProps) {
  const metrics = {
    total: jobs.length,
    active: jobs.filter(job => !['rejected', 'accepted'].includes(job.status)).length,
    interviews: jobs.filter(job => job.status === 'interview').length,
    offers: jobs.filter(job => job.status === 'offer').length
  }

  const statusData = [
    { status: 'Applied', count: jobs.filter(job => job.status === 'applied').length },
    { status: 'Next Steps', count: jobs.filter(job => job.status === 'next_steps').length },
    { status: 'Interview', count: jobs.filter(job => job.status === 'interview').length },
    { status: 'Offer', count: jobs.filter(job => job.status === 'offer').length },
    { status: 'Accepted', count: jobs.filter(job => job.status === 'accepted').length },
    { status: 'Rejected', count: jobs.filter(job => job.status === 'rejected').length }
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.interviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.offers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}