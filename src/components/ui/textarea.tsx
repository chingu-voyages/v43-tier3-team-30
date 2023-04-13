import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  disabled?: boolean
  required?: boolean
  id: string
  label?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, required, ...props }, ref) => {
    return (
      <div className="flex space-y-1 items-start flex-col">
        {label && (
          <label htmlFor={id} className="text-sm text-gray-800 dark:text-gray-200">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex h-20 w-full rounded-md border border-slate-300 bg-gray-300 dark:bg-[#16181a] py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
