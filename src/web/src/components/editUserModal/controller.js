import React, { useState, useEffect } from 'react';
import EditUserModal from "./view";
import { useEditUserModel } from "./model";
import DecodeModel from '../../components/decodeToken/model';

export const EditUserController = ({ onClose, handleEdit }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await DecodeModel.decodeToken();
      setUserData(data);
    };
    fetchUserData();
  }, []);

  const { 
    formData, 
    handleChange, 
    errorEdit, 
    submitEdit 
  } = useEditUserModel(handleEdit, userData);

  return userData ? (
    <EditUserModal
      formData={formData}
      handleChange={handleChange}
      onClose={onClose}
      submitEdit={submitEdit}
      errorEdit={errorEdit}
    />
  ) : null; // Retorna null ou um loader enquanto o userData está carregando
};
