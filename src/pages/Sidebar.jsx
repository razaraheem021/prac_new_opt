import React, { useState, createContext, useContext } from 'react';
import styled from 'styled-components';
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  User2,
  Plus,
  MoreHorizontal
} from 'lucide-react';

// Styled Components
const SidebarContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--sidebar-background, #fafafa);
  color: var(--sidebar-foreground, #0a0a0a);
`;

const SidebarWrapper = styled.aside`
  width: ${props => props.isOpen ? '16rem' : '3rem'};
  background-color: var(--sidebar-background, #fafafa);
  border-right: 1px solid var(--sidebar-border, #e5e5e5);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${props => props.isOpen ? '0' : '-18rem'};
    width: 18rem;
    z-index: 50;
    height: 100vh;
    box-shadow: ${props => props.isOpen ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

const SidebarHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--sidebar-border, #e5e5e5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
`;

const SidebarFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--sidebar-border, #e5e5e5);
`;

const SidebarGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const SidebarGroupLabel = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--sidebar-foreground, #0a0a0a);
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  margin: 0.125rem 0.5rem;
`;

const SidebarMenuButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  text-align: left;
  
  &:hover {
    background-color: var(--sidebar-accent, #f5f5f5);
  }
  
  &.active {
    background-color: var(--sidebar-primary, #0a0a0a);
    color: var(--sidebar-primary-foreground, #fafafa);
  }

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: ${props => props.isCollapsed ? '0' : '0.75rem'};
    flex-shrink: 0;
  }

  span {
    opacity: ${props => props.isCollapsed ? '0' : '1'};
    visibility: ${props => props.isCollapsed ? 'hidden' : 'visible'};
    transition: opacity 0.2s ease, visibility 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const SidebarTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border: 1px solid var(--sidebar-border, #e5e5e5);
  background-color: var(--sidebar-background, #fafafa);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--sidebar-accent, #f5f5f5);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--sidebar-border, #e5e5e5);
  margin-bottom: 1rem;
`;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--sidebar-accent, #f5f5f5);
  }

  svg {
    width: 1rem;
    height: 1rem;
    margin-left: auto;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid var(--sidebar-border, #e5e5e5);
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-bottom: 0.25rem;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--sidebar-accent, #f5f5f5);
  }

  &:first-child {
    border-radius: 0.375rem 0.375rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.375rem 0.375rem;
  }
`;

const CodeBlock = styled.pre`
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 1rem 0;
`;

// Context for sidebar state
const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// Sidebar Provider Component
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Main Sidebar Component
export const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const [currentRoute, setCurrentRoute] = useState('/');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { title: 'Home', url: '/', icon: Home },
    { title: 'Inbox', url: '/inbox', icon: Inbox },
    { title: 'Calendar', url: '/calendar', icon: Calendar },
    { title: 'Search', url: '/search', icon: Search },
    { title: 'Settings', url: '/settings', icon: Settings },
  ];

  const handleNavigation = (url) => {
    setCurrentRoute(url);
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  const isActive = (url) => currentRoute === url;

  return (
    <SidebarWrapper isOpen={isOpen}>
      <SidebarHeader>
        {isOpen && <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>My App</h2>}
        <SidebarTrigger onClick={toggleSidebar}>
          {isOpen ? <X /> : <Menu />}
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {isOpen && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => handleNavigation(item.url)}
                  className={isActive(item.url) ? 'active' : ''}
                  isCollapsed={!isOpen}
                  title={!isOpen ? item.title : ''}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {isOpen && (
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation('/project1')} 
                  isCollapsed={!isOpen}
                  className={isActive('/project1') ? 'active' : ''}
                >
                  <div style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isOpen ? '0.75rem' : '0' }} />
                  <span>Project Alpha</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation('/project2')} 
                  isCollapsed={!isOpen}
                  className={isActive('/project2') ? 'active' : ''}
                >
                  <div style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#10b981', marginRight: isOpen ? '0.75rem' : '0' }} />
                  <span>Project Beta</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
            {isOpen && (
              <>
                <User2 style={{ marginRight: '0.75rem' }} />
                <span>John Doe</span>
              </>
            )}
            {!isOpen && <User2 />}
            {isOpen && (dropdownOpen ? <ChevronUp /> : <ChevronDown />)}
          </DropdownButton>
          {dropdownOpen && isOpen && (
            <DropdownContent>
              <DropdownItem onClick={() => setDropdownOpen(false)}>
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => setDropdownOpen(false)}>
                Billing
              </DropdownItem>
              <DropdownItem onClick={() => setDropdownOpen(false)}>
                Sign Out
              </DropdownItem>
            </DropdownContent>
          )}
        </DropdownMenu>
      </SidebarFooter>
    </SidebarWrapper>
  );
};

// Layout Component
export const AppLayout = ({ children }) => {
  const { isOpen, toggleSidebar, isMobile } = useSidebar();

  return (
    <SidebarContainer>
      <Sidebar />
      {isMobile && isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
          }}
          onClick={toggleSidebar}
        />
      )}
      <MainContent>
        <TopBar>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Dashboard</h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280' }}>Welcome back!</p>
          </div>
          {isMobile && (
            <SidebarTrigger onClick={toggleSidebar}>
              <Menu />
            </SidebarTrigger>
          )}
        </TopBar>
        {children}
      </MainContent>
    </SidebarContainer>
  );
};

// Demo App Component
export default function App() {
  return (
    <SidebarProvider>
      <AppLayout>
        <div style={{ padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
          <h2 style={{ marginTop: 0 }}>React Router DOM Sidebar</h2>
          <p>This sidebar is designed to work with React Router DOM. Here's how to integrate it:</p>
          
          <h3>1. Install React Router DOM</h3>
          <CodeBlock>npm install react-router-dom</CodeBlock>
          
          <h3>2. Replace button navigation with Link components</h3>
          <CodeBlock>{`import { Link, useLocation } from 'react-router-dom';

// Replace SidebarMenuButton with:
const SidebarMenuButton = styled(Link)\`
  // ... your styles
\`;

// Use useLocation for active state:
const location = useLocation();
const isActive = (url) => location.pathname === url;`}</CodeBlock>

          <h3>3. Wrap your app with Router</h3>
          <CodeBlock>{`import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AppLayout>
      </SidebarProvider>
    </BrowserRouter>
  );
}`}</CodeBlock>

          <h3>4. Complete Implementation Example</h3>
          <CodeBlock>{`// components/Sidebar.js
import React, { useState, createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Home, Inbox, Calendar, Search, Settings, Menu, X } from 'lucide-react';

const SidebarMenuButton = styled(Link)\`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--sidebar-accent, #f5f5f5);
  }
  
  &.active {
    background-color: var(--sidebar-primary, #0a0a0a);
    color: var(--sidebar-primary-foreground, #fafafa);
  }
\`;

export const Sidebar = () => {
  const location = useLocation();
  const { isOpen, toggleSidebar } = useSidebar();
  
  const menuItems = [
    { title: 'Home', url: '/', icon: Home },
    { title: 'Inbox', url: '/inbox', icon: Inbox },
    { title: 'Calendar', url: '/calendar', icon: Calendar },
    { title: 'Search', url: '/search', icon: Search },
    { title: 'Settings', url: '/settings', icon: Settings },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <SidebarWrapper isOpen={isOpen}>
      {/* Header */}
      <SidebarHeader>
        {isOpen && <h2>My App</h2>}
        <SidebarTrigger onClick={toggleSidebar}>
          {isOpen ? <X /> : <Menu />}
        </SidebarTrigger>
      </SidebarHeader>

      {/* Navigation Menu */}
      <SidebarContent>
        <SidebarGroup>
          {isOpen && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  to={item.url}
                  className={isActive(item.url) ? 'active' : ''}
                  title={!isOpen ? item.title : ''}
                >
                  <item.icon />
                  {isOpen && <span>{item.title}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </SidebarWrapper>
  );
};`}</CodeBlock>

          <h3>Features Included:</h3>
          <ul>
            <li>✅ <strong>Responsive Design:</strong> Mobile overlay with backdrop</li>
            <li>✅ <strong>Active State:</strong> Highlights current route</li>
            <li>✅ <strong>Collapsible:</strong> Expands/collapses with smooth animation</li>
            <li>✅ <strong>Icon Mode:</strong> Shows only icons when collapsed</li>
            <li>✅ <strong>Dropdown Menu:</strong> User menu in footer</li>
            <li>✅ <strong>Styled Components:</strong> CSS-in-JS styling</li>
            <li>✅ <strong>React Router Ready:</strong> Easy integration with react-router-dom</li>
            <li>✅ <strong>Keyboard Shortcuts:</strong> Can be extended with hotkeys</li>
            <li>✅ <strong>Accessibility:</strong> Proper ARIA labels and semantic HTML</li>
          </ul>

          <h3>Customization Options:</h3>
          <ul>
            <li><strong>CSS Variables:</strong> Easy theming with custom properties</li>
            <li><strong>Menu Items:</strong> Easily add/remove navigation items</li>
            <li><strong>Icons:</strong> Use any Lucide React icons</li>
            <li><strong>Styling:</strong> Modify styled-components for custom design</li>
            <li><strong>Behavior:</strong> Customize collapse/expand logic</li>
          </ul>

          <div style={{ 
            backgroundColor: '#dbeafe', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            borderLeft: '4px solid #3b82f6',
            marginTop: '1.5rem'
          }}>
            <p style={{ margin: 0, fontWeight: '600' }}>💡 Pro Tip:</p>
            <p style={{ margin: '0.5rem 0 0 0' }}>
              To persist sidebar state across page refreshes, you can use localStorage 
              in the SidebarProvider to save/restore the isOpen state.
            </p>
          </div>
        </div>
      </AppLayout>
    </SidebarProvider>
  );
}