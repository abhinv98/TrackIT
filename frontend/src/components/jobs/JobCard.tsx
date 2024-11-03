// src/components/jobs/JobCard.tsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Building2, MapPin } from "lucide-react"
import type { Job, JobStatus } from "@/types/job"

const STATUS_COLORS = {
  applied: "bg-blue-500",
  next_steps: "bg-yellow-500",
  interview: "bg-purple-500",
  offer: "bg-green-500",
  rejected: "bg-red-500",
  accepted: "bg-emerald-500"
} as const

interface JobCardProps {
  job: Job
  onStatusChange: (id: number, status: JobStatus) => void
  onDelete: (id: number) => void
}

export function JobCard({ job, onStatusChange, onDelete }: JobCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1.5">
          <h3 className="font-semibold leading-none">{job.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Building2 className="mr-1 h-4 w-4" />
            {job.company}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.keys(STATUS_COLORS).map((status) => (
              <DropdownMenuItem 
                key={status}
                onClick={() => job.id && onStatusChange(job.id, status as JobStatus)}
              >
                Move to {status.replace('_', ' ')}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => job.id && onDelete(job.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{job.location}</span>
        </div>
        {job.notes && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {job.notes}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="secondary" className={STATUS_COLORS[job.status]}>
          {job.status.replace('_', ' ')}
        </Badge>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          View posting
        </a>
      </CardFooter>
    </Card>
  )
}