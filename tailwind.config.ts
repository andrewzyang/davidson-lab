import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'arial-nova': ['"Arial Nova"', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#1e40af',
        secondary: '#64748b',
      },
    },
  },
  plugins: [],
}
export default config