import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'

const EditProduct = () => {
  const [formData, setFormData] = useState({
    name: 'Laptop Pro',
    category: 'electronics',
    price: '1299.00',
    description: 'High-performance laptop with latest specs',
    stock: '25',
    sku: 'LP-001'
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updating product:', formData)
    // Handle form submission
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product')
      // Handle product deletion
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/products" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Products</span>
            </Link>
          </Button>
        </div>
        
        <Button variant="destructive" onClick={handleDelete} className="flex items-center space-x-2">
          <Trash2 className="h-4 w-4" />
          <span>Delete Product</span>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">
          Update product information and inventory
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Information */}
          <div className="space-y-6">
            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-lg font-semibold mb-4">Product Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="audio">Audio</option>
                    <option value="wearables">Wearables</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">SKU</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter SKU"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-6">
            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-lg font-semibold mb-4">Pricing & Inventory</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Created</span>
                  <span className="text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Last updated</span>
                  <span className="text-muted-foreground">1 hour ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock updated</span>
                  <span className="text-muted-foreground">30 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
          <Button variant="outline" asChild>
            <Link to="/products">Cancel</Link>
          </Button>
          <Button type="submit" className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct 