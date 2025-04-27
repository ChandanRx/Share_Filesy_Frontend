"use client"
import React, { useState } from 'react'
import Dropzone from './Dropzone';
import RenderFile from './RenderFile';
import axios from 'axios';
import api from "../../utils/api"
import DownloadFile from './DownloadFile';
import EmailForm from './EmailForm';


axios.defaults.baseURL = "https://share-filesy-backend.onrender.com/"

const File = () => {
    const [file, setFile] = useState(null)
    const [downloadPageLink, setDownloadPageLink] = useState(null)
    const [id, setId] = useState(null)
    const [uploadState, setUploadState] = useState("Upload" || "Uploading" || "Uploaded" || "Upload failed");


    const handleUpload = async () => {
        if (uploadState === "uploading") return
        setUploadState("uploading")
        const formData = new FormData()
        formData.append("myFile", file)

        try {
            const { data } = await api.post('/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setDownloadPageLink(data.downloadPageLink);
            setId(data.id);
        } catch (error) {
            console.log(error);
            setUploadState('upload failed')
        }
    }

    const resetComponent = () =>{
        setFile(null)
        setDownloadPageLink(null)
       }

    return (
        <div className="flex flex-col items-center justify-center p-2">
            <h1 className="my-4 text-xl font-semibold sm:text-xl md:text-2xl lg:text-3xl">Got a file ? share it like happiness ❤️</h1>
            <div className="flex flex-col items-center justify-center bg-black shadow-xl w-96 rounded-xl">
               {
               !downloadPageLink && <Dropzone setFile={setFile} />
               }

                {file && (
                    <RenderFile
                        file={{
                            format: file?.type?.split("/")[1],
                            name: file?.name,
                            sizeInBytes: file?.size,
                        }}
                    />
                )}
                {
                    !downloadPageLink && file &&
                    <button className="h-10 my-5 bg-gray-700 rounded w-44 focus:outline-none" onClick={() => handleUpload()}>
                        {uploadState}
                    </button>
                }

                {
                    downloadPageLink && 
                    <div className="p-2 text-center">
                        <DownloadFile downloadPageLink={downloadPageLink} />
                        <EmailForm id={id}/>
                        <button className="h-10 my-5 bg-gray-700 rounded w-44 focus:outline-none" onClick={resetComponent}>
                            upload new file
                        </button>

                    </div>
                }
            </div>
        </div>
    )
}

export default File;