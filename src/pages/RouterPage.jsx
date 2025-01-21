import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home'
import NotFound from './NotFound'
import Forbidden from './Forbidden'
import Documentation from './Documentation';
import PostStyleOne from './layout/posts/PostStyleOne';
import PostStyleTwo from './layout/posts/PostStyleTwo';
import PostStyleThree from './layout/posts/PostStyleThree';
import PostStyleFour from './layout/posts/PostStyleFour';
import ReelStyleOne from './layout/reels/ReelStyleOne';
import FactStyleOne from './layout/facts/FactStyleOne';
import FactStyleTwo from './layout/facts/FactStyleTwo';
import FactStyleThree from './layout/facts/FactStyleThree';
import FactStyleFour from './layout/facts/FactStyleFour';
import JokeStyleOne from './layout/jokes/JokeStyleOne';
import JokeStyleTwo from './layout/jokes/JokeStyleTwo';
import PostStyleFive from './layout/posts/PostStyleFive';
import PostStyleSix from './layout/posts/PostStyleSix';
import PostStyleSeven from './layout/posts/PostStyleSeven';
import PostStyleEight from './layout/posts/PostStyleEight';
import PostStyleNine from './layout/posts/PostStyleNine';
import PostStyleTen from './layout/posts/PostStyleTen';
import QuoteStyleOne from './layout/quotes/QuoteStyleOne';
import PostStyleEleven from './layout/posts/PostStyleEleven';
import PostStyleTwelve from './layout/posts/PostStyleTwelve';
import PostStyleThirteen from './layout/posts/PostStyleThirteen';
import PostStyleFourteen from './layout/posts/PostStyleFourteen';
import PostStyleFifteen from './layout/posts/PostStyleFifteen';
import PostStyleSixteen from './layout/posts/PostStyleSixteen';
import PostStyleSeventeen from './layout/posts/PostStyleSeventeen';

export default function RouterPage() {
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
      <Router>
        {isMobile ? <Forbidden /> :  <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/doc' element={<Documentation/>} />

              <Route path='/post/style-one' element={<PostStyleOne/>} />
              <Route path='/post/style-two' element={<PostStyleTwo/>} />
              <Route path='/post/style-three' element={<PostStyleThree/>} />
              <Route path='/post/style-four' element={<PostStyleFour/>} />
              <Route path='/post/style-five' element={<PostStyleFive/>} />
              <Route path='/post/style-six' element={<PostStyleSix/>} />
              <Route path='/post/style-seven' element={<PostStyleSeven/>} />
              <Route path='/post/style-eight' element={<PostStyleEight/>} />
              <Route path='/post/style-nine' element={<PostStyleNine/>} />
              <Route path='/post/style-ten' element={<PostStyleTen/>} />
              <Route path='/post/style-eleven' element={<PostStyleEleven/>} />
              <Route path='/post/style-twelve' element={<PostStyleTwelve/>} />
              <Route path='/post/style-thirteen' element={<PostStyleThirteen/>} />
              <Route path='/post/style-fourteen' element={<PostStyleFourteen/>} />
              <Route path='/post/style-fifteen' element={<PostStyleFifteen/>} />
              <Route path='/post/style-sixteen' element={<PostStyleSixteen/>} />
              <Route path='/post/style-seventeen' element={<PostStyleSeventeen/>} />

              <Route path='/reel/style-one' element={<ReelStyleOne/>} />

              <Route path='/fact/style-one' element={<FactStyleOne/>} />
              <Route path='/fact/style-two' element={<FactStyleTwo/>} />
              <Route path='/fact/style-three' element={<FactStyleThree/>} />
              <Route path='/fact/style-four' element={<FactStyleFour/>} />

              <Route path='/joke/style-one' element={<JokeStyleOne/>} />
              <Route path='/joke/style-two' element={<JokeStyleTwo/>} />

              <Route path='/quote/style-one' element={<QuoteStyleOne/>} />

              <Route path='*' element={<NotFound/>} />
          </Routes>
        }
        
      </Router>
  )
}