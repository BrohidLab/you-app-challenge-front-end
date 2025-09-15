import {client, createHeader} from "."

export const getProfileAPI = async(token) => {
  try {
          const response = await client.get('/api/getProfile', createHeader(token));
          return response.data;
      } catch (error) {
          throw new Error(error.response?.data?.message || "Gagal mengambil data profile");
      }
};

export const createProfileAPI = async(token, data) => {
    try {
        return await client.post('/api/createProfile', data, createHeader(token));
    } catch (error) {
          throw new Error(error.response?.data?.message || "Gagal membuat data profile");
    }
}

export const updateProfileAPI = async(token, data) => {
    try {
        return await client.put('/api/updateProfile', data, createHeader(token));
    } catch (error) {
          throw new Error(error.response?.data?.message || "Gagal mengubah data profile");
    }
}