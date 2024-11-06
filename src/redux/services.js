import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampersFromAPI = async (filters) => {
  const response = await axios.get(API_URL, { params: filters });
  return response.data;
};

export const fetchCamperById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
