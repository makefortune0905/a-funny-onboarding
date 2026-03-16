import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  'w-full rounded-md border border-input/90 bg-background/90 px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 outline-none transition-[color,box-shadow,border-color] duration-200 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:border-primary/50 focus-visible:ring-[0.1875rem] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30',
      },
      size: {
        sm: 'h-8',
        default: 'h-9',
        lg: 'h-10 text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
