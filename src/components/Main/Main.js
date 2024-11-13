import React, { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {
  const { latestArtworks } = useContext(GalleryContext);

  console.log(latestArtworks);

  return (
    <div className="main-container">
      <h1 className="text-center my-4">Últimas Adições à Coleção</h1>
      <Carousel>
        {latestArtworks.map((artwork) => (
          <Carousel.Item key={artwork.objectID}>
            <Link to={`/art/${artwork.objectID}`}>
              <img
                className="d-block w-100"
                src={artwork.primaryImage || 'placeholder.jpg'}
                alt={artwork.title}
              />
            </Link>
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
