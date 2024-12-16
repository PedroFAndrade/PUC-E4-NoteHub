import DecodeModel from './model';

const DecodeController = async () => {
    try {
        const data = await DecodeModel.decodeToken();
        return data;
    } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error);
        return null;
    }
};

export default DecodeController;
