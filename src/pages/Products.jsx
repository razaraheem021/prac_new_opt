import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Package } from 'lucide-react'

const Products = () => {
  const products = [
    { id: 1, name: 'Laptop Pro', price: '$1,299', status: 'In Stock', category: 'Electronics' },
    { id: 2, name: 'Wireless Headphones', price: '$199', status: 'Low Stock', category: 'Audio' },
    { id: 3, name: 'Smart Watch', price: '$399', status: 'In Stock', category: 'Wearables' },
    { id: 4, name: 'Gaming Mouse', price: '$79', status: 'Out of Stock', category: 'Accessories' },
    { id: 5, name: 'USB-C Hub', price: '$49', status: 'In Stock', category: 'Accessories' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'text-green-600 bg-green-100'
      case 'Low Stock':
        return 'text-yellow-600 bg-yellow-100'
      case 'Out of Stock':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and catalog
          </p>
        </div>
        <Button asChild>
          <Link to="/products/create" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Total Products</span>
          </div>
          <p className="text-2xl font-bold mt-2">248</p>
        </div>
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">In Stock</span>
          </div>
          <p className="text-2xl font-bold mt-2">187</p>
        </div>
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium">Low Stock</span>
          </div>
          <p className="text-2xl font-bold mt-2">41</p>
        </div>
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium">Out of Stock</span>
          </div>
          <p className="text-2xl font-bold mt-2">20</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-md border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Product List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="h-12 px-4 text-left align-middle font-medium">Product</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-4 align-middle">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">ID: {product.id}</div>
                  </td>
                  <td className="p-4 align-middle">{product.category}</td>
                  <td className="p-4 align-middle font-medium">{product.price}</td>
                  <td className="p-4 align-middle">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/products/edit">
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Products 