import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-xl border border-input/90 bg-background/90 px-3 py-2 text-base shadow-[inset_0_1px_0_rgb(255_255_255_/_0.18)] transition-[border-color,box-shadow,background-color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/85 hover:border-border focus-visible:border-primary/55 focus-visible:bg-background focus-visible:ring-4 focus-visible:ring-primary/12 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/45 disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive aria-invalid:bg-destructive/5 aria-invalid:ring-4 aria-invalid:ring-destructive/12 md:text-sm dark:bg-input/25 dark:hover:bg-input/35 dark:disabled:bg-input/70 dark:aria-invalid:border-destructive/60",
        className
      )}
      {...props}
    />
  )
}

export { Input }
