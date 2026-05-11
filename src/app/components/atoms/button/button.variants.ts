import { cva } from 'class-variance-authority';

export const button = cva('w-40 min-h-10 rounded-4xl font-semibold text-base cursor-pointer', {
  variants: {
    variant: {
      primary:
        'bg-background-button text-primary disabled:bg-disabled disabled:text-disabled-text disabled:cursor-not-allowed',
      secondary: 'bg-glow-purple text-background-button',
      tertiary: 'bg-transparent border border-background-button text-background-button',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
