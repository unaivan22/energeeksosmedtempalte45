import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'react-lottie-player';
import notfounData from './lottie/notfound.json';

export default function NotFound() {
  return (
    <div className='grid h-screen place-items-center'>
        <div className='flex flex-col items-center gap-2'>
            <Lottie
              play
              loop
              animationData={notfounData}
              className='w-96 h-auto'
              />
            {/* <h1 className='text-4xl font-semibold'>404 Not Found</h1> */}
            <p className='italic font-light text-sm opacity-60 my-2'>Apa yang anda cari di link ini</p>
            <Link to='/'>
                <Button className='rounded-full'>Back to home</Button>
            </Link>
        </div>
    </div>
  )
}
