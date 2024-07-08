import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(350px, 1fr))',
        settings: 'repeat(auto-fit, minmax(180px, 1fr))',
      },
      colors: {
        red_base_color: '#EE565F',
        blue_base_color: '#4772E1',
        background_color: '#91CD7A',
        white_base_color: '#D9D9D9',
      },
      dropShadow: {
        xl: '4px 4px 4px rgba(0, 0, 0, .5)',
      },
      boxShadow: {
        inner: 'inset 4px 0px 4px 0px rgba(0, 0, 0, .18)',
      },
    },
  },
  plugins: [],
}
export default config
