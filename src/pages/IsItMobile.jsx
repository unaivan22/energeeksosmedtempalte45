import React, { useEffect, useState } from 'react';
import Forbidden from './Forbidden';
import Welcome from './Welcome';

export default function IsItMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768); // Change the breakpoint as per your needs
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    <div className='container'>
      {isMobile ? <Forbidden /> : <Welcome />}
    </div>
  )
}
