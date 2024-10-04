/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "Login": "500px",
        "ContenedorTablaVendidos": "500px",
      },
      height: {
        "Login": "500px",
        "ContenedorTablaVendidos": "450px",
        "ContenedorMobileTablaVendidos": "600px"
      },
      gridAutoRows: {
        "TablaVendidos": "50px"
      },
      backgroundImage: {
        "desktop-background": "URL(https://wallpapers.com/images/hd/hidden-view-of-a-peaceful-lake-rb6fp97kp5xx4vmg.jpg)",
        "mobile-background": "URL(https://w0.peakpx.com/wallpaper/704/351/HD-wallpaper-paisaje-belleza-naturaleza-thumbnail.jpg)"
      },
      keyframes: {
        cargando: {
          "to": {
            transform: "rotate(360deg)"
          }
        }
      },
      animation: {
        "cargando": "cargando 1.3s ease infinite"
      },
      
    },
  },
  plugins: [],
}

