import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/home'
import AllButtons from './pages/AllButtons'
import ForTesting from './pages/ForTesting'
import DataTableTSQ from './pages/DataTable_withTSQ'
import ServerDataTable from './pages/ServerDataTable'
import Products from './pages/Products'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import Analytics from './pages/Analytics'
import AnalyticsReports from './pages/AnalyticsReports'
import AnalyticsCharts from './pages/AnalyticsCharts'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buttons" element={<AllButtons />} />
        <Route path="/testing" element={<ForTesting />} />
        <Route path="/data-table" element={<DataTableTSQ />} />
        <Route path="/server-data" element={<ServerDataTable />} />
        
        {/* Products Routes */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/edit" element={<EditProduct />} />
        
        {/* Analytics Routes */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics/reports" element={<AnalyticsReports />} />
        <Route path="/analytics/charts" element={<AnalyticsCharts />} />
        
        {/* User Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600">Page not found</p>
            </div>
          </div>
        } />
      </Routes>
    </Layout>
  )
}

export default App
