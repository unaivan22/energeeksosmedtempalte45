import React from 'react'
import Lottie from 'react-lottie-player';
import ufoData from './lottie/ufo.json';

export default function Forbidden() {
  return (
    <div className='grid h-screen place-items-center'>
        <div className='w-full flex flex-col gap-8 items-center justify-center'>
          {/* <img className='w-60 grayscale' src='/forbidden.svg' /> */}
          <Lottie
            play
            loop
            animationData={ufoData}
            className='w-72 h-72'
            />
          <p>Can only access in desktop or tablet mode</p>
        </div>
    </div>
  )
}
