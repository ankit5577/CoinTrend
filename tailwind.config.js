/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#e6e7ee',
  			primary: '#4B40EE',
  			secondary: '#1A243A',
  			destructive: '#FF0000',
  			'destructive-foreground': '#FFFFFF',
  			greenHighlight: '#67BF6B',
  			grey: '#6F7177'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			shimmer: {
  				'0%': {
  					transform: 'translateX(-100%) rotate(30deg)'
  				},
  				'100%': {
  					transform: 'translateX(200%) rotate(30deg)'
  				}
  			},
  			wiggle: {
  				'0%, 100%': {
  					transform: 'rotate(-3deg)'
  				},
  				'50%': {
  					transform: 'rotate(3deg)'
  				}
  			},
  			'fade-in-down': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-out-up': {
  				from: {
  					opacity: '1',
  					transform: 'translateY(0px)'
  				},
  				to: {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				}
  			},
  			'fade-in-left': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(10px)',
  					visibility: 'hidden'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0px)',
  					visibility: 'visible'
  				}
  			},
  			'fade-out-left': {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'translateX(10px)',
  					visibility: 'hidden'
  				}
  			},
  			'fade-in-right': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(10px)'
  				}
  			}
  		},
  		animation: {
  			shimmer: 'shimmer 2.5s ease-in-out infinite',
  			wiggle: 'wiggle 1s ease-in-out infinite',
  			'fade-in-down': 'fade-in-down 0.5s ease-out',
  			'fade-in-up': 'fade-in-up 0.5s ease-out',
  			'fade-out-up': 'fade-out-up 0.5s ease-out',
  			'fade-in-left': 'fade-in-left 0.5s ease-out',
  			'fade-out-left': 'fade-out-left 0.5s ease-out',
  			'fade-in-right': 'fade-in-left 0.5s ease-out'
  		}
  	}
  },
    plugins: [require("tailwindcss-animate")]
}

