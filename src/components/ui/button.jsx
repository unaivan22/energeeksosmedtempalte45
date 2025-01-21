
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-t from-primary to-primary/70 text-primary-foreground hover:bg-primary/90 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_0_rgba(0,0,0,0.2)] border border-primary/40",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_0_rgba(0,0,0,0.2)] border border-destructive/40",
        outline:
          "bg-secondary hover:bg-accent hover:text-accent-foreground border border",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary/40",
        ghost: "hover:bg-primary hover:text-accent-foreground bg-transparent border-none hover:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_0_rgba(0,0,0,0.2)] border border-secondary/40",
        link: "text-primary underline-offset-4 hover:underline",
        rounded: "bg-gradient-to-t from-primary to-primary/70 text-primary-foreground hover:bg-primary/90 rounded-full shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_0_rgba(0,0,0,0.2)] border border-primary/40",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-xlg ",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }