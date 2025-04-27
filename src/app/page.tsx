import File from "@/components/File";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";


export default function Home() {
  return (
    <>
          <File />
    </>
  );
}
