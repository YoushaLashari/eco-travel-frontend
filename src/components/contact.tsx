
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

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation d'envoi
        toast.success("Message envoyé ! Nous vous répondrons sous 24h.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Header */}
            <div className="bg-background border-b">
                <div className="container mx-auto px-4 py-4">
                    <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                        🌱 TrekR
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
                        💬 <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contactez-nous</span>
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
                                <MessageCircle className="w-6 h-6 text-primary" />
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
                                        rows={5}
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full">
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
                                    <Mail className="w-5 h-5 text-primary" />
                                    Nous contacter
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Email général</p>
                                        <a href="mailto:contact@trekr.com" className="text-primary hover:underline">
                                            contact@trekr.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Support</p>
                                        <a href="tel:+33123456789" className="text-primary hover:underline">
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
                                <CardTitle className="text-xl">🤔 Questions fréquentes</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-medium text-sm">Comment calculez-vous l'empreinte carbone ?</p>
                                    <p className="text-sm text-muted-foreground">Nous utilisons les données officielles de l'ADEME et des calculateurs reconnus.</p>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Les entreprises ont-elles un tableau de bord dédié ?</p>
                                    <p className="text-sm text-muted-foreground">Oui ! Découvrez nos solutions B2B sur notre page entreprise.</p>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Comment rejoindre la communauté ?</p>
                                    <p className="text-sm text-muted-foreground">Inscrivez-vous gratuitement et commencez à relever vos premiers défis !</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Liens utiles */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">🔗 Liens utiles</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link to="/comment-ca-marche" className="block text-primary hover:underline">
                                    → Comment ça marche
                                </Link>
                                <Link to="/plans-tarifs" className="block text-primary hover:underline">
                                    → Plans & Tarifs
                                </Link>
                                <Link to="/inscription" className="block text-primary hover:underline">
                                    → Créer un compte
                                </Link>
                                <Link to="/accueil-b2b" className="block text-primary hover:underline">
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
                            <h3 className="text-2xl font-bold mb-4">🚀 Prêt à commencer votre voyage responsable ?</h3>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/inscription">
                                    <Button size="lg" style={{ backgroundColor: '#fd490f' }} className="hover:opacity-90 text-white">
                                        🌱 Créer mon compte voyageur
                                    </Button>
                                </Link>
                                <Link to="/accueil-b2b">
                                    <Button size="lg" variant="outline" className="border-2" style={{ borderColor: '#0d2c59', color: '#0d2c59' }}>
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
