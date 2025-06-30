import React, { useState, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Settings, 
  Table, 
  TestTube, 
  Database,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Package,
  BarChart3,
  User,
  FileText,
  Plus,
  Edit,
  TrendingUp
} from 'lucide-react'
import { Button } from './ui/button'
import ThemeToggle from '../pages/themeToggle'

// Sidebar Context
const SidebarContext = createContext()

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile && isOpen) {
        setIsOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isOpen])

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const Sidebar = () => {
  const { isOpen, toggleSidebar, isMobile } = useSidebar()
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState({})
  const [hoveredItem, setHoveredItem] = useState(null)
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 })
  const [isPopoverHovered, setIsPopoverHovered] = useState(false)

  const toggleExpanded = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleMouseEnter = (item, event) => {
    if (!isOpen && !isMobile) {
      const rect = event.currentTarget.getBoundingClientRect()
      setPopoverPosition({
        x: rect.right + 8, // 8px margin from the right edge of sidebar
        y: rect.top
      })
      setHoveredItem(item.key)
      setIsPopoverHovered(true) // Consider button hover as part of the popover area
    }
  }

  const handleMouseLeave = () => {
    if (!isOpen && !isMobile) {
      setIsPopoverHovered(false) // Button is no longer hovered
    }
  }

  const handlePopoverMouseEnter = () => {
    setIsPopoverHovered(true)
  }

  const handlePopoverMouseLeave = () => {
    setIsPopoverHovered(false)
    setHoveredItem(null)
  }

  // Hide popover when not hovering either the button or popover
  React.useEffect(() => {
    if (!isPopoverHovered && hoveredItem) {
      const timer = setTimeout(() => {
        if (!isPopoverHovered) {
          setHoveredItem(null)
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isPopoverHovered, hoveredItem])

  const navItems = [
    { path: '/', name: 'Home', icon: Home },
    { path: '/buttons', name: 'Buttons', icon: Settings },
    { path: '/testing', name: 'Testing', icon: TestTube },
    { path: '/data-table', name: 'Data Table', icon: Table },
    { path: '/server-data', name: 'Server Data', icon: Database },
    {
      key: 'products',
      name: 'Products',
      icon: Package,
      children: [
        { path: '/products', name: 'All Products', icon: Package },
        { path: '/products/create', name: 'Create Product', icon: Plus },
        { path: '/products/edit', name: 'Edit Products', icon: Edit },
      ]
    },
    {
      key: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      children: [
        { path: '/analytics', name: 'Dashboard', icon: BarChart3 },
        { path: '/analytics/reports', name: 'Reports', icon: FileText },
        { path: '/analytics/charts', name: 'Charts', icon: TrendingUp },
      ]
    },
    { path: '/profile', name: 'Profile', icon: User },
    { path: '/settings', name: 'Settings', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path
  const isParentActive = (children) => children?.some(child => location.pathname === child.path)

  const renderNavItem = (item) => {
    if (item.children) {
      const isExpanded = expandedItems[item.key]
      const parentActive = isParentActive(item.children)

      return (
        <div 
          key={item.key} 
          className="relative"
          onMouseEnter={(event) => handleMouseEnter(item, event)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Parent Item */}
          <Button
            variant={parentActive ? "secondary" : "ghost"}
            className={`
              w-full h-12 mb-1
              ${!isOpen && !isMobile 
                ? 'justify-center px-3' 
                : 'justify-between px-4'
              }
            `}
            onClick={() => (isOpen || isMobile) && toggleExpanded(item.key)}
          >
            <div className={`flex items-center ${!isOpen && !isMobile ? '' : 'gap-3'}`}>
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {(isOpen || isMobile) && (
                <span className="transition-opacity duration-200">
                  {item.name}
                </span>
              )}
            </div>
            {(isOpen || isMobile) && (
              <div className="flex-shrink-0">
                {isExpanded ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
              </div>
            )}
          </Button>

          {/* Note: Popover is now rendered via Portal outside this container */}

          {/* Children Items - Only show when expanded and sidebar is open */}
          {isExpanded && (isOpen || isMobile) && (
            <div className="ml-4 space-y-1 mb-2">
              {item.children.map((child) => {
                const Icon = child.icon
                return (
                  <Button
                    key={child.path}
                    variant={isActive(child.path) ? "default" : "ghost"}
                    className="w-full justify-start gap-3 h-10 text-sm px-4"
                    asChild
                  >
                    <Link
                      to={child.path}
                      onClick={() => {
                        if (isMobile) {
                          toggleSidebar()
                        }
                      }}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="transition-opacity duration-200">
                        {child.name}
                      </span>
                    </Link>
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      )
    }

    // Regular Item
    const Icon = item.icon
    return (
      <Button
        key={item.path}
        variant={isActive(item.path) ? "default" : "ghost"}
        className={`
          w-full h-12 mb-1 transition-all duration-200
          ${!isOpen && !isMobile 
            ? 'justify-center px-3' 
            : 'justify-start gap-3 px-4'
          }
        `}
        asChild
      >
        <Link
          to={item.path}
          onClick={() => {
            if (isMobile) {
              toggleSidebar()
            }
          }}
          className={`flex items-center ${!isOpen && !isMobile ? '' : 'gap-3'}`}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          {(isOpen || isMobile) && (
            <span className="transition-opacity duration-200">
              {item.name}
            </span>
          )}
        </Link>
      </Button>
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-50 h-screen bg-background border-r border-border
        transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isMobile ? 'w-64' : isOpen ? 'w-64' : 'w-16'}
        md:translate-x-0
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          {isOpen && (
            <h2 className="text-lg font-semibold">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Sidebar Content - Scrollable */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto overflow-x-hidden">
          {navItems.map(renderNavItem)}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-4 flex-shrink-0">
          {(isOpen || isMobile) ? (
            <div className="space-y-3">
              {/* App Name */}
              <div className="text-sm text-muted-foreground">
                <span>Vite React App</span>
              </div>
              
              {/* Theme Toggle */}
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <ThemeToggle compact />
            </div>
          )}
        </div>
      </aside>

      {/* Portal-based Popover for collapsed sidebar */}
      {!isOpen && !isMobile && hoveredItem && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed z-[9999] pointer-events-auto"
          style={{
            left: `${popoverPosition.x - 10}px`, // Start slightly before the popover
            top: `${popoverPosition.y - 5}px`, // Start slightly above
            width: `${15 + 192}px`, // Bridge width + popover min-width
            minHeight: '60px' // Ensure it covers the button area
          }}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        >
          {/* Actual popover */}
          <div 
            className="bg-background border border-border rounded-md shadow-lg py-2 min-w-48 ml-3 mt-1 pointer-events-auto"
          >
            <div className="px-3 py-2 text-sm font-semibold text-muted-foreground border-b border-border">
              {navItems.find(item => item.key === hoveredItem)?.name}
            </div>
            {navItems.find(item => item.key === hoveredItem)?.children?.map((child) => {
              const Icon = child.icon
              return (
                <Link
                  key={child.path}
                  to={child.path}
                  className={`
                    flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted transition-colors
                    ${isActive(child.path) ? 'bg-primary text-primary-foreground' : ''}
                  `}
                  onClick={() => {
                    setHoveredItem(null)
                    setIsPopoverHovered(false)
                  }}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{child.name}</span>
                </Link>
              )
            })}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSidebar}
      className="md:hidden"
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
} 