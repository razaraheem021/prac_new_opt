import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Filter, Calendar, FileText, TrendingUp } from 'lucide-react'

const AnalyticsReports = () => {
  const [selectedReport, setSelectedReport] = useState('sales')
  const [dateRange, setDateRange] = useState('last-30-days')

  const reports = [
    { id: 'sales', name: 'Sales Report', description: 'Detailed sales analytics and trends' },
    { id: 'customers', name: 'Customer Report', description: 'Customer behavior and demographics' },
    { id: 'products', name: 'Product Report', description: 'Product performance and inventory' },
    { id: 'traffic', name: 'Traffic Report', description: 'Website traffic and conversion data' },
  ]

  const reportData = {
    sales: {
      totalSales: '$125,430',
      orders: '1,247',
      avgOrder: '$100.50',
      topProducts: [
        { name: 'Laptop Pro', sales: '$15,600', units: 12 },
        { name: 'Wireless Headphones', sales: '$8,940', units: 45 },
        { name: 'Smart Watch', sales: '$12,750', units: 32 },
      ]
    },
    customers: {
      totalCustomers: '2,847',
      newCustomers: '184',
      returningRate: '68.5%',
      topCustomers: [
        { name: 'John Smith', orders: 8, spent: '$2,450' },
        { name: 'Sarah Johnson', orders: 6, spent: '$1,890' },
        { name: 'Mike Davis', orders: 5, spent: '$1,650' },
      ]
    }
  }

  const currentData = reportData[selectedReport] || reportData.sales

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Reports</h1>
          <p className="text-muted-foreground">
            Generate and download detailed business reports
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Report Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedReport === report.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border bg-card hover:bg-muted/50'
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">{report.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{report.description}</p>
          </div>
        ))}
      </div>

      {/* Date Range Selection */}
      <div className="flex items-center space-x-4 p-4 rounded-lg border bg-card">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium">Date Range:</span>
        <select 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-1 border border-border rounded-md bg-background text-sm"
        >
          <option value="last-7-days">Last 7 days</option>
          <option value="last-30-days">Last 30 days</option>
          <option value="last-90-days">Last 90 days</option>
          <option value="last-year">Last year</option>
          <option value="custom">Custom range</option>
        </select>
      </div>

      {/* Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-6">Key Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(currentData).slice(0, 3).map(([key, value], index) => (
                <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-6">Trend Analysis</h2>
            
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Chart visualization would appear here</p>
                <p className="text-sm text-muted-foreground">
                  Integration with charting library like Chart.js or Recharts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Details */}
        <div className="space-y-6">
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-lg font-semibold mb-4">Report Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Generated:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Period:</span>
                <span className="capitalize">{dateRange.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Report Type:</span>
                <span className="capitalize">{selectedReport}</span>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          {currentData.topProducts && (
            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-lg font-semibold mb-4">Top Performers</h2>
              
              <div className="space-y-3">
                {currentData.topProducts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.units} units</p>
                    </div>
                    <span className="text-sm font-medium">{item.sales}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export Options */}
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-lg font-semibold mb-4">Export Options</h2>
            
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Export as PDF
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Export as Excel
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Export as CSV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsReports 