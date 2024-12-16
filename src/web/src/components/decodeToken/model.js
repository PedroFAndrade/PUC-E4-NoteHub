import { api } from "../../connections/notes";

class DecodeModel {
    static async decodeToken() {
        try {
            const token = sessionStorage.getItem('Token')
            const response = await api.post('/decode', { token });
            return response.data.userData;
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
            return null;
        }
    }
}

export default DecodeModel;
