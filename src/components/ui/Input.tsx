import { cn } from '@/lib/utils'
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type InputProps = {
  id: string
  label?: string
  type?: string
  disabled?: boolean
  required?: boolean
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, label, required, type = 'text', className = '', placeholder, ...props },
    ref,
  ) => {
    return (
      <div className="flex space-y-1 items-start flex-col">
        {label && (
          <label
            htmlFor={id}
            className="text-sm text-gray-800 dark:text-gray-200"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          name={name}
          type={type}
          ref={ref}
          aria-label={label}
          placeholder={placeholder}
          className={cn(
            'flex h-10 w-full text-black rounded-md border border-slate-300 bg-gray-300 dark:bg-[#16181a] py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 focus:placeholder-transparent focus:delay-100 focus:transition-all focus:ease-in-out focus:-translate-y-[2px] leading-none transition-colors ease-in-out placeholder-gray-400 dark:text-white',
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)

export default Input
