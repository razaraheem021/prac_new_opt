import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ThemeToggle from './themeToggle'
import { ArrowRight, Code, Database, Settings } from 'lucide-react'

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Vite React App</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern React application with routing, components, and data visualization built with Vite and Tailwind CSS.
        </p>
        {/* <div className="flex items-center justify-center gap-4">
          <ThemeToggle />
        </div> */}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <Settings className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">UI Components</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Explore different button variants and UI components.
          </p>
          <Button asChild size="sm">
            <Link to="/buttons" className="flex items-center space-x-2">
              <span>View Buttons</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <Database className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Data Tables</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            View data in organized tables with sorting and filtering.
          </p>
          <Button asChild size="sm" variant="outline">
            <Link to="/data-table" className="flex items-center space-x-2">
              <span>View Tables</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <Code className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Testing Area</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Development and testing components for experimentation.
          </p>
          <Button asChild size="sm" variant="secondary">
            <Link to="/testing" className="flex items-center space-x-2">
              <span>Go to Testing</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home