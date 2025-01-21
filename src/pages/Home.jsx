import React, { useEffect, useState } from 'react';
import data from '../pages/data.json'
import Welcome from './Welcome';
import Forbidden from './Forbidden';

export default function Home() {
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
    <div>
      {isMobile ? <Forbidden /> : <Welcome />}
    </div>
  )
}
