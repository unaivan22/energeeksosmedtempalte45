import React from 'react'
import Lottie from 'react-lottie-player';
import uploadfileData from '../../lottie/upload.json';

export default function UploadAnimation() {
  return (
    <Lottie
        play
        loop
        animationData={uploadfileData}
        className='w-52 h-52'
        />
  )
}
