// src/pages/ArtDetails/ArtDetails.js
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GalleryContext } from '../../context/GalleryContext';

const ArtDetails = () => {
  const { objectID } = useParams();
  const { getArtworkDetails, artworkDetails } = useContext(GalleryContext);

  useEffect(() => {
    getArtworkDetails(objectID);
  }, [objectID, getArtworkDetails]);

  if (!artworkDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>{artworkDetails.title}</h2>
      <p>{artworkDetails.artistDisplayName}</p>
      <img src={artworkDetails.primaryImage} alt={artworkDetails.title} />
      <p>{artworkDetails.description}</p>
      {/* Mais informações conforme desejado */}
    </div>
  );
};

export default ArtDetails;
