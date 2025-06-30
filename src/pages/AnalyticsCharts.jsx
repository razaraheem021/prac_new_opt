import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BarChart3, PieChart, LineChart, TrendingUp } from 'lucide-react'

const AnalyticsCharts = () => {
  const [selectedChart, setSelectedChart] = useState('bar')

  const chartTypes = [
    { id: 'bar', name: 'Bar Chart', icon: BarChart3 },
    { id: 'line', name: 'Line Chart', icon: LineChart },
    { id: 'pie', name: 'Pie Chart', icon: PieChart },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Data Visualization</h1>
        <p className="text-muted-foreground">
          Interactive charts and graphs for data analysis
        </p>
      </div>

      {/* Chart Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {chartTypes.map((chart) => {
          const Icon = chart.icon
          return (
            <div
              key={chart.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedChart === chart.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-card hover:bg-muted/50'
              }`}
              onClick={() => setSelectedChart(chart.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-6 w-6 text-primary" />
                <span className="font-medium">{chart.name}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart Display */}
      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Revenue Analysis</h2>
        </div>
        
        {selectedChart === 'bar' && (
          <div className="h-80 flex items-end justify-between space-x-4 p-6">
            {[65, 45, 85, 55, 75, 95].map((height, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className="w-12 bg-blue-500 rounded-t transition-all hover:bg-blue-400"
                  style={{ height: `${height}%` }}
                />
                <span className="text-sm font-medium">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                </span>
              </div>
            ))}
          </div>
        )}

        {selectedChart === 'line' && (
          <div className="h-80 p-6 bg-muted/10 flex items-center justify-center">
            <div className="text-center">
              <LineChart className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Line chart visualization</p>
            </div>
          </div>
        )}

        {selectedChart === 'pie' && (
          <div className="h-80 p-6 bg-muted/10 flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Pie chart visualization</p>
            </div>
          </div>
        )}
      </div>

      {/* Chart Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold">Growth Trend</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 mb-2">+23.5%</p>
          <p className="text-sm text-muted-foreground">
            Revenue increased compared to last month
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsCharts 