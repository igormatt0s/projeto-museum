import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '../services/api'

const useArtworks = (searchTerm, artworks, initialPage = 1, artworksPerPage = 20) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentArtworks, setCurrentArtworks] = useState([]);
  const [currentDBArtworks, setCurrentDBArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPageArtworks = useCallback(async () => {
    setIsLoading(true);

    try {
      if (searchTerm) {
        // Caso haja um termo de pesquisa, busque da API
        // 1. Buscar obras no backend
        const token = localStorage.getItem('token');
        const dbResponse = await api.get(
          `/artworks/search?query=${searchTerm}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dbArtworks = dbResponse.data;

        // 4. Paginar os IDs
        const startIndex = (currentPage - 1) * artworksPerPage;
        const paginatedIDs = artworks.slice(startIndex, startIndex + artworksPerPage);

        // 5. Buscar detalhes das obras
        const artworksDetails = await Promise.allSettled(
          paginatedIDs.map(async (id) => {
            try {
              const response = await axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
              );
              if (response.data.primaryImageSmall) {
                return response.data;
              }
              return null;
            } catch (error) {
              console.error(`Erro ao buscar detalhes da obra com ID ${id}:`, error);
              return null;
            }
          })
        );

        const validArtworks = artworksDetails
          .filter((result) => result.status === 'fulfilled' && result.value)
          .map((result) => result.value);

        // 6. Combinar obras do banco de dados e da API
        const combinedArtworks = [...dbArtworks, ...validArtworks];
        setCurrentArtworks(combinedArtworks);
      } else {
        // Caso não haja pesquisa, exiba todas as obras do banco
        setCurrentArtworks([]);

        const token = localStorage.getItem('token');
        const dbResponse = await api.get('/artworks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dbArtworks = dbResponse.data;
        console.log(dbArtworks)
        setCurrentDBArtworks(dbArtworks);
      }
    } catch (error) {
      console.error('Erro ao buscar obras:', error);
    } finally {
      setIsLoading(false);
    }
  }, [artworks, currentPage, artworksPerPage, searchTerm]);

  useEffect(() => {
    fetchPageArtworks();
  }, [fetchPageArtworks]);

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
  };

  return {
    currentPage,
    currentArtworks,
    currentDBArtworks,
    handleNextPage,
    handlePreviousPage,
    isLoading,
  };
};

export default useArtworks;
