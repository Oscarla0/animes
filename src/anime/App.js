import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import AnimeItem from './Components/AnimeItem';
import Gallery from './Components/Gallery';

function Apps() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/animes" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Apps;
