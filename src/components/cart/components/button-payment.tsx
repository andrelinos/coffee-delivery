import { forwardRef, InputHTMLAttributes, LegacyRef } from 'react'

import { Label } from '@/components/ui/label'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  isSelected: boolean
}

export const RadioButton = forwardRef(function Radio(
  { children, isSelected, ...rest }: Props,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <Label
      data-state={isSelected}
      className="data-[state=true]:bg-purple-200 dark:data-[state=true]:bg-purple-200 border dark:text-white dark:bg-transparent dark:border-gray-400 dark:data-[state=true]:text-gray-600 font-normal text-brand-gray-600 data-[state=true]:text-gray-600 h-10 border-transparent bg-gray-300/60 data-[state=true]:border-purple-500 flex justify-center items-center rounded-md gap-2 text-xs"
    >
      <input type="radio" ref={ref} {...rest} className="hidden" />
      {children}
    </Label>
  )
})
