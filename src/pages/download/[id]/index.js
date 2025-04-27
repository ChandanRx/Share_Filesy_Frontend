import axios from 'axios';
import React from 'react';
import RenderFile from '@/components/RenderFile';
import filesDownload from 'js-file-download';

const DownloadPage = ({ file: { format, sizeInBytes, id, name } }) => {

    const handleDownload = async () => { 
        const { data } = await axios.get(`https://share-filesy-backend.onrender.com//api/files/${id}/download`, {
            responseType: "blob"
        });

        filesDownload(data, name.toString());
    }

    return (
        <div className='flex flex-row items-center justify-center h-screen bg-[#F1F8F6]'>
            <div className='flex flex-col items-center justify-center py-6 space-y-6 bg-[#2F4F4F] text-white rounded-md shadow-xl w-96'>
                {
                    !id ? <span className="text-red-400 font-semibold">Oops! File does not exist. Please check the URL.</span> : <>
                        <img src="/images/download.png" alt="download" className='w-16 h-16 opacity-90 mb-4' />
                        <h1 className='text-xl font-semibold'>Your file is ready to download</h1>
                        <RenderFile file={{ format, name, sizeInBytes }} />
                        <button 
                            className='w-44 bg-[#3A5A40] my-5 h-10 rounded focus:outline-none hover:bg-[#4b6d55] transition-all'
                            onClick={handleDownload}
                        >
                            Download
                        </button>
                    </>
                }
            </div>
        </div>
    );
}

export default DownloadPage;

export async function getServerSideProps(context) {

    const { id } = context.query;
    let file;
    try {
        const { data } = await axios.get(`http://localhost:8000/api/files/${id}`);
        file = data;
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            file,
        },
    };
}
