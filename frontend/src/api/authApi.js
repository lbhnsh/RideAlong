import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, password });
    return response.data.message;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data.message;
  } catch (error) {
    throw error.response.data.message;
  }
};
