import React from 'react'
import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign } from 'lucide-react'

const Analytics = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Orders',
      value: '2,350',
      change: '+180.1%',
      trend: 'up',
      icon: ShoppingCart
    },
    {
      title: 'Active Users',
      value: '12,234',
      change: '+19%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-4.3%',
      trend: 'down',
      icon: BarChart3
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your business performance and key metrics
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="p-6 rounded-lg border bg-card">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{metric.title}</h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {metric.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="p-6 rounded-lg border bg-card">
          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-semibold">Revenue Overview</h2>
            <p className="text-sm text-muted-foreground">Monthly revenue for the past 6 months</p>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {[40, 65, 45, 80, 55, 75].map((height, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className="w-12 bg-primary rounded-t transition-all hover:bg-primary/80"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="p-6 rounded-lg border bg-card">
          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-semibold">Orders Trend</h2>
            <p className="text-sm text-muted-foreground">Daily orders for the past week</p>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-1">
            {[30, 45, 35, 60, 40, 55, 70].map((height, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className="w-8 bg-blue-500 rounded-t transition-all hover:bg-blue-400"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'New order received', time: '2 minutes ago', amount: '$299.00' },
              { action: 'Product updated', time: '15 minutes ago', amount: null },
              { action: 'Payment processed', time: '1 hour ago', amount: '$149.99' },
              { action: 'User registered', time: '2 hours ago', amount: null },
              { action: 'Order fulfilled', time: '3 hours ago', amount: '$89.50' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                {activity.amount && (
                  <span className="text-sm font-medium">{activity.amount}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics 