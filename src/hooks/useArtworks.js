import { useState, useEffect } from 'react';
import axios from 'axios';

const useArtworks = (artworks, initialPage = 1, artworksPerPage = 20) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentArtworks, setCurrentArtworks] = useState([]);

  const fetchPageArtworks = async () => {
    let validArtworks = [];
    let currentIndex = (currentPage - 1) * artworksPerPage;
  
    while (validArtworks.length < artworksPerPage && currentIndex < artworks.length) {
      const batchIDs = artworks.slice(currentIndex, currentIndex + artworksPerPage);
      
      const artData = await Promise.allSettled(
        batchIDs.map(async (id) => {
          try {
            const res = await axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            return res.data.primaryImageSmall ? res.data : null;
          } catch (error) {
            console.error(`Erro ao buscar obra com ID ${id}:`, error);
            return null;
          }
        })
      );
  
      const newValidArtworks = artData
        .filter(result => result.status === 'fulfilled' && result.value !== null)
        .map(result => result.value);
  
      validArtworks.push(...newValidArtworks);
  
      currentIndex += artworksPerPage;
    }
  
    setCurrentArtworks(validArtworks.slice(0, artworksPerPage));
  };

  useEffect(() => {
    fetchPageArtworks();
  }, [currentPage, artworks]);

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
  };

  return {
    currentPage,
    currentArtworks,
    handleNextPage,
    handlePreviousPage
  };
};

export default useArtworks;
