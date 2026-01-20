// src/App.js
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Portfolio from './src/components';
import SEO from './SEO';

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <Portfolio />
    </HelmetProvider>
  );
}

export default App;