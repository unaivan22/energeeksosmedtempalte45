import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

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
import CertificateOne from './layout/certificates/CertificateOne';
import CertificateTwo from './layout/certificates/CertificateTwo';
import CertificateThree from './layout/certificates/CertificateThree';
import ProtectedRoute from './ProtectedRoute';
import TwibbonLebaran2025 from './layout/twibbon/TwibbonLebaran2025';
import TwibbonStyleOne from './layout/twibbon/TibbonStyleOne';
import TwibbonStyleTwo from './layout/twibbon/TibbonStyleTwo';
import TibbonStyleThree from './layout/twibbon/TibbonStyleThree';
import PostStyleEighteen from './layout/posts/PostStyleEighteen';

export default function RouterPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280); // Adjust breakpoint as needed
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Allow /twibbon/style-one route for all screen sizes */}
        <Route path='/twibbon/style-lebaran2025' element={<TwibbonLebaran2025 />} />

        {/* Show Forbidden for all other routes on mobile */}
        {isMobile ? (
          <Route path='*' element={<Forbidden />} />
        ) : (
          <>
            {/* <Route path='/' element={<Home />} /> */}
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path='/doc'
              element={
                <ProtectedRoute>
                  <Documentation />
                </ProtectedRoute>
              }
            />


            <Route
              path='/post/style-one'
              element={
                <ProtectedRoute>
                  <PostStyleOne />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-two'
              element={
                <ProtectedRoute>
                  <PostStyleTwo />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-three'
              element={
                <ProtectedRoute>
                  <PostStyleThree />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-four'
              element={
                <ProtectedRoute>
                  <PostStyleFour />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-five'
              element={
                <ProtectedRoute>
                  <PostStyleFive />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-six'
              element={
                <ProtectedRoute>
                  <PostStyleSix />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-seven'
              element={
                <ProtectedRoute>
                  <PostStyleSeven />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-eight'
              element={
                <ProtectedRoute>
                  <PostStyleEight />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-nine'
              element={
                <ProtectedRoute>
                  <PostStyleNine />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-ten'
              element={
                <ProtectedRoute>
                  <PostStyleTen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-eleven'
              element={
                <ProtectedRoute>
                  <PostStyleEleven />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-twelve'
              element={
                <ProtectedRoute>
                  <PostStyleTwelve />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-thirteen'
              element={
                <ProtectedRoute>
                  <PostStyleThirteen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-fourteen'
              element={
                <ProtectedRoute>
                  <PostStyleFourteen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-fifteen'
              element={
                <ProtectedRoute>
                  <PostStyleFifteen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-sixteen'
              element={
                <ProtectedRoute>
                  <PostStyleSixteen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-seventeen'
              element={
                <ProtectedRoute>
                  <PostStyleSeventeen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/style-eighteen'
              element={
                <ProtectedRoute>
                  <PostStyleEighteen />
                </ProtectedRoute>
              }
            />
            
            <Route
              path='/reel/style-one'
              element={
                <ProtectedRoute>
                  <ReelStyleOne />
                </ProtectedRoute>
              }
            />
            
            <Route
              path='/fact/style-one'
              element={
                <ProtectedRoute>
                  <FactStyleOne />
                </ProtectedRoute>
              }
            />
            <Route
              path='/fact/style-one'
              element={
                <ProtectedRoute>
                  <FactStyleOne />
                </ProtectedRoute>
              }
            />
            <Route
              path='/fact/style-two'
              element={
                <ProtectedRoute>
                  <FactStyleTwo />
                </ProtectedRoute>
              }
            />
            <Route
              path='/fact/style-three'
              element={
                <ProtectedRoute>
                  <FactStyleThree />
                </ProtectedRoute>
              }
            />
            <Route
              path='/fact/style-four'
              element={
                <ProtectedRoute>
                  <FactStyleFour />
                </ProtectedRoute>
              }
            />

            <Route
              path='/joke/style-one'
              element={
                <ProtectedRoute>
                  <JokeStyleOne />
                </ProtectedRoute>
              }
            />
            <Route
              path='/joke/style-two'
              element={
                <ProtectedRoute>
                  <JokeStyleTwo />
                </ProtectedRoute>
              }
            />

            <Route
              path='/quote/style-one'
              element={
                <ProtectedRoute>
                  <QuoteStyleOne />
                </ProtectedRoute>
              }
            />

            <Route
              path='/certificate/style-one'
              element={
                <ProtectedRoute>
                  <CertificateOne />
                </ProtectedRoute>
              }
            />
            <Route
              path='/certificate/style-two'
              element={
                <ProtectedRoute>
                  <CertificateTwo />
                </ProtectedRoute>
              }
            />
            <Route
              path='/certificate/style-three'
              element={
                <ProtectedRoute>
                  <CertificateThree />
                </ProtectedRoute>
              }
            />

            <Route
              path='/twibbon/style-one'
              element={
                <ProtectedRoute>
                  <TwibbonStyleOne />
                </ProtectedRoute>
              }
            />
            <Route
              path='/twibbon/style-two'
              element={
                <ProtectedRoute>
                  <TwibbonStyleTwo />
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<NotFound />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
