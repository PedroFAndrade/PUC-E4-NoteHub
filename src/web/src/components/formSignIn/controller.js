import React from 'react';
import FormSignIn from "./view";
import { useSignInModel } from "./model";

export const SignInController = ({ handleLogin }) => {
  const {
    email,
    password,
    errorLogin,
    onEmailChange,
    onPasswordChange,
    submitLogin,
  } = useSignInModel(handleLogin);

  return (
    <FormSignIn
      email={email}
      password={password}
      errorLogin={errorLogin}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      submitLogin={submitLogin}
    />
  );
};
