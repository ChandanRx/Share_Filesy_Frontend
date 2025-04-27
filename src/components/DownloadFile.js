import React from 'react'

const DownloadFile = ({ downloadPageLink }) => {
  return (
    <div className='p-4'>
        <h1 className='my-2 text-lg font-medium text-black'>
            Great! File is uploaded. Share this link with your friend:
        </h1>
        <div className='flex space-x-3 items-center'>
            <span className='break-all text-[#2F4F4F]'>{downloadPageLink}</span>
            <img 
                src="/images/icons8-copy-48.png" 
                alt="copy" 
                className='w-8 h-8 object-contain cursor-pointer bg-black'
                onClick={() => navigator.clipboard.writeText(downloadPageLink)} 
            />
        </div>
    </div>
  )
}

export default DownloadFile;
