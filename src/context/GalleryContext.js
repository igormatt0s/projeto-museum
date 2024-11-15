import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const GalleryContext = createContext();

// Tipos de ação para o reducer
const actionTypes = {
  SET_ARTWORKS: 'SET_ARTWORKS',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_LATEST_ARTWORKS: 'SET_LATEST_ARTWORKS',
  SET_DEPARTMENTS: 'SET_DEPARTMENTS',
  SET_SELECTED_DEPARTMENT: 'SET_SELECTED_DEPARTMENT',
  SET_ARTWORK_DETAILS: 'SET_ARTWORK_DETAILS',
  SET_ERROR: 'SET_ERROR',
};

// Função reducer para gerenciar o estado da galeria
const galleryReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_ARTWORKS:
      return { ...state, artworks: action.payload };
    case actionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case actionTypes.SET_LATEST_ARTWORKS:
      return { ...state, latestArtworks: action.payload };
    case actionTypes.SET_DEPARTMENTS:
      return { ...state, departments: action.payload };
    case actionTypes.SET_SELECTED_DEPARTMENT:
        return { 
            ...state, 
            selectedDepartment: { id: action.payload.id, name: action.payload.name },
            artworks: [], // Limpa as obras ao mudar de departamento
          };
    case actionTypes.SET_ARTWORK_DETAILS:
        return { ...state, artworkDetails: action.payload }; // Salva os detalhes da obra no estado
    case actionTypes.SET_ERROR:
        return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Estado inicial
const initialState = {
  artworks: [],
  searchTerm: '',
  latestArtworks: [],
  departments: [],
  selectedDepartment: { id: null, name: '' },
  artworkDetails: null,
  isLoading: false,
  error: null,
};

const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);

  // Função para buscar dados da API para a busca
  useEffect(() => {
    const fetchArtworks = async () => {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      try {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${state.searchTerm}`
        );
        const objectIDs = response.data.objectIDs || [];
        dispatch({ type: actionTypes.SET_ARTWORKS, payload: objectIDs });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: 'Erro ao buscar dados.' });
        console.error('Erro ao buscar dados:', error);
      } finally {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };
  
    if (state.searchTerm) {
      fetchArtworks();
    }
  }, [state.searchTerm]);

  // Função para buscar 20 obras de arte
  useEffect(() => {
    const fetchLatestArtworks = async () => {
      try {
        // Primeira chamada para obter os IDs
        const response = await axios.get(
          'https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&hasImages=true'
        );
        const data = response.data;
  
        if (!data.objectIDs || data.objectIDs.length === 0) {
          console.error('Nenhuma obra encontrada');
          return;
        }
  
        // Função auxiliar para buscar detalhes de obras em lotes
        const fetchArtworksInBatches = async (ids, batchSize = 5) => {
          const results = [];
  
          for (let i = 0; i < ids.length; i += batchSize) {
            const batch = ids.slice(i, i + batchSize).map((id) =>
              axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.data)
            );
            
            const batchResults = await Promise.allSettled(batch);
            const successfulResults = batchResults
              .filter(result => result.status === 'fulfilled' && result.value.primaryImageSmall) // Filtra imagens válidas
              .map(result => result.value);
  
            results.push(...successfulResults);
  
            // Pausa entre lotes para evitar sobrecarregar a API
            await new Promise(resolve => setTimeout(resolve, 100));
          }
  
          return results;
        };
  
        // Limita para 20 obras com imagens válidas
        const artworks = await fetchArtworksInBatches(data.objectIDs.slice(0, 100), 5);
        dispatch({ type: actionTypes.SET_LATEST_ARTWORKS, payload: artworks.slice(0, 20) });
      } catch (error) {
        console.error('Erro ao buscar últimas obras:', error);
      }
    };
  
    fetchLatestArtworks();
  }, []);  

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          'https://collectionapi.metmuseum.org/public/collection/v1/departments'
        );
        dispatch({ type: actionTypes.SET_DEPARTMENTS, payload: response.data.departments });
      } catch (error) {
        console.error('Erro ao buscar departamentos:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Função para buscar obras de um departamento específico
  useEffect(() => {
    const fetchDepartmentArtworks = async () => {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      if (!state.selectedDepartment.id) return;
      
      try {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${state.selectedDepartment.id}&hasImages=true`
        );
        const objectIDs = response.data.objectIDs || [];
        dispatch({ type: actionTypes.SET_ARTWORKS, payload: objectIDs });
      } catch (error) {
        console.error('Erro ao buscar obras do departamento:', error);
      } finally {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };
  
    fetchDepartmentArtworks();
  }, [state.selectedDepartment]);
  

  // Funções de ação para atualizar o estado
  const setSearchTerm = (term) => {
    dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: term });
  };

  const setSelectedDepartment = (departmentId, departmentName) => {
    dispatch({ type: actionTypes.SET_SELECTED_DEPARTMENT, payload: { id: departmentId, name: departmentName } });
  };

  const setPage = (pageNumber) => {
    dispatch({ type: actionTypes.SET_PAGE, payload: pageNumber });
  };

  const getArtworkDetails = async (objectID) => {
    try {
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );
      dispatch({ type: actionTypes.SET_ARTWORK_DETAILS, payload: response.data });
    } catch (error) {
      console.error('Erro ao buscar detalhes da obra:', error);
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        artworks: state.artworks,
        searchTerm: state.searchTerm,
        latestArtworks: state.latestArtworks,
        departments: state.departments,
        selectedDepartment: state.selectedDepartment,
        artworkDetails: state.artworkDetails,
        isLoading: state.isLoading,
        error: state.error,
        setPage,
        setSearchTerm,
        setSelectedDepartment,
        getArtworkDetails,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
