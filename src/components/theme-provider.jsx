import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
