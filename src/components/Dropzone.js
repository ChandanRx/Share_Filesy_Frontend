"use client"
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ setFile }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            console.log(acceptedFiles);
            setFile(acceptedFiles[0]);
        },
        []
    );

    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'audio/mpeg': ['.mp3'],
        }
    });

    return (
        <div className="w-full p-4">
            <div {...getRootProps()} className="h-80 w-full rounded-md cursor-pointer focus:outline-none">
                <input {...getInputProps()} />

                <div className={"flex flex-col items-center justify-center border-2 border-yellow-200 h-full space-y-3 border-double rounded " +
                    (isDragReject === true ? "border-red-600" : "") +
                    (isDragAccept === true ? "border-green-600" : "")
                }>
                    <img src="/images/folder.png" alt="folder" className="h-16 w-20" />

                    {isDragReject ? (<p>Sorry,This App only support Images and Mp3</p>) :
                        (
                            <>
                                <p>Drag & Drop Files Here...</p>
                                <p className="mt-2 text-base text-gray-300">only jpeg, png & mp3 files supported</p>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Dropzone;
