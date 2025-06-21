import { url } from '@/api/url';
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import React from 'react';

export function GoogleAuth(){
  const loginGoogle = async (response: any) => {
    const credential = response.credential;

    try {
      const res = await axios.post(`${url}/users/auth/google-token`, {
        id_token: credential,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Token verification failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full px-4 sm:px-0 sm:scale-100 scale-95">
      <GoogleLogin
        onSuccess={loginGoogle}
        onError={() => console.log('Login Failed')}
        theme="outline"
        type="standard"
        shape="pill"
      />
    </div>
  );
}
