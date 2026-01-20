// src/App.js
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Portfolio from './components/Portfolio.jsx';
import SEO from './components/SEO.jsx';

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <Portfolio />
    </HelmetProvider>
  );
}

export default App;