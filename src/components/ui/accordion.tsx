"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const AccordionContext = React.createContext<{
  value: string | null
  onValueChange: (value: string) => void
}>({
  value: null,
  onValueChange: () => {},
})

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}

export function Accordion({
  className,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string | null>(
    value || defaultValue || null
  )

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (type === "single") {
        const adjustedValue = internalValue === newValue ? null : newValue
        setInternalValue(adjustedValue)
        onValueChange?.(adjustedValue || "")
      } else if (type === "multiple") {
        // For multiple, we would need additional logic
        // But for simplicity, just toggle the current value
        setInternalValue(newValue)
        onValueChange?.(newValue)
      }
    },
    [internalValue, onValueChange, type]
  )

  // Update internal value when controlled value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  return (
    <AccordionContext.Provider
      value={{ value: internalValue, onValueChange: handleValueChange }}
    >
      <div className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

export function AccordionItem({
  className,
  value,
  disabled = false,
  children,
  ...props
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border rounded-md overflow-hidden",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      data-state={disabled ? "disabled" : "enabled"}
      data-value={value}
      {...props}
    >
      {children}
    </div>
  )
}

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { value, onValueChange } = React.useContext(AccordionContext)
  const accordionItem = React.useRef<HTMLDivElement>(null)
  const itemValue = accordionItem.current?.dataset.value || ""
  const isOpen = value === itemValue

  // Get the parent AccordionItem
  React.useEffect(() => {
    let parent = null
    if (accordionItem.current) {
      parent = accordionItem.current.closest("[data-value]") as HTMLDivElement
      if (parent) {
        accordionItem.current = parent
      }
    }
  }, [])

  return (
    <button
      className={cn(
        "flex w-full justify-between items-center font-medium p-4 text-left",
        "text-sm transition-all hover:bg-gray-100",
        className
      )}
      onClick={() => {
        const value = accordionItem.current?.dataset.value || ""
        if (value) {
          onValueChange(value)
        }
      }}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen ? "transform rotate-180" : ""
        )}
      />
    </button>
  )
}

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean
}

export function AccordionContent({
  className,
  children,
  forceMount,
  ...props
}: AccordionContentProps) {
  const { value } = React.useContext(AccordionContext)
  const accordionItem = React.useRef<HTMLDivElement>(null)
  const [accordionItemValue, setAccordionItemValue] = React.useState("")
  const isOpen = value === accordionItemValue

  // Get the parent AccordionItem
  React.useEffect(() => {
    let parent = null
    if (accordionItem.current) {
      parent = accordionItem.current.closest("[data-value]") as HTMLDivElement
      if (parent) {
        setAccordionItemValue(parent.dataset.value || "")
      }
    }
  }, [])

  if (!forceMount && !isOpen) {
    return null
  }

  return (
    <div
      ref={accordionItem}
      className={cn(
        "overflow-hidden text-sm",
        isOpen ? "animate-accordion-down" : "animate-accordion-up",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="p-4 pt-0">{children}</div>
    </div>
  )
} 