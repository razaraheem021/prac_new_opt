import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useLayoutEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ThemeToggle({ compact = false }) {
  const { theme, setTheme } = useTheme()
  const [checked, setChecked] = useState(false)

  useLayoutEffect(() => {
    setChecked(theme === 'dark')
  }, [theme])

  if (compact) {
    return (
      <div className="flex justify-center">
        <Switch 
          id="theme-toggle-compact"
          checked={checked}
          onCheckedChange={(isChecked) => setTheme(isChecked ? 'dark' : 'light')}
        />
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {/* <Button variant="outline" onClick={() => setTheme('light')}>
        Light
      </Button>
      <Button variant="outline" onClick={() => setTheme('dark')}>
        Dark
      </Button>
      <Button variant="outline" onClick={() => setTheme('system')}>
        System
      </Button>
      <Switch
        checked={checked}
        onCheckedChange={(isChecked) => setTheme(isChecked ? 'dark' : 'light')}
      /> */}
      <div className="flex items-center space-x-2">
        <Switch 
          id="theme-toggle"
          checked={checked}
          onCheckedChange={(isChecked) => setTheme(isChecked ? 'dark' : 'light')} 
        />
        <Label htmlFor="theme-toggle">Theme Toggle</Label>
      </div>
    </div>
  )
}
