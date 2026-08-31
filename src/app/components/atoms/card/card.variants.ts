import { cva } from 'class-variance-authority';

export const card = cva(
  'flex justify-center items-center rounded-lg [&>span]:font-semibold',
  {
    variants: {
      variant: {
        primary: 'border border-secondary bg-transparent text-white',
        secondary: 'bg-background-card text-primary shadow-dialog',
        tertiary: 'bg-secondary text-primary shadow-dialog',
      },
      size: {
        small: 'w-9 h-16 max-w-9 max-h-16',
        medium: 'w-12 h-20 max-w-12 max-h-20',
      },
      state: {
        withValuePrimary: 'hover:bg-gray cursor-pointer',
        withValue: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);
