import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { Home, Settings, Table, TestTube, Database, User, ChevronDown, LogOut, UserCircle } from 'lucide-react'
import { SidebarProvider, Sidebar, SidebarToggle, useSidebar } from './Sidebar'
import { useState } from 'react'

const LayoutContent = ({ children }) => {
  const { isOpen, isMobile } = useSidebar()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navItems = [
    { path: '/', name: 'Home', icon: Home },
    { path: '/buttons', name: 'Buttons', icon: Settings },
    { path: '/testing', name: 'Testing', icon: TestTube },
    { path: '/data-table', name: 'Data Table', icon: Table },
    { path: '/server-data', name: 'Server Data', icon: Database },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content Area with proper sidebar spacing */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isMobile ? 'ml-0' : isOpen ? 'ml-64' : 'ml-16'}
      `}>
        {/* Top Navbar */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Left side - Logo and mobile toggle */}
            <div className="flex items-center gap-4">
              <SidebarToggle />
              <div>
                <h1 className="text-xl font-bold">Vite React App</h1>
                <p className="text-sm text-muted-foreground">
                  {getPageTitle(location.pathname)}
                </p>
              </div>
            </div>

            {/* Center - Navigation Items */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    asChild
                  >
                    <Link to={item.path} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                )
              })}
            </nav>

            {/* Right side - User Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2"
              >
                <UserCircle className="h-5 w-5" />
                <span className="hidden sm:inline">John Doe</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs">john@example.com</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <div className="border-t border-border my-1"></div>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted transition-colors text-red-600"
                      onClick={() => {
                        setDropdownOpen(false)
                        // Handle logout
                        console.log('Logout clicked')
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* <div className="max-w-7xl mx-auto"> */}
            {children}
          {/* </div> */}
        </main>
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  )
}

const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Welcome to your dashboard'
    case '/buttons':
      return 'UI Components & Buttons'
    case '/testing':
      return 'Testing & Development'
    case '/data-table':
      return 'Data Table with TanStack Query'
    case '/server-data':
      return 'Server Data Management'
    case '/profile':
      return 'User Profile'
    case '/settings':
      return 'Application Settings'
    case '/products':
      return 'Product Management'
    case '/products/create':
      return 'Create New Product'
    case '/products/edit':
      return 'Edit Product'
    case '/analytics':
      return 'Analytics Dashboard'
    case '/analytics/reports':
      return 'Analytics Reports'
    case '/analytics/charts':
      return 'Data Visualization'
    default:
      return 'Page'
  }
}

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  )
}

export default Layout 