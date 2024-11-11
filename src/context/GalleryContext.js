import React, { createContext, useReducer, useEffect } from 'react';

export const GalleryContext = createContext();

// Tipos de ação para o reducer
const actionTypes = {
  SET_ARTWORKS: 'SET_ARTWORKS',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
};

// Função reducer para gerenciar o estado da galeria
const galleryReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_ARTWORKS:
      return { ...state, artworks: action.payload };
    case actionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

// Estado inicial
const initialState = {
  artworks: [],
  searchTerm: '',
};

const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);

  // Função para buscar dados da API
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${state.searchTerm}`
        );
        const data = await response.json();
        const artData = await Promise.all(
          data.objectIDs.slice(0, 10).map(async (id) => {
            const res = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            return await res.json();
          })
        );
        dispatch({ type: actionTypes.SET_ARTWORKS, payload: artData });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    if (state.searchTerm) {
      fetchArtworks();
    }
  }, [state.searchTerm]);

  // Funções de ação para atualizar o estado
  const setSearchTerm = (term) => {
    dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: term });
  };

  return (
    <GalleryContext.Provider
      value={{
        artworks: state.artworks,
        searchTerm: state.searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
