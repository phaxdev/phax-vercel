import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Portfolio from './components/Portfolio';
import SEO from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <Portfolio />
    </HelmetProvider>
  );
}

export default App;