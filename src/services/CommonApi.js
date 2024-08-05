import axios from 'axios';

const API_URL = 'http://ec2-13-233-145-172.ap-south-1.compute.amazonaws.com:9000/api/v1';
// const API_URL = '/api/v1';
// const API_URL = 'https://staging.savvypool.com';

export const allcategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/website/categories?limit=100&offset=1`);
    // const response = await axios.get(`${API_URL}website/categories?limit=100&offset=1`, { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
};
export const allinsitutes = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/website/institute`,{params});
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch institutes');
  }
};
export const allprograms = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/website/programs?offset=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch programs');
  }
};
//with filtering
export const fetchPrograms = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/website/category/programs`, {params});
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
};
export const getcoursebyid = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/website/program/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch course');
  }
};

export const getinstitutionbyid = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/website/institute/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch institute');
  }
};