import React, { createContext, useReducer, useEffect } from 'react';

export const GalleryContext = createContext();

// Tipos de ação para o reducer
const actionTypes = {
  SET_ARTWORKS: 'SET_ARTWORKS',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_LATEST_ARTWORKS: 'SET_LATEST_ARTWORKS',
  SET_DEPARTMENTS: 'SET_DEPARTMENTS',
  SET_SELECTED_DEPARTMENT: 'SET_SELECTED_DEPARTMENT',
};

// Função reducer para gerenciar o estado da galeria
const galleryReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_ARTWORKS:
      return { ...state, artworks: action.payload };
    case actionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case actionTypes.SET_LATEST_ARTWORKS:
      return { ...state, latestArtworks: action.payload };
    case actionTypes.SET_DEPARTMENTS:
      return { ...state, departments: action.payload };
    case actionTypes.SET_SELECTED_DEPARTMENT:
      return { ...state, selectedDepartment: action.payload, artworks: [] };
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
  selectedDepartment: null,
};

const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);

  // Função para buscar dados da API para a busca
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

  // Função para buscar as últimas 20 obras de arte
  useEffect(() => {
    const fetchLatestArtworks = async () => {
      try {
        // Aqui pegamos um número maior de objetos e ordenamos pela objectID
        const response = await fetch(
            'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=*'
        );          
        const data = await response.json();
        // Pegamos os 20 maiores objectIDs, assumindo que maiores são mais recentes
        const artData = await Promise.all(
          data.objectIDs.slice(-20).map(async (id) => {
            const res = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            return await res.json();
          })
        );
        dispatch({ type: actionTypes.SET_LATEST_ARTWORKS, payload: artData });
      } catch (error) {
        console.error('Erro ao buscar últimas obras:', error);
      }
    };

    fetchLatestArtworks();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          'https://collectionapi.metmuseum.org/public/collection/v1/departments'
        );
        const data = await response.json();
        dispatch({ type: actionTypes.SET_DEPARTMENTS, payload: data.departments });
      } catch (error) {
        console.error('Erro ao buscar departamentos:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Função para buscar obras de um departamento específico
  useEffect(() => {
    const fetchDepartmentArtworks = async () => {
      if (!state.selectedDepartment) return;
      try {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${state.selectedDepartment}&hasImages=true`
        );
        const data = await response.json();
        const artData = await Promise.all(
          data.objectIDs.slice(0, 20).map(async (id) => {
            const res = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            return await res.json();
          })
        );
        dispatch({ type: actionTypes.SET_ARTWORKS, payload: artData });
      } catch (error) {
        console.error('Erro ao buscar obras do departamento:', error);
      }
    };

    fetchDepartmentArtworks();
  }, [state.selectedDepartment]);

  // Funções de ação para atualizar o estado
  const setSearchTerm = (term) => {
    dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: term });
  };

  const setSelectedDepartment = (departmentId) => {
    dispatch({ type: actionTypes.SET_SELECTED_DEPARTMENT, payload: departmentId });
  };

  return (
    <GalleryContext.Provider
      value={{
        artworks: state.artworks,
        searchTerm: state.searchTerm,
        latestArtworks: state.latestArtworks,
        departments: state.departments,
        selectedDepartment: state.selectedDepartment,
        setSearchTerm,
        setSelectedDepartment,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
