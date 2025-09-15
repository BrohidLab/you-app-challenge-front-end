
import axios from "axios";

export const loginAPI = async(data) => {
    try {
        const response = await axios.post("https://techtest.youapp.ai/api/login", data, {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Registrasi gagal");
    }
}

export const registerAPI = async (data) => {
    try {
        const response = await axios.post("https://techtest.youapp.ai/api/register", data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response; // <-- Ini penting, karena axios membungkus data di .data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Registrasi gagal");
    }
};