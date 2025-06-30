import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.95] active:bg-primary/80 active:shadow-inner transition-all duration-150 ease-in-out",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.95] active:bg-destructive/80 active:shadow-inner transition-all duration-150 ease-in-out focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-[0.95] active:bg-accent/80 active:shadow-inner transition-all duration-150 ease-in-out dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary hover:scale-[1.02] active:scale-[0.95] active:bg-secondary/70 active:shadow-inner transition-all duration-150 ease-in-out",
        'stnOne-secondary':
          "bg-stn-secondary stn-secondary-foreground shadow-xs hover:bg-stn-secondary/80 hover:scale-[1.02] active:scale-[0.95] active:bg-stn-secondary/70 active:shadow-inner transition-all duration-150 ease-in-out",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-[0.95] active:bg-accent/80 transition-all duration-150 ease-in-out dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline active:text-primary/80 transition-all duration-150 ease-in-out",
        'stnOne-primary':
          "bg-stn-one text-stn-one-foreground shadow-xs hover:bg-stn-one/90 hover:shadow-md hover:scale-[1.02] active:scale-[0.95] active:bg-stn-one/80 active:shadow-inner transition-all duration-150 ease-in-out cursor-pointer",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    (<Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />)
  );
}

export { Button, buttonVariants }
