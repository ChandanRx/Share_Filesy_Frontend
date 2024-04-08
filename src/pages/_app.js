import "tailwindcss/tailwind.css";
import axios from "axios";


axios.defaults.baseURL = "https://share-filesy-backend.onrender.com/"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps}  />;
}

export default MyApp;
