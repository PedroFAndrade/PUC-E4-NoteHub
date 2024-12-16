import { useState } from 'react';
import { api } from "../../connections/notes";

export const useDeleteUserModel = (handleDelete) => {
    
    const [errorDelete, setErrorDelete] = useState(null);

    const submitDelete = async () => {
        try {
          const token = sessionStorage.getItem('Token');
          const response = await api.delete('/usuario', {
            headers: { 'Authorization': token }
          });
          alert("Usuário excluido com sucesso!");
          handleDelete();
          console.log(response);
        } catch (error) {
          setErrorDelete('Não foi possível excluir o usuário');
        }
      };

    return { errorDelete, submitDelete };
};
