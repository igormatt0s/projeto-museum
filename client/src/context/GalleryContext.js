import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';

export const GalleryContext = createContext();

// Tipos de ação para o reducer
const actionTypes = {
  SET_USER: 'SET_USER',
  SET_ARTWORKS: 'SET_ARTWORKS',
  SET_ARTWORKS_SEARCH: 'SET_ARTWORKS_SEARCH',
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
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.SET_ARTWORKS:
      return { ...state, artworks: action.payload };
    case actionTypes.SET_ARTWORKS_SEARCH:
      return { ...state, artworksSearch: action.payload };
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
  user: null,
  artworks: [],
  artworksSearch: [],
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

  const setUser = (user) => {
    dispatch({ type: actionTypes.SET_USER, payload: user });
  };

  // Verifica se o usuário está autenticado (sessão ativa)
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  };

  // Função para buscar dados da API para a busca
  useEffect(() => {
    if (!state.searchTerm) return;
  
    const fetchArtworks = async () => {
      if (!isAuthenticated()) {
        throw new Error('Usuário não autenticado. Faça login para realizar buscas.');
      }
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      try {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${state.searchTerm}`
        );
        
        const objectIDs = response.data.objectIDs || [];
  
        dispatch({ type: actionTypes.SET_ARTWORKS_SEARCH, payload: objectIDs });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: 'Erro ao buscar dados.' });
        console.error('Erro ao buscar dados:', error);
      } finally {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };
  
    fetchArtworks();
  }, [state.searchTerm]);  

  // Função para buscar obras de arte para o Main.js
  useEffect(() => {
    const fetchLatestArtworks = async () => {
      try {
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

  // Função para buscar todos os departamentos
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

  // Função para inserir uma nova obra com controle de sessão
  const insertArtwork = async (artwork) => {
    if (!isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para inserir uma obra.');
    }

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/artworks/insert', artwork, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Obra inserida com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao inserir obra:', error);
      dispatch({ type: actionTypes.SET_ERROR, payload: 'Erro ao inserir obra. Tente novamente.' });
    }
  };

  // Funções de ação para atualizar o estado
  const setSearchTerm = (term) => {
    dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: term });
  };

  const setSelectedDepartment = (departmentId, departmentName) => {
    dispatch({ type: actionTypes.SET_SELECTED_DEPARTMENT, payload: { id: departmentId, name: departmentName } });
  };

  // Função para retornar os dados de um objeto
  const getArtworkDetails = async (objectID) => {
    try {
      const token = localStorage.getItem('token');
      let response;
      try {
        // 1. Verificar se a obra está no banco de dados
        response = await api.get(
          `/artworks/artwork/${objectID}`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // 2. Se não estiver no banco, buscar na API do Met Museum
          const apiResponse = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
          );    
          response = apiResponse;
        } else {
          throw new Error('Erro ao buscar a obra de arte no banco de dados.');
        }
      }
      dispatch({ type: actionTypes.SET_ARTWORK_DETAILS, payload: response.data });
    } catch (error) {
      console.error('Erro ao buscar detalhes da obra:', error);
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        ...state,
        artworks: state.artworks,
        artworksSearch: state.artworksSearch,
        searchTerm: state.searchTerm,
        latestArtworks: state.latestArtworks,
        departments: state.departments,
        selectedDepartment: state.selectedDepartment,
        artworkDetails: state.artworkDetails,
        isLoading: state.isLoading,
        error: state.error,
        setUser,
        insertArtwork,
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
