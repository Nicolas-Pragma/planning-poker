import { cva } from 'class-variance-authority';

export const avatar = cva('bg-avatar flex items-center justify-center rounded-full', {
  variants: {
    size: {
      small: 'w-9 h-9',
      medium: 'w-14 h-14',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});
