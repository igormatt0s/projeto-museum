import React, { useContext, useState } from 'react'
import { GalleryContext } from '../../context/GalleryContext'
import './Main.css'

const Main = () => {
  const { artworks } = useContext(GalleryContext)

  return (
    <main className="main">
      <h1>Galeria de Arte</h1>
      <div className="gallery">
        {artworks.map((artwork) => (
          <div key={artwork.objectID} className="artwork">
            <img src={artwork.primaryImageSmall} alt={artwork.title} />
            <h3>{artwork.title}</h3>
            <p>{artwork.artistDisplayName}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
