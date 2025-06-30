import React from 'react'
import { Button } from '@/components/ui/button'

const AllButtons = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Button Components</h1>
        <p className="text-muted-foreground">
          Explore different button variants and styles available in the UI library.
        </p>
      </div>

      <div className="space-y-6">
        {/* Primary Buttons */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Primary Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="stnOne-primary">STN One Primary</Button>
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        {/* Secondary Buttons */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Secondary Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="stnOne-secondary">STN One Secondary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>

        {/* Other Variants */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Other Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* Size Variations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Size Variations</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* State Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">States</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllButtons