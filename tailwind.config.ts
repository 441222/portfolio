import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'glass-bg': 'rgba(255, 255, 255, 0.1)',  // ガラス効果の背景色
      },
      backdropFilter: {
        'blur': 'blur(4px)',  // ぼかし効果
      },
      boxShadow: {
        'neumo': '20px 20px 60px #bcbcbc, -20px -20px 60px #ffffff',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',  // ガラス効果のシャドウ
      },
      borderRadius: {
        'xl': '1.1rem', 
      },
      borderColor: {
        'neumo-border': 'rgba(255, 255, 255, 0.18)',
      },
      borderWidth: {
        DEFAULT: '1.5px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },


      textColor: {
        'default': '#ffffff',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        serif: ['Noto Serif JP', 'serif'],
        zenKurenaido: ['Zen Kurenaido', 'sans-serif']
      },
      


      
    },
  },
  variants: {},
  plugins: [],
}
export default config
