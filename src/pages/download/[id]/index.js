import axios from 'axios';
import React from 'react'
import RenderFile from '../../../components/RenderFile';
import 'tailwindcss/tailwind.css';
import filesDownload from 'js-file-download'

const Page = ({ file: { format, sizeInBytes, id, name } }) => {
  
  const handleDownload = async () => { 
    const {data} = await axios.get(`https://share-filesy-backend.onrender.com/api/files/${id}/download`,{
        responseType:"blob"
    });
   
    filesDownload(data,name.toString())

 }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#6b7280', // bg-slate-400
      }}
    >
      <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '0.75rem', // py-3
        paddingBottom: '0.75rem', // py-3
        paddingLeft: '1rem', // px-3
        paddingRight: '1rem', // px-3
        gap: '1rem', // space-y-4
        backgroundColor: 'black', // bg-black
        color: 'white', // text-white
        borderRadius: '0.375rem', // rounded-md
        boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)', // shadow-xl
        width: '24rem', // w-96
      }}>
        {!id ? (
          <span>oops! file does not exist! check the URL</span>
        ) : (
          <>
            <img
              src="/images/download.png"
              alt="download"
              style={{
                width: '4rem', // w-16
                height: '4rem', // h-16
              }}
            />
            <h1 style={{ fontSize: '1.25rem' }}>Your file is ready to be downloaded</h1>
            <RenderFile file={{ format, name, sizeInBytes }} />
            <button
              style={{
                width: '11rem', // w-44
                backgroundColor: '#4b5563', // bg-gray-700
                marginTop: '0.625rem', // my-5
                height: '2.5rem', // h-10
                borderRadius: '0.375rem', // rounded
                outline: 'none', // focus:outline-none
              }}
              onClick={handleDownload}
            >
              Download
            </button>
          </>
        )}
      </div>
    </div>

  )
}

export default Page

export async function getServerSideProps(context) {

  const { id } = context.query
  let file;
  try {

    const { data } = await axios.get(`https://share-filesy-backend.onrender.com/api/files/${id}`)
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