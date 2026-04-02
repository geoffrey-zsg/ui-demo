"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex items-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default:
          "w-fit justify-center rounded-xl border border-[color-mix(in_oklch,var(--color-border)_90%,var(--color-primary)_10%)] bg-[color-mix(in_oklch,var(--color-card)_95%,var(--color-muted)_5%)] p-1 shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--color-border)_92%,transparent)] group-data-horizontal/tabs:min-h-10",
        line:
          "w-full gap-0 rounded-none border-b border-border bg-transparent p-0 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        // Base shared styles
        "relative inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-all duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Default variant
        "group-data-[variant=default]/tabs-list:h-full group-data-[variant=default]/tabs-list:flex-1 group-data-[variant=default]/tabs-list:rounded-lg group-data-[variant=default]/tabs-list:border group-data-[variant=default]/tabs-list:border-transparent group-data-[variant=default]/tabs-list:px-3 group-data-[variant=default]/tabs-list:py-2 group-data-[variant=default]/tabs-list:text-foreground/68 group-data-[variant=default]/tabs-list:hover:-translate-y-px group-data-[variant=default]/tabs-list:hover:text-foreground group-data-[variant=default]/tabs-list:hover:bg-background group-data-[variant=default]/tabs-list:hover:border-border/80 group-data-[variant=default]/tabs-list:data-active:bg-background group-data-[variant=default]/tabs-list:data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:border-[color-mix(in_oklch,var(--color-border)_76%,var(--color-primary)_24%)] group-data-[variant=default]/tabs-list:data-active:-translate-y-px group-data-[variant=default]/tabs-list:data-active:shadow-[0_12px_24px_color-mix(in_oklch,var(--color-primary)_16%,transparent)]",
        // Line variant
        "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:border-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:px-5 group-data-[variant=line]/tabs-list:py-3 group-data-[variant=line]/tabs-list:text-muted-foreground group-data-[variant=line]/tabs-list:hover:text-foreground group-data-[variant=line]/tabs-list:hover:bg-muted/50 group-data-[variant=line]/tabs-list:data-active:text-foreground group-data-[variant=line]/tabs-list:data-active:font-semibold group-data-[variant=line]/tabs-list:data-active:hover:bg-transparent",
        // Line variant bottom indicator (flush with border, uses app-highlight for visibility across all themes)
        "group-data-[variant=line]/tabs-list:after:absolute group-data-[variant=line]/tabs-list:after:bottom-[-1px] group-data-[variant=line]/tabs-list:after:left-0 group-data-[variant=line]/tabs-list:after:right-0 group-data-[variant=line]/tabs-list:after:h-[2px] group-data-[variant=line]/tabs-list:after:bg-[var(--app-highlight,var(--color-primary))] group-data-[variant=line]/tabs-list:after:scale-x-0 group-data-[variant=line]/tabs-list:after:transition-transform group-data-[variant=line]/tabs-list:after:duration-200 group-data-[variant=line]/tabs-list:data-active:after:scale-x-100",
        // Focus visible
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
