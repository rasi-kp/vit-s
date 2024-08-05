import axios from 'axios';

const API_URL = 'http://ec2-13-233-145-172.ap-south-1.compute.amazonaws.com:9000/api/v1';
// const API_URL = '/api/v1';
// const API_URL = 'http://staging.savvypool.com';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/authentication/login`, { email, password });
    const tokens = {
      accessToken: response.headers['grpc-metadata-admin-access-token'],
      refreshToken: response.headers['grpc-metadata-admin-refresh-token']
    };
    return tokens;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const getRefreshToken = async (userId, headers) => {
  try {
    const response = await axios.get(`${API_URL}/authentication/refreshtoken/${userId}`, { headers })
    return response.data;
  } catch (error) {
    throw new Error('Failed to refresh the token');
  }
};

export const fetchInstitutes = async (params, headers) => {
  try {
    const response = await axios.get(`${API_URL}/admin/institute`, { params, headers },);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch institutes');
  }
};
export const allcategory = async (params, headers) => {
  try {
    const response = await axios.get(`${API_URL}/admin/category`, { params, headers },);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
};
export const addcategory = async (data, headers) => {
  try {
    const response = await axios.post(`${API_URL}/admin/category`,{ category_name: data }, { headers },);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
};
export const deletecategory = async (params, headers) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/category/${params}`,{ headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
};

export const fetchInstitutesbyID = async (instituteid, headers) => {
  try {
    const response = await axios.get(`${API_URL}/admin/institute/${instituteid}`, { headers },);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch institutes');
  }
};
export const fetchInstitutesbyIDAll = async (instituteid) => {
  try {
    const response = await axios.get(`${API_URL}/website/institute/${instituteid}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch institutes');
  }
};

export const createInstitute = async (data, headers) => {
  try {
    const response = await axios.post(`${API_URL}/admin/institute`, data, { headers });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create institute');
  }
};

export const updateInstitute = async (data, headers) => {
  try {
    const response = await axios.put(`${API_URL}/admin/institute`, data, { headers });
    console.log(response);
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to update institute');
  }
};
export const deleteInstitute = async (userId, headers) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/institute/${userId}` ,{ headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete institute');
  }
};
export const deleteInstitutesoft = async (userId, headers) => {
  try {
    const response = await axios.patch(`${API_URL}/admin/institute/soft-delete`, {
      user_id: userId,
      is_soft_deleted: true
    }, { headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete institute');
  }
};

export const addProgram = async (data, headers) => {
  try {
    const response = await axios.post(`${API_URL}/admin/program`, data, { headers });    
    return response.data;
  } catch (error) {
    throw new Error('Failed to add program');
    
  }
};
export const getlocationbyid = async (id, headers) => {
  try {
    const response = await axios.get(`${API_URL}/admin/institute/locations/${id}`,{ headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add program');
    
  }
};

export const editProgram = async (data, headers) => {
  try {
    const response = await axios.put(`${API_URL}/admin/program`, data, { headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add program');
  }
};
export const deleteProgram = async (id, headers) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/program/${id}`,{ headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add program');
  }
};
export const getProgrambyId = async (id, headers) => {
  try {
    const response = await axios.get(`${API_URL}/admin/program/${id}`,{ headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch course data');
  }
};

export const deletelocationbyid = async (instituteid,locationid, headers) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/institute/${instituteid}/location/${locationid}`,{ headers });
    return response.data;
  } catch (error) {
    throw new Error('delete location failed');
  }
};
export const deletelocationprogrambyid = async (programid,locationid, headers) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/program/${programid}/location/${locationid}`,{ headers });
    return response.data;
  } catch (error) {
    throw new Error('delete location failed');
  }
};

export const deletecategorybyid = async (instituteid,categoryid, headers) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/program/${instituteid}/category/${categoryid}`,{ headers });
    return response.data;
  } catch (error) {
    throw new Error('delete category failed');
  }
};


