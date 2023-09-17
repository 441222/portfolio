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
        'xl': '1.2rem', 
      },
      borderColor: {
        'neumo-border': '0.3px, solid, rgba(255, 255, 255, 0.1)',
      },

      fontFamily: {
        'noto-sans': ['Noto Sans JP', 'sans'],
      },
      textColor: {
        'white': '#ffffff', // デフォルトフォントカラーを白に変更
      },
      
    },
  },
  variants: {},
  plugins: [],
}
export default config
