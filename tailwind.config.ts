import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest': '#1F3325',
        'forest-dark': '#172A1D',
        'forest-light': '#2A4533',
        'cream': '#F5EFE3',
        'cream-dark': '#EDE4D3',
        'gold': '#C9A24B',
        'gold-light': '#D4B46A',
        'gold-dark': '#A8842E',
        'body': '#4A4A44',
        'card': '#FFFFFF',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '24px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(31,51,37,0.08)',
        'card-hover': '0 12px 40px rgba(31,51,37,0.16)',
        'gold': '0 4px 20px rgba(201,162,75,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
