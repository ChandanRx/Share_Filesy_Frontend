import "tailwindcss/tailwind.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/"

function MyApp({ Component, pageProps } : any) {
  return <Component {...pageProps}  />;
}

export default MyApp;
