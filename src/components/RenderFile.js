import React from 'react';
import 'tailwindcss/tailwind.css';

import { sizeInMbs } from '../../libs/sizeInMbs';

const RenderFile = ({ file: { format, sizeInBytes, name } }) => {
  return (
    <div
    style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '1rem', // p-4
      margin: '0.5rem 0', // my-2
    }}
  >
    <img
      src={`/images/${format}.png`}
      alt="image"
      style={{
        height: '3.5rem', // h-14
        width: '3.5rem', // w-14
      }}
    />
    <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>{name}</span> {/* mx-2 */}
    <span style={{ marginLeft: 'auto' }}>{sizeInMbs(sizeInBytes)}</span> {/* ml-auto */}
  </div>
  
  );
};

export default RenderFile;
