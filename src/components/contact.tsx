
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { url } from "@/api/url";
import axios from "axios";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        // Simulation d'envoi
        const data = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
        }

        let valid = true;
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (data.email == "") {
            setError(errorData => ({
                ...errorData,
                email: "Champs email est obligatoire"
            }));

            valid = false;
        } else if (!isEmail.test(data.email)) {
            setError(errorData => ({
                ...errorData,
                email: "email adresse invalide"
            }));

            valid = false;
        }

        if (data.name == "") {
            setError(errorData => ({
                ...errorData,
                name: "Champs nom est obligatoire"
            }));

            valid = false;
        }

        if (data.subject == "") {
            setError(errorData => ({
                ...errorData,
                subject: "Champs sujet est obligatoire"
            }));

            valid = false;
        }

        if (data.message == "") {
            setError(errorData => ({
                ...errorData,
                message: "Champs message est obligatoire"
            }));

            valid = false;
        }

        if (valid) {
            try {
                const response = await axios.post(`${url}/users/send-email`, data);
        
                if(response.status === 200){
                    toast.success("Message envoyé ! Nous vous répondrons sous 24h.");
                    setFormData({ name: '', email: '', subject: '', message: '' });
                }else{
                    console.error("error");
                }
            }catch(error: unknown){
                if(axios.isAxiosError(error)){
                    console.error("Erreur :", error.response?.data.detail);
                }else{
                    console.error("Une erreur inattendue est survenue :", (error as Error).message);
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Header */}
            <div className="bg-background border-b">
                <div className="container mx-auto px-4 py-4">
                    <Link to="/" className="flex items-center gap-2 text-blue-950 font-bold text-xl">
                        🌱 TrekR
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
                        💬 <span className="bg-gradient-to-r from-blue-950 to-orange-600 bg-clip-text text-transparent">Contactez-nous</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Une question ? Une suggestion ? Notre équipe est là pour vous aider dans votre voyage vers un tourisme plus responsable.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Formulaire de Contact */}
                    <Card className="animate-fade-in">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <MessageCircle className="w-6 h-6 text-blue-950" />
                                Envoyez-nous un message
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom complet</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Votre nom"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="rounded-2xl border-border/70 mt-2 bg-input"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="votre.email@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="rounded-2xl border-border/70 mt-2 bg-input"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Sujet</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        placeholder="L'objet de votre message"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="rounded-2xl border-border/70 mt-2 bg-input"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Décrivez votre demande en détail..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={10}
                                        className="rounded-2xl border-border/70 mt-2 bg-input"
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full bg-blue-950 cursor-pointer">
                                    <Send className="w-4 h-4 mr-2" />
                                    Envoyer le message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Informations de Contact */}
                    <div className="space-y-8 animate-fade-in">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Mail className="w-5 h-5 text-blue-950" />
                                    Nous contacter
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium text-blue-950">Email général</p>
                                        <a href="mailto:contact@trekr.com" className="text-blue-950 hover:underline">
                                            contact@trekr.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Support</p>
                                        <a href="tel:+33123456789" className="text-blue-950 hover:underline">
                                            +33 1 23 45 67 89
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Adresse</p>
                                        <p className="text-muted-foreground">
                                            123 Rue de l'Éco-tourisme<br />
                                            75001 Paris, France
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* FAQ rapide */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-blue-950">🤔 Questions fréquentes</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-medium text-sm text-blue-950">Comment calculez-vous l'empreinte carbone ?</p>
                                    <p className="text-sm text-muted-foreground">Nous utilisons les données officielles de l'ADEME et des calculateurs reconnus.</p>
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-blue-950">Les entreprises ont-elles un tableau de bord dédié ?</p>
                                    <p className="text-sm text-muted-foreground">Oui ! Découvrez nos solutions B2B sur notre page entreprise.</p>
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-blue-950">Comment rejoindre la communauté ?</p>
                                    <p className="text-sm text-muted-foreground">Inscrivez-vous gratuitement et commencez à relever vos premiers défis !</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Liens utiles */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-blue-950">🔗 Liens utiles</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link to="/comment-ca-marche" className="block text-blue-950 hover:underline">
                                    → Comment ça marche
                                </Link>
                                <Link to="/plans-tarifs" className="block  text-blue-950 hover:underline">
                                    → Plans & Tarifs
                                </Link>
                                <Link to="/register" className="block text-blue-950 hover:underline">
                                    → Créer un compte
                                </Link>
                                <Link to="/accueil-b2b" className="block text-blue-950 hover:underline">
                                    → Solutions Entreprise
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4 text-blue-950">🚀 Prêt à commencer votre voyage responsable ?</h3>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/register">
                                    <Button size="lg" style={{ backgroundColor: '#fd490f' }} className="hover:opacity-90 text-white cursor-pointer">
                                        🌱 Créer mon compte voyageur
                                    </Button>
                                </Link>
                                <Link to="/accueil-b2b">
                                    <Button size="lg" variant="outline" className="border-2 cursor-pointer" style={{ borderColor: '#0d2c59', color: '#0d2c59' }}>
                                        🏢 Solutions Entreprise
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Contact;
