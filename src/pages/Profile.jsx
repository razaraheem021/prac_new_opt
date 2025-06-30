import React from 'react'
import { Button } from '@/components/ui/button'
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react'

const Profile = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <input 
                    type="text" 
                    value="John" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <input 
                    type="text" 
                    value="Doe" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <input 
                  type="email" 
                  value="john.doe@example.com" 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Phone</label>
                <input 
                  type="tel" 
                  value="+1 (555) 123-4567" 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-lg border bg-card text-center">
            <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-muted-foreground">Administrator</p>
            
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Joined Dec 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 