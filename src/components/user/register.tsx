import { useEffect, useState } from "react";
import mapRoute from "/images/map-route.svg";
import bulb from "/images/light-bulb.svg";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { GoogleAuth } from "./googleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { google_client } from "@/assets/env";
import { url } from "@/api/url";
import { Label } from "@/components/ui/label";
import { Leaf, Mail, Lock, User, ArrowLeft } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const [register, setRegister] = useState({
        email: "",
        name: "",
        password: "",
        confirm: "",
    });

    const [error, setError] = useState({
        email: "",
        name: "",
        password: "",
        confirm: "",
        phone: "+33 123 456",
    });

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>("");
    const [mainError, setMainError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation d'inscription - redirect vers dashboard
        navigate("/dashboard");
    };

    const handleData = (name: string, value: string) => {
        setRegister(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const sendData = async () => {
        const data = {
            email: register.email.trim(),
            name: register.name.trim(),
            password: register.password.trim(),
            phone: phone.length < 5 ? null : phone.trim(),
        }

        let valid = true;
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setError({ email: "", name: "", phone: "", password: "", confirm: "" });

        if (data.email == "") {
            setError(errorData => ({
                ...errorData,
                email: "Champs email est obligatoire"
            }));

            valid = false;
        } else if (!isEmail.test(data.email)) {
            setError(errorData => ({
                ...errorData,
                email: "Adresse email invalide"
            }));

            valid = false;
        }

        if (data.name == "") {
            setError(errorData => ({
                ...errorData,
                name: "Champs nom complet est obligatoire"
            }));

            valid = false;
        }

        if (data.password == "") {
            setError(errorData => ({
                ...errorData,
                password: "Champs mot de passe est obligatoire"
            }));

            valid = false;
        }

        if (register.confirm.trim() == "") {
            setError(errorData => ({
                ...errorData,
                confirm: "Champs confirmer mot de passe est obligatoire"
            }));

            valid = false;
        }

        if (register.confirm.trim() != data.password) {
            setError(errorData => ({
                ...errorData,
                confirm: "Le mot de passe et la confirmation ne sont pas identiques",
            }));

            valid = false;
        }

        if (valid) {
            setLoading(true);

            try {
                const response = await axios.post(`${url}/users/register`, data);

                if (response.data.status === "success") {
                    setError({
                        email: "",
                        name: "",
                        password: "",
                        confirm: "",
                        phone: "",
                    });

                    setMainError("");
                    navigate("/verification", { state: { message: "Un code de vrification a été envoyé à votre adresse email", user: data } });
                    setLoading(false);
                } else {
                    setLoading(false);
                    console.log("error");
                }
            } catch (error: unknown) {
                setLoading(false);
                if (axios.isAxiosError(error)) {
                    setMainError(error.response?.data.message)
                    console.error("Erreur lors de l'inscription :", error.response?.data.message);
                } else {
                    console.error("Une erreur inattendue est survenue :", (error as Error).message);
                }
            }
        }
    }

    return (
        <div>
            {/* <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-0 mt-5">
                <Card className="w-full max-w-md p-6 sm:p-8 mb-8 shadow-lg">
                    <CardContent className="flex flex-col px-0">
                        <div className="text-center">
                            Logo
                            <h2 className="text-2xl font-semibold mb-6">Créer un compte</h2>
                        </div>
                        <GoogleOAuthProvider clientId={google_client}>
                            <GoogleAuth />
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
                            className="py-5 border-blue-950 text-blue-950 mb-1 text-sm"
                            onChange={(e) => handleData("email", e.target.value)}
                            value={register.email}
                        />
                        <span className="mb-4 text-red-500 text-sm">{error && error.email}</span>
                        <label htmlFor="name" className="text-left text-sm mb-1 text-gray-400">Nom et prénom</label>
                        <Input
                            placeholder="Entrez votre nom complet"
                            className="py-5 border-blue-950 text-blue-950 mb-1 text-sm"
                            onChange={(e) => handleData("name", e.target.value)}
                            value={register.name}
                        />
                        <span className="mb-4 text-sm text-red-500">{error && error.name}</span>
                        <label htmlFor="phone" className="text-left text-sm text-gray-400 mb-1">N° de téléphone</label>
                        <PhoneInput
                            className="border-blue-950 text-blue-950 mb-1 text-sm"
                            defaultCountry="fr"
                            value={phone}
                            onChange={(phone) => setPhone(phone)}
                        />
                        <span className="mb-4 text-sm text-red-500">{error && error.phone}</span>
                        <label htmlFor="password" className="text-left text-sm mb-1 text-gray-400">Mot de passe</label>
                        <div className="relative w-full">
                            <Input
                                placeholder="Créez votre mot de passe"
                                type={passwordVisible ? "" : "password"}
                                className="py-5 border-blue-950 text-blue-950 mb-1 text-sm"
                                onChange={(e) => handleData("password", e.target.value)}
                                value={register.password}
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
                        <label htmlFor="confirm" className="text-left text-sm mb-1 text-gray-400">Confirmer mot de passe</label>
                        <div className="relative w-full">
                            <Input
                                placeholder="Confirmer le mot de passe"
                                type={confirmPasswordVisible ? "" : "password"}
                                className="py-5 border-blue-950 text-blue-950 mb-1 text-sm"
                                onChange={(e) => handleData("confirm", e.target.value)}
                                value={register.confirm}
                            />
                            {confirmPasswordVisible ? (
                                <FiEyeOff
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-main-color cursor-pointer"
                                    onClick={() => setConfirmPasswordVisible((visible) => !visible)}
                                />
                            ) : (
                                <FiEye
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-main-color cursor-pointer"
                                    onClick={() => setConfirmPasswordVisible((visible) => !visible)}
                                />
                            )}
                        </div>
                        <span className="mb-4 text-sm text-red-500">{error && error.confirm}</span>
                        {loading ? (
                            <div className="text-center">
                                <ClipLoader color="#3498db" loading={loading} size={50} />
                            </div>
                        ) : (
                            <Button
                                onClick={sendData}
                                className="w-full bg-orange-500 text-white mb-4 rounded-full cursor-pointer"
                            >
                                Créer un compte
                            </Button>
                        )}
                        <p className="text-sm">
                            Vous avez déjà un compte ? <Link to="/" className="text-orange-500">Connectez-vous</Link>
                        </p>
                        <div className="flex gap-4 mt-4 mx-auto place-content-center">
                            <a href="/"><FontAwesomeIcon icon={faFacebook} className="text-blue-950 w-6 text-2xl" /></a>
                            <a href="/"><FontAwesomeIcon icon={faXTwitter} className="text-blue-950 w-6 text-2xl" /></a>
                            <a href="/"><FontAwesomeIcon icon={faInstagram} className="text-blue-950 w-6 text-2xl" /></a>
                            <a href="/"><FontAwesomeIcon icon={faLinkedinIn} className="text-blue-950 w-6 text-2xl" /></a>
                        </div>
                    </CardContent>
                </Card>
            </div> */}
            <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 text-blue-950 hover:opacity-80 transition-opacity mb-6">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Retour à l'accueil</span>
                        </Link>

                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Leaf className="w-8 h-8 text-blue-950" />
                            <h1 className="font-semibold text-2xl text-blue-950">Trekr</h1>
                        </div>
                        <p className="text-muted-foreground">Bienvenue dans l'aventure !</p>
                    </div>

                    <Card className="shadow-soft border-border/70 animate-scale-in rounded-3xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-display text-blue-950">Créer un compte</CardTitle>
                            <GoogleOAuthProvider clientId={google_client}>
                                <GoogleAuth />
                            </GoogleOAuthProvider>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-foreground">Nom complet</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Votre nom"
                                            onChange={(e) => handleData("name", e.target.value)}
                                            value={register.name}
                                            className="pl-10 rounded-2xl border-border/70 mt-2 bg-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="votre@email.com"
                                            onChange={(e) => handleData("email", e.target.value)}
                                            value={register.email}
                                            className="pl-10 rounded-2xl border-border/70 mt-2 bg-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-foreground">Mot de passe</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            onChange={(e) => handleData("password", e.target.value)}
                                            value={register.password}
                                            className="pl-10 rounded-2xl border-border/70 mt-2 bg-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-foreground">Confirmer le mot de passe</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            onChange={(e) => handleData("confirm", e.target.value)}
                                            value={register.confirm}
                                            className="pl-10 rounded-2xl border-border/70 mt-2 bg-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full rounded-2xl bg-blue-950 cursor-pointer"
                                    onClick={sendData}
                                >
                                    Créer mon compte
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Déjà un compte ?{" "}
                                    <Link to="/connexion" className="text-orange-700 hover:underline">
                                        Se connecter
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}