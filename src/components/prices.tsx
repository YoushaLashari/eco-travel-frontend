import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const PlansTarifs = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Link to="/b2b" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour au dashboard
                    </Link>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                        💡 Choisissez votre plan
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Des solutions adaptées à tous les profils de voyageurs responsables
                    </p>
                </div>

                {/* Plans */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Plan Particulier */}
                    <Card className="relative overflow-hidden border-2 border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-xl">
                        <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 rounded-bl-lg">
                            <span className="text-sm font-bold">🌱 Populaire</span>
                        </div>
                        <CardHeader className="text-center pb-6">
                            <div className="text-6xl mb-4">🌱</div>
                            <CardTitle className="text-2xl">Plan Particulier</CardTitle>
                            <div className="text-4xl font-bold text-green-600 mt-4">
                                ✅ Gratuit
                            </div>
                            <p className="text-muted-foreground mt-2">
                                Idéal pour les voyageurs individuels.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-green-600 shrink-0" />
                                    <span>✅ Accès aux défis éco-responsables</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-green-600 shrink-0" />
                                    <span>✅ Classement global</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-green-600 shrink-0" />
                                    <span>✅ Suivi personnel des progrès</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-green-600 shrink-0" />
                                    <span>✅ Badges et récompenses</span>
                                </div>
                            </div>

                            <Link to="/accueil-b2c" className="block">
                                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    🚀 Commencer
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Plan Entreprise */}
                    <Card className="relative overflow-hidden border-2 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl">
                        <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-bl-lg">
                            <span className="text-sm font-bold">🏢 Pro</span>
                        </div>
                        <CardHeader className="text-center pb-6">
                            <div className="text-6xl mb-4">🏢</div>
                            <CardTitle className="text-2xl">Plan Entreprise</CardTitle>
                            <div className="text-4xl font-bold text-blue-600 mt-4">
                                💎 Premium
                            </div>
                            <p className="text-sm text-blue-600 font-semibold">Sur devis</p>
                            <p className="text-muted-foreground mt-2">
                                Engagez vos collaborateurs & mesurez votre impact.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-blue-600 shrink-0" />
                                    <span>✅ Dashboard entreprise</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-blue-600 shrink-0" />
                                    <span>✅ Classement interne</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-blue-600 shrink-0" />
                                    <span>✅ Reporting carbone</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-blue-600 shrink-0" />
                                    <span>✅ Support prioritaire</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-blue-600 shrink-0" />
                                    <span>✅ Personnalisation avancée</span>
                                </div>
                            </div>

                            <a href="mailto:contact@trekr.com" className="block">
                                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    <Mail className="h-4 w-4 mr-2" />
                                    📩 Contactez-nous
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-16 max-w-3xl mx-auto">
                    <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4">🤝 Pourquoi choisir Trekr ?</h3>
                            <div className="grid md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-3xl mb-2">🌱</div>
                                    <h4 className="font-semibold mb-2">Impact Réel</h4>
                                    <p className="text-sm text-muted-foreground">Réduisez concrètement votre empreinte carbone</p>
                                </div>
                                <div>
                                    <div className="text-3xl mb-2">🏆</div>
                                    <h4 className="font-semibold mb-2">Gamification</h4>
                                    <p className="text-sm text-muted-foreground">Défis motivants et classements stimulants</p>
                                </div>
                                <div>
                                    <div className="text-3xl mb-2">📊</div>
                                    <h4 className="font-semibold mb-2">Suivi Précis</h4>
                                    <p className="text-sm text-muted-foreground">Tableaux de bord détaillés et insights</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PlansTarifs;
