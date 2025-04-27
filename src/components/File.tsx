"use client";
import { useState } from "react";
import Dropzone from "./Dropzone";
import RenderFile from "./RenderFile";
import axios from "axios";
import api from "../utils/api";
import DownloadFile from "./DownloadFile";
import EmailForm from "./EmailForm";

axios.defaults.baseURL = "http://localhost:8000/";

type FileData = {
  type: string;
  name: string;
  size: number;
};

const File = () => {
  const [file, setFile] = useState<FileData | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [downloadPageLink, setDownloadPageLink] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload");

  const handleUpload = async () => {
    if (uploadState === "Uploading") return;

    setUploadState("Uploading");

    const formData = new FormData();
    //@ts-ignore
    formData.append("myFile", file);

    try {
      const { data } = await api.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDownloadPageLink(data.downloadPageLink);
      setId(data.id);
      setUploadState("Uploaded");
    } catch (error) {
      console.error(error);
      setUploadState("Upload Failed");
    }
  };

  const resetComponent = () => {
    setFile(null);
    setDownloadPageLink(null);
    setUploadState("Upload");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gradient-to-br from-[#98FF98] via-[#66FF66] to-[#3CB371] w-full">
      <h1 className="my-6 text-3xl font-bold text-center text-white sm:text-4xl md:text-5xl">
        Got a file? Share it like happiness💘
      </h1>

      <div className="w-full max-w-md bg-[#F5FFFA] backdrop-blur-md border-2 border-[#66FF66] rounded-2xl shadow-[0_0_15px_2px_rgba(102,255,102,0.5)] p-8 flex flex-col items-center justify-center space-y-6">
        {/* Dropzone */}
        {!downloadPageLink && <Dropzone setFile={setFile} />}

        {/* Render file */}
        {file && (
          <RenderFile
            file={{
              format: file.type.split("/")[1],
              name: file.name,
              sizeInBytes: file.size,
            }}
          />
        )}

        {/* Upload button */}
        {!downloadPageLink && file && (
          <button
            onClick={handleUpload}
            className="w-44 bg-gradient-to-r from-[#3CB371] to-[#2E8B57] hover:from-[#2E8B57] hover:to-[#2C6B43] text-white font-semibold py-2 rounded-lg transition-all hover:scale-105 focus:outline-none"
          >
            {uploadState}
          </button>
        )}

        {/* Download link and email form */}
        {downloadPageLink && (
          <div className="flex flex-col items-center space-y-4">
            <DownloadFile downloadPageLink={downloadPageLink} />
            <EmailForm id={id} />

            <button
              onClick={resetComponent}
              className="w-44 bg-gradient-to-r from-[#8F8F8F] to-[#A9A9A9] hover:from-[#7D7D7D] hover:to-[#8A8A8A] text-white font-semibold py-2 rounded-lg transition-all hover:scale-105 focus:outline-none"
            >
              Upload New File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default File;
