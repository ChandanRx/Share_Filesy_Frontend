import React, { FunctionComponent } from 'react'
import { Ifile } from '../../libs/types';
import { sizeInMbs } from '../../libs/sizeInMbs';

const RenderFile:FunctionComponent<{
    file:Ifile
}> = ({file : {format , sizeInBytes , name}}) => {
  return (
    <div className='flex items-center w-full p-4 my-2 '>
        <img src={`/images/${format}.png`} alt="image" className='h-14 w-14'/>
        <span className='mx-2'>{name}</span>
        <span className='ml-auto'>{sizeInMbs(sizeInBytes)}</span>
    </div>
  )
}

export default RenderFile;