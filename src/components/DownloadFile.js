import React from 'react';

const DownloadFile = ({ downloadPageLink }) => {
  return (
    <div className='p-1'>
      <h1 className='my-2 text-lg font-medium'>Great! File is uploaded. Share this link with your friend:</h1>
      <div className='flex space-x-3'>
        <span className='break-all'>{downloadPageLink}</span>
        <img 
          src="/images/icons8-copy-48.png" 
          alt="copy" 
          className='w-8 h-8 object-contain cursor-pointer'
          onClick={() => navigator.clipboard.writeText(downloadPageLink)} 
        />
      </div>
    </div>
  );
};

export default DownloadFile;
