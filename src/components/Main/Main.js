import React, { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { Carousel } from 'react-bootstrap';
import './Main.css';

const Main = () => {
  const { latestArtworks } = useContext(GalleryContext);

  return (
    <div className="main-container">
      <h1 className="text-center my-4">Últimas Adições à Coleção</h1>
      <Carousel>
        {latestArtworks.map((artwork) => (
          <Carousel.Item key={artwork.objectID}>
            <img
              className="d-block w-100"
              src={artwork.primaryImageSmall || 'placeholder.jpg'}
              alt={artwork.title}
            />
            <Carousel.Caption>
              <h3>{artwork.title}</h3>
              <p>{artwork.artistDisplayName}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Main;
