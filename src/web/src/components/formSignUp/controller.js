import React from 'react';
import FormSignUp from "./view";
import {useSignUpModel} from "./model";

export const SignUpController = ({ handleSignUp }) => {
  const { 
    formData, 
    handleChange,
    errorSignUp, 
    submitSignUp
  } = useSignUpModel(handleSignUp);

  return (
    <FormSignUp
      formData={formData}
      errorSignUp={errorSignUp}
      handleChange={handleChange}
      submitSignUp={submitSignUp}
    />
  );
};
