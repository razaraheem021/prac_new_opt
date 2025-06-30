import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Bell, Shield, Palette, Globe } from 'lucide-react'

const Settings = () => {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your application preferences and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates</p>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Browser notifications</p>
              </div>
              <Switch checked={true} />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark theme</p>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <div>
              <p className="font-medium mb-2">Language</p>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Privacy & Security</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Analytics</p>
                <p className="text-sm text-muted-foreground">Help improve our service</p>
              </div>
              <Switch 
                checked={analytics} 
                onCheckedChange={setAnalytics}
              />
            </div>
            
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            
            <Button variant="outline" className="w-full">
              Download Data
            </Button>
          </div>
        </div>

        {/* Advanced */}
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Advanced</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Time Zone</p>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                <option>UTC-05:00 Eastern Time</option>
                <option>UTC-08:00 Pacific Time</option>
                <option>UTC+00:00 GMT</option>
              </select>
            </div>
            
            <div>
              <p className="font-medium mb-2">Data Export Format</p>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                <option>JSON</option>
                <option>CSV</option>
                <option>XML</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>Save All Settings</Button>
      </div>
    </div>
  )
}

export default Settings 