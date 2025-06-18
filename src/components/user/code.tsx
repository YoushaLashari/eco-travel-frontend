import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { Navbar } from "../navbar/navbar";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Code(){
    const location = useLocation();
    const {message, user} = location.state || {message: "No message", user: null};
    
    const [loading, setLoading] = useState<boolean>(false);
    const [mainError, setMainError] = useState<string>('');
    const [code, setCode] = useState<string>("");
    const [inputValues, setInputValues] = useState<string[]>(["", "", "", ""]);
    const [enable, setEnable] = useState<boolean>(false);
    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedCode = e.clipboardData.getData("Text").slice(0, 4);

        if(/^\d{4}$/.test(pastedCode)){
            setCode(pastedCode);
            setInputValues(pastedCode.split(""));
        }
    };

    const handleInputChange = (index: number, value: string) => {
        if(/^\d{0,1}$/.test(value)){
            const newInputValues = [...inputValues];
            newInputValues[index] = value;
            setInputValues(newInputValues);
            setCode(newInputValues.join("")); 

            if(value !== "" && index < inputRefs.length - 1){
                inputRefs[index + 1].current?.focus();
            }
        }
    };
    
    const handleVerifyClick = async() => {
        setLoading(true);

        const data = {
            code: code,
            user_email: user.email
        }

        try{
            const response = await axios.post('http://127.0.0.1:8000/users/verification', data);

            if(response.status === 200){
                localStorage.setItem('token', response.data.access_token);
                setLoading(false);
                window.location.href = "/dashboard"; 
            }else{
                setLoading(false);
                console.error("error");
            }
        }catch(error: unknown){
            setLoading(false);

            if(axios.isAxiosError(error)){
                setMainError(error.response?.data.message)
                console.error("Erreur lors de l'inscription :", error.response?.data.message);
            }else{
                console.error("Une erreur inattendue est survenue :", (error as Error).message);
            }
        }
    };

    useEffect(() => {
        if (inputValues.every(value => value !== "")) {
            handleVerifyClick();
            setEnable(true)
        }
    }, [inputValues]);

    return (
        <div className="mx-8">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen relative mt-8">
                <Card className="w-full max-w-md p-8 mb-45">
                    <CardContent className="flex flex-col">
                        <div className="text-center">
                            {mainError && <div className="bg-red-500 text-white rounded-sm text-center py-2 mb-4">{mainError}</div>}
                            Logo
                            <h2 className="text-2xl font-semibold mb-6">Vérifier votre compte</h2>
                            <div className="p-4 bg-green-600 text-white rounded-lg mb-4">{message}</div>
                        </div>
                        <div className="flex justify-center">
                            {inputValues.map((value, index) => (
                                <Input
                                    key={index}
                                    ref={inputRefs[index]}
                                    className="py-10 border-blue-950 text-blue-950 mb-1 w-15 fs-30 text-center mr-3"
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    maxLength={1}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                />
                            ))}
                        </div>
                        <div className="mt-8">
                            {loading ? (
                                <ClipLoader color="#3498db" loading={loading} size={50} className="text-center" />
                            ) : (
                                <Button
                                    onClick={handleVerifyClick}
                                    disabled={!enable}
                                    className="w-full bg-orange-500 text-white mb-4 rounded-full cursor-pointer"
                                >
                                    Vérifier votre compte
                                </Button>
                            )}
                            
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}