import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'font-semibold text-6xl',
      h2: 'font-medium text-5xl',
      h3: 'font-normal text-4xl',
      h4: 'font-normal text-3xl',
      h5: 'font-normal text-2xl',
      h6: 'font-normal text-xl',
      subhead1: 'font-bold text-base',
      subhead2: 'font-semibold text-sm',
      bodytext1: 'font-normal text-sm',
      bodytext2: 'font-normal text-xs',
      link: 'text-xs underline font-bold',
    },
  },
  defaultVariants: {
    variant: 'bodytext1',
  },
})

const variantsMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subhead1: 'h6',
  subhead2: 'h6',
  bodytext1: 'p',
  bodytext2: 'p',
  link: 'p',
} as const

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement | HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<
  HTMLParagraphElement | HTMLHeadingElement,
  TypographyProps
>(({ className, children, variant, ...props }, ref) => {
  const Component = variant ? variantsMapping[variant] : 'p'
  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
      ref={ref}
    >
      {children}
    </Component>
  )
})

Typography.displayName = 'Typography'

export { Typography, typographyVariants }
