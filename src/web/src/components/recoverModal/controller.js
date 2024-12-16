import React from 'react';
import RecoverModal from "./view";
import useRecoverModel from "./model";

export const RecoverController = ({ onClose, handleRecover }) => {
  const {
    email,
    secretAnswer,
    errorRecover,
    onEmailChange,
    onSecretAnswerChange,
    submitRecover 
  } = useRecoverModel(handleRecover);

  return (
    <RecoverModal
        email = {email}
        secretAnswer = {secretAnswer}
        errorRecover = {errorRecover}
        onEmailChange = {onEmailChange}
        onSecretAnswerChange = {onSecretAnswerChange}
        onClose = {onClose}
        submitRecover = {submitRecover}
    />
  );
};