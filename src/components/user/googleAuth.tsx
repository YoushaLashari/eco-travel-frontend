import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import React from 'react';

export function GoogleAuth(){

  const loginGoogle = async (response: any) => {
    const credential = response.credential;

    try {
      const res = await axios.post("http://64.226.86.96/users/auth/google-token", {
        id_token: credential,
      });

      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Token verification failed", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={loginGoogle}
      onError={() => console.log('Login Failed')}
      theme="outline"
      type="standard"
      shape="pill"
    />
  );
}
