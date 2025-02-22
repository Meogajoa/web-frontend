import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/svgs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      brand: ['var(--font-brand)', 'sans-serif'],
    },
    fontSize: {
      sm: ['0.75rem', { lineHeight: '0.875rem' }], // 12px
      base: ['0.875rem', { lineHeight: '1rem' }], // 14px
      lg: ['1rem', { lineHeight: '1.188rem' }], // 16px
      xl: ['1.125rem', { lineHeight: '1.313rem' }], // 18px
      '2xl': ['1.25rem', { lineHeight: '1.438rem' }], // 20px
      '3xl': ['1.5rem', { lineHeight: '1.75rem' }], // 24px
    },
    extend: {
      boxShadow: {
        bottom: '0px 4px 5px rgba(0, 0, 0, 0.08)',
        top: '0px -4px 5px rgba(0, 0, 0, 0.08)',
      },
    },
  },
} satisfies Config;
