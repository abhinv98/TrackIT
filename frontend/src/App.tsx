// src/App.tsx
import { JobBoard } from "./components/jobs/JobBoard"
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">Job Application Tracker</h1>
          <a 
            href="https://github.com/yourusername/job-tracker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View on GitHub
          </a>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto">
        <JobBoard />
      </main>
      <footer className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-muted-foreground">
          Built with React + Vite
        </div>
      </footer>
    </div>
  )
}

export default App