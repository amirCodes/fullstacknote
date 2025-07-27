import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const noteAPI = {
  // Get all notes
  getAllNotes: () => api.get('/notes'),
  
  // Get single note
  getNoteById: (id) => api.get(`/notes/${id}`),
  
  // Create note
  createNote: (data) => api.post('/notes', data),
  
  // Update note
  updateNote: (id, data) => api.put(`/notes/${id}`, data),
  
  // Delete note
  deleteNote: (id) => api.delete(`/notes/${id}`),
  
  // Toggle archive
  toggleArchive: (id) => api.patch(`/notes/${id}/toggle-archive`),
};

export default api;
