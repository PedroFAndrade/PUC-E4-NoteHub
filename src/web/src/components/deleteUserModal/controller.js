import React from 'react';
import DeleteUserModal from "./view";
import { useDeleteUserModel } from './model';

export const DeleteUserController = ({ onClose, handleDelete }) => {
    
    const { 
        errorDelete, 
        submitDelete 
      } = useDeleteUserModel(handleDelete);

  return (
    <DeleteUserModal
      onClose={onClose}
      submitDelete={submitDelete}
      errorDelete={errorDelete}
    />
  );
};