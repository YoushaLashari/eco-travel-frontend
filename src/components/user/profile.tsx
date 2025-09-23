import { useUser } from "@/context/userContext";
import React, { useEffect, useRef, useState } from "react";
import { NavbarAdmin } from "../navbar/navbarAdmin";
import { ResponsiveNavbarAdmin } from "../navbar/ResponsiveNavbarAdmin";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import earth from "/images/earth.svg";
import { Input } from "../ui/input";
import { PhoneInput } from 'react-international-phone';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { Button } from "../ui/button";
import axiosInstance from "@/api/config";
import { firstWord } from "@/assets/helpers";
import { Textarea } from "../ui/textarea";
import { url } from "@/api/url";

export default function Profile(){
    const { auth, user, loading, sidebarOpen, setSidebarOpen } = useUser();
    const [phone, setPhone] = useState<string>("");
    const [picture, setPicture] = useState<File | null>(null);
    const [mainError, setMainError] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [preview, setPreview] = useState(null);
    const inputFileRef = useRef(null);
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        email : "",
        name : "",
        password : "",
        picture: "",
        confirm : "",
        biography : ""
    });
    
    const [error, setError] = useState({
        password : "",
        confirm : "",
    });

    useEffect(() => {
        if(!loading && !auth){
            navigate("/");
        }
    }, [auth, loading, navigate]);

    useEffect(() => {
        if (user?.pictureUrl) {
            setPreview(user.pictureUrl);
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if(file){
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setPicture(e.target.files[0]);
        }
    };

    const handleData = (name: string, value: string) =>{
        setProfile(formData =>({
            ...formData,
            [name] : value
        }));
    }

    const sendData = async() =>{
        const formData = new FormData();

        formData.append('id', user.id);
        formData.append("email", profile.email.trim() || user.email);
        formData.append("name", profile.name.trim() || user.name);
        formData.append("biography", profile.biography.trim() || user.biography);
        formData.append("phone", phone && phone.length >= 5 ? phone.trim() : null);
  
        if(profile.password.trim().length > 0){
            formData.append("password", profile.password.trim());
            formData.append("confirm", profile.confirm.trim());
        }

        if(picture){
            formData.append("picture", picture);
        }
        
        setError({ password: "", confirm: "" });

        if(profile.password.length > 0){
            if(profile.password == ""){
                setError(errorData =>({
                    ...errorData,
                    password : "Champs mot de passe est obligatoire"
                }));
                setIsLoading(false);
                return;
            }
    
            if(profile.confirm.trim() == ""){
                setError(errorData =>({
                    ...errorData,
                    confirm : "Champs confirmer mot de passe est obligatoire"
                }));
                setIsLoading(false);
                return;
            }
    
            if(profile.confirm.trim() !=  profile.password){
                setError(errorData =>({
                    ...errorData,
                    confirm: "Le mot de passe et la confirmation ne sont pas identiques",
                }));
                setIsLoading(false);
                return;
            }
        }
        
        setIsLoading(true);

        try{
            const response = await axiosInstance.post("users/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            
            if(response.status === 200){
                setError({
                    password : "",
                    confirm : "",
                });
                    
                setMainError("");
                window.location.reload();
                setIsLoading(false);
            }else{
                setIsLoading(false);
                console.log("error");
            }
        }catch(error: unknown){
            setIsLoading(false);
            console.error("Une erreur inattendue est survenue :", (error as Error).message);
        }
    }
    console.log(user);
    
    return(
        <div>
            <div className='flex relative'>
                <div className="bg-main flex flex-col lg:items-center justify-center min-h-screen px-4 sm:px-0 flex-1">
                    <div className="ms-2 my-3">
                        <button
                            className="lg:hidden text-blue-900"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="w-full max-w-md">
                        <Card className="w-full max-w-md p-6 sm:p-8 mb-8 shadow-lg">
                            <CardContent className="flex flex-col px-0">
                                <div className="text-center">
                                    <h2 className="font-bold text-xl sm:text-2xl flex flex-wrap items-center justify-center text-center">
                                        <span className="text-blue-950 mr-2">Modifier Votre</span>
                                        <span className="text-color mr-2">Profile</span>
                                        <img src={earth} alt="budget" className="w-6 sm:w-8 md:w-10" />
                                    </h2>
                                </div>
                                {mainError && <div className="bg-red-500 text-white rounded-sm text-center py-2 mb-4">{mainError}</div>}
                                <div className="my-5 flex justify-center items-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={inputFileRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <div
                                        onClick={() => inputFileRef.current?.click()}
                                        className={`${user.picture !== null || preview === null && "bg-color"} cursor-pointer w-40 h-40 rounded-full text-white flex items-center justify-center text-xs font-bold overflow-hidden select-none`}
                                        title="Cliquez pour changer la photo"
                                    >
                                        {user.picture !== null || preview ? (
                                            <img
                                                src={preview || `${url}/images/${user.picture}`}
                                                alt="Profile"
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        ) : (
                                            <span className="text-2xl">{firstWord(user && user.name)}</span>
                                        )}
                                    </div>
                                </div>
                                <label htmlFor="email" className="text-left text-sm text-gray-400 mb-1 mt-5">Adresse email</label>
                                <Input 
                                    placeholder="Entrez votre adresse email" 
                                    className="py-5 border-blue-950 text-blue-950 mb-4 text-sm" 
                                    onChange={(e) => handleData("email", e.target.value)}
                                    value={profile.email || user.email}
                                />
                                <label htmlFor="name" className="text-left text-sm mb-1 text-gray-400">Nom et prénom</label>
                                <Input 
                                    placeholder="Entrez votre nom complet" 
                                    className="py-5 border-blue-950 text-blue-950 mb-4 text-sm"  
                                    onChange={(e) => handleData("name", e.target.value)}
                                    value={profile.name || user.name}
                                />
                                <label htmlFor="phone" className="text-left text-sm text-gray-400 mb-1">N° de téléphone</label>
                                <PhoneInput
                                    className="border-blue-950 text-blue-950 mb-4 text-sm"
                                    defaultCountry="fr"
                                    value={phone || user.phone !== null && user.phone }
                                    onChange={(phone) => setPhone(phone)}
                                />
                                <label htmlFor="biography" className="text-left text-sm text-gray-400 mb-1">A propos de vous</label>
                                <div className="mx-auto w-full">
                                    <Textarea
                                        onChange={(event) => handleData("biography", event.target.value)}
                                        className="py-5 border-blue-950 text-blue-950 mb-4 text-sm"
                                        value={profile.biography || user.biography}
                                    />
                                </div>
                                <label htmlFor="password" className="text-left text-sm mb-1 text-gray-400">Mot de passe</label>
                                <div className="relative w-full">
                                    <Input 
                                        placeholder="Créez votre mot de passe" 
                                        type={passwordVisible ? "" : "password"} 
                                        className="py-5 border-blue-950 text-blue-950 mb-4 text-sm" 
                                        onChange={(e)=> handleData("password", e.target.value)}
                                        value={profile.password}
                                    />
                                    {passwordVisible ? (
                                        <FiEyeOff 
                                            className="absolute right-3 top-1/2 transform -translate-y-1/1 text-main-color cursor-pointer" 
                                            onClick={() => setPasswordVisible((visible) => !visible)}
                                        />
                                    ) : (
                                        <FiEye 
                                            className="absolute right-3 top-1/2 transform -translate-y-1/1 text-main-color cursor-pointer" 
                                            onClick={() => setPasswordVisible((visible) => !visible)}
                                        />
                                    )}
                                </div>
                                <span className="mb-4 text-sm text-red-500">{error && error.password}</span>
                                <label htmlFor="confirm" className="text-left text-sm mb-1 text-gray-400">Confirmer mot de passe</label>
                                <div className="relative w-full">
                                    <Input 
                                        placeholder="Confirmer le mot de passe" 
                                        type={confirmPasswordVisible ? "" : "password"} 
                                        className="py-5 border-blue-950 text-blue-950 mb-1 text-sm" 
                                        onChange={(e)=> handleData("confirm", e.target.value)}
                                        value={profile.confirm}
                                    />
                                    {confirmPasswordVisible ? (
                                        <FiEyeOff 
                                            className="absolute right-3 top-1/2 transform -translate-y-1/1 text-main-color cursor-pointer" 
                                            onClick={() => setConfirmPasswordVisible((visible) => !visible)}
                                        />
                                    ) : (
                                        <FiEye 
                                            className="absolute right-3 top-1/2 transform -translate-y-1/1 text-main-color cursor-pointer" 
                                            onClick={() => setConfirmPasswordVisible((visible) => !visible)}
                                        />
                                    )}
                                </div>
                                <span className="mb-4 text-sm text-red-500">{error && error.confirm}</span>
                                {isLoading ? (
                                    <div className="text-center">
                                        <ClipLoader color="#3498db" loading={isLoading} size={50}/>
                                    </div>
                                ) : (
                                    <Button 
                                        onClick={sendData}
                                        className="w-full bg-orange-500 text-white mb-4 rounded-full cursor-pointer"
                                    >
                                        Modifier
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}