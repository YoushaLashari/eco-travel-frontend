
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Navigation, BarChart3, Smartphone, Leaf, Train } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour à l'accueil
                        </Link>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
                            Comment ça marche avec Trekr
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Planifiez, voyagez et réduisez votre empreinte — facilement et sans compromis.
                        </p>

                        <div className="flex justify-center">
                            <Link to="/inscription">
                                <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-2 border-primary text-primary hover:bg-primary/5 rounded-full">
                                    Créer mon compte gratuit
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Étapes clés */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-16">

                        {/* Étape 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fd490f' }}>
                                    <Navigation className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-primary mb-4">1. Planifiez votre voyage, simplement</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Choisissez votre destination et vos envies. Trekr crée un itinéraire sur mesure, déjà optimisé pour réduire votre empreinte carbone.
                                </p>
                            </div>
                        </div>

                        {/* Étape 2 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fd490f' }}>
                                    <BarChart3 className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-primary mb-4">2. Visualisez l'impact réel</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Chaque trajet, chaque hébergement et chaque activité est traduit en impact carbone clair et lisible. Vous comprenez vos choix, sans complexité technique.
                                </p>
                            </div>
                        </div>

                        {/* Étape 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fd490f' }}>
                                    <Smartphone className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-primary mb-4">3. Voyagez mieux, en temps réel</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Trekr vous accompagne tout au long de votre voyage : météo, qualité de l'air. Vous pouvez à tout moment adapter votre itinéraire et vos activités pour profiter d'une expérience fluide, confortable et personnalisée.
                                </p>
                            </div>
                        </div>

                        {/* Étape 4 */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fd490f' }}>
                                    <Leaf className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-primary mb-4">4. Après le voyage : décarbonez au quotidien</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Trekr prolonge l'expérience en vous suggérant des habitudes simples et efficaces dans la vie de tous les jours : vélo, alimentation moins carbonée, réduction d'énergie. Vos choix ramènent progressivement votre voyage à 0 carbone net.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Résumé visuel */}
            <div className="py-16" style={{ backgroundColor: 'rgba(232, 165, 146, 0.2)' }}>
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#fd490f' }}>
                            <Train className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-xl text-foreground leading-relaxed">
                            Trekr ne se limite pas à planifier vos voyages : il vous accompagne avant, pendant et après, pour que chaque déplacement soit à la fois agréable, responsable et durable.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA final */}
            <div className="py-16" style={{ backgroundColor: '#0d2c59' }}>
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8 text-white">
                            👉 Prêt à commencer votre aventure responsable ?
                        </h2>

                        <div className="flex justify-center">
                            <Link to="/inscription">
                                <Button size="lg" style={{ backgroundColor: '#fd490f' }} className="hover:opacity-90 text-white px-8 py-3 text-lg font-semibold rounded-full">
                                    Créer mon compte gratuit
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
