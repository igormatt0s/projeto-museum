import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { GalleryContext } from '../../context/GalleryContext';
import './ArtDetails.css';

const ArtDetails = () => {
  const { objectID } = useParams();
  const { getArtworkDetails, artworkDetails, isLoading } = useContext(GalleryContext);

  useEffect(() => {
    getArtworkDetails(objectID);
  }, [objectID, getArtworkDetails]);

  return (
    <div className="details-container">
      {
        !artworkDetails ? (
          <Alert variant="info" className="text-center" style={{ backgroundColor: 'rgb(211, 253, 200)' }} >
            Loading images...
          </Alert >
        ) : (
          <>
            <section>
              <div className='detailsText'>
                <div className='abstract'>
                  <h1>{artworkDetails.title}</h1>
                  <div className='artist'>
                    <span className='artistDisplayName'>{artworkDetails.artistDisplayName}</span>
                    <span>{artworkDetails.artistNationality}</span>
                  </div>
                  <span>{artworkDetails.objectDate}</span>
                </div>
                <div className='overview'>
                  <h2>Overview</h2>
                  <span><strong>Locality:</strong> {artworkDetails.city}, {artworkDetails.country}</span>
                  <span><strong>Object Type:</strong> {artworkDetails.objectName}</span>
                  <span><strong>Department:</strong> {artworkDetails.department}</span>
                  <span><strong>Culture:</strong> {artworkDetails.culture}</span>
                  <span><strong>Artist Bio:</strong> {artworkDetails.artistDisplayBio}</span>
                  <span><strong>Medium:</strong> {artworkDetails.medium}</span>
                  <span><strong>Dimensions:</strong> {artworkDetails.dimensions}</span>
                  <span><strong>Classification:</strong> {artworkDetails.classification}</span>
                  <span><strong>Accession Year:</strong> {artworkDetails.accessionYear}</span>
                </div>
              </div>

              <div className='detailsImage'>
                <img src={artworkDetails.primaryImage} alt={artworkDetails.title} />
              </div>
            </section>
          </>
        )}
    </div>
  );
};

export default ArtDetails;
