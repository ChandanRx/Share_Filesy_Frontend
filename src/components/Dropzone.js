"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, [setFile]);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "audio/mpeg": [".mp3"],
    },
  });

  return (
    <div className="w-full p-4">
      <div
        {...getRootProps()}
        className="h-80 w-full rounded-2xl cursor-pointer focus:outline-none transition-all duration-300 transform hover:scale-105"
      >
        <input {...getInputProps()} />
        <div
          className={`flex flex-col items-center justify-center border-4 h-full border-dashed rounded-2xl p-4 transition-all duration-300
          ${isDragReject
            ? "border-[#FF6347] bg-[#FF6347]/40" // Red for reject
            : isDragAccept
            ? "border-[#66FF66] bg-[#66FF66]/40" // Mint Green for accept
            : "border-[#2F4F4F] bg-[#F5FFFA]/50"} // Charcoal Gray for default
          shadow-[0_0_15px_2px_rgba(102,255,102,0.5)]`}
        >
          <img
            src="/images/Folder-Share.png"
            alt="folder"
            style={{ width: "150px", height: "150px" }}
            className="opacity-90 mb-4"
          />
          {isDragReject ? (
            <p className="mt-4 text-[#FF6347] font-semibold text-lg">
              Sorry, Only JPG, PNG & MP3 allowed
            </p>
          ) : (
            <>
              <p className="mt-4 font-bold text-lg text-black">
                Drag & Drop Files Here...
              </p>
              <p className="mt-2 text-sm text-[#2F4F4F]">
                Only JPEG, PNG & MP3 files supported
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
