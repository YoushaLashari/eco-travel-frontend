import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";
import { GoogleAuth } from "./googleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { useUser } from "@/context/userContext";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { google_client } from "@/assets/env";
import { url } from "@/api/url";

export default function Login(){
    const navigate = useNavigate();
    const { auth, loading } = useUser();
    const [mainError, setMainError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState({
        email: "",
        password: "",
    });
    
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const handleData = (name: string, value: string) => {
        setLogin(formData => ({
            ...formData,
            [name]: value
        }));
    }

    useEffect(() => {
        if (auth) {
          navigate("/dashboard");
        }
    }, [auth, loading, navigate]);

    const sendData = async () => {
        const data = {
            email : login.email.trim(),
            password: login.password.trim(),
        }

        let valid = true;
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setError({ email: "", password: "" });

        if(data.email == ""){
            setError(errorData =>({
                ...errorData,
                email : "Champs email est obligatoire"
            }));

            valid = false;
        }else if(!isEmail.test(data.email)){
            setError(errorData =>({
                ...errorData,
                email : "email adresse invalide"
            }));

            valid = false;
        }

        if(data.password == ""){
            setError(errorData =>({
                ...errorData,
                password : "Champs mot de passe est obligatoire"
            }));

            valid = false;
        }

        if(valid){
            setIsLoading(true);

            try{
                const response = await axios.post(`${url}/users/login`, data);
                console.log(response);
                
                if(response.status === 200){
                    localStorage.setItem('token', response.data.access_token);
                    setIsLoading(false);
                    window.location.href = "/dashboard"; 
                    setMainError("");
                }else{
                    setIsLoading(false);
                    console.error("error");
                }
            }catch(error: unknown){
                setIsLoading(false);

                if(axios.isAxiosError(error)){
                    setMainError(error.response?.data.detail)
                    console.error("Erreur :", error.response?.data.detail);
                }else{
                    console.error("Une erreur inattendue est survenue :", (error as Error).message);
                }
            }
        }
    }

    return(
        <div className="mx-8">
            <div className="flex flex-col items-center justify-center lg:min-h-[800px] min-h-[650px] px-4 sm:px-0">
                <Card className="w-full max-w-md p-6 sm:p-8 mb-8 shadow-lg">
                    <CardContent className="flex flex-col sm:px-0 lg:px-6">
                        <div className="text-center">
                            Logo
                            <h2 className="text-2xl font-semibold mb-6">Se connecter</h2>
                        </div>
                        <GoogleOAuthProvider clientId={google_client}>
                            <GoogleAuth/>
                        </GoogleOAuthProvider>
                        <div className="flex items-center w-full mb-4 mt-3">
                            <hr className="flex-grow border-t border-blue-950" />
                            <span className="px-2 text-main-color">Ou</span>
                            <hr className="flex-grow border-t border-blue-950" />
                        </div>
                        {mainError && <div className="bg-red-500 text-white rounded-sm text-center py-2 mb-4">{mainError}</div>}
                        <label htmlFor="email" className="text-left text-sm text-gray-400 mb-1">Adresse email</label>
                        <Input 
                            placeholder="Entrez votre adresse email" 
                            className="py-5 border-blue-950 text-blue-950 mb-1" 
                            onChange={(e) => handleData("email", e.target.value)}
                            value={login.email}
                            id="email"
                        />
                        <span className="mb-4 text-red-500 text-sm">{error && error.email}</span>
                        <label htmlFor="password" className="text-left text-sm mb-1 text-gray-400">Mot de passe</label>
                        <div className="relative w-full">
                            <Input 
                                placeholder="Créez votre mot de passe" 
                                type={passwordVisible ? "" : "password"} 
                                className="py-5 border-blue-950 text-blue-950 mb-1" 
                                onChange={(e)=> handleData("password", e.target.value)}
                                value={login.password}
                                id="password"
                            />
                            {passwordVisible ? (
                                <FiEyeOff 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-main-color cursor-pointer" 
                                    onClick={() => setPasswordVisible((visible) => !visible)}
                                />
                            ) : (
                                <FiEye 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-main-color cursor-pointer" 
                                    onClick={() => setPasswordVisible((visible) => !visible)}
                                />
                            )}
                        </div>
                        <span className="mb-4 text-sm text-red-500">{error && error.password}</span>
                        {isLoading ? (
                            <div className="text-center">
                                <ClipLoader color="#3498db" loading={loading} size={50}/>
                            </div>
                        ) : (
                            <Button 
                                onClick={sendData}
                                className="w-full bg-orange-500 text-white mb-4 rounded-full cursor-pointer"
                            >
                                Se connecter
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}