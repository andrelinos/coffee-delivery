import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: any
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', onError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-auto disabled:cursor-not-allowed disabled:opacity-50',
            className,
          ),
          { 'border border-red-400': onError },
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
