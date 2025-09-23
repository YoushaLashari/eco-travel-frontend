import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building2, Users, BarChart3, Shield, CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const AccueilB2B = () => {
    const handleDemoBooking = () => {
        // Ouvrir Calendly ou système de réservation
        window.open("https://calendly.com/trekr-demo", "_blank");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                            🌱 TrekR
                        </Link>
                        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="py-20" style={{ backgroundColor: '#0d2c59' }}>
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <Building2 className="w-16 h-16 mx-auto mb-6" style={{ color: '#fd490f' }} />
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Trekr <span className="text-orange-400">Business</span>
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 opacity-90">
                            Aidez vos collaborateurs à voyager de manière responsable et mesurez l'impact RSE de votre entreprise
                        </p>
                        <Button
                            size="lg"
                            onClick={handleDemoBooking}
                            style={{ backgroundColor: '#fd490f' }}
                            className="hover:opacity-90 text-white px-8 py-4 text-lg font-semibold rounded-full"
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Réserver une démo
                        </Button>
                    </div>
                </div>
            </div>

            {/* Problèmes entreprise */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#0d2c59' }}>
                            Les défis de votre entreprise
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Concilier productivité, satisfaction des employés et objectifs RSE
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="text-center p-6">
                            <CardContent>
                                <BarChart3 className="w-12 h-12 mx-auto mb-4" style={{ color: '#fd490f' }} />
                                <h3 className="text-lg font-semibold mb-3">Reporting RSE complexe</h3>
                                <p className="text-muted-foreground text-sm">
                                    Difficile de mesurer et reporter l'empreinte carbone des déplacements professionnels
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center p-6">
                            <CardContent>
                                <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#fd490f' }} />
                                <h3 className="text-lg font-semibold mb-3">Engagement des équipes</h3>
                                <p className="text-muted-foreground text-sm">
                                    Comment sensibiliser vos collaborateurs aux voyages durables sans contrainte
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center p-6">
                            <CardContent>
                                <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: '#fd490f' }} />
                                <h3 className="text-lg font-semibold mb-3">Conformité réglementaire</h3>
                                <p className="text-muted-foreground text-sm">
                                    Respecter les nouvelles obligations de reporting environnemental
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Solutions Trekr Business */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#0d2c59' }}>
                            La solution Trekr Business
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Une plateforme complète pour transformer les voyages d'affaires de vos équipes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <CheckCircle className="w-6 h-6 mt-1" style={{ color: '#fd490f' }} />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Dashboard administrateur</h3>
                                    <p className="text-muted-foreground">
                                        Visualisez l'empreinte carbone de tous les voyages, générez des rapports automatiques pour votre reporting RSE
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <CheckCircle className="w-6 h-6 mt-1" style={{ color: '#fd490f' }} />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Gestion des équipes</h3>
                                    <p className="text-muted-foreground">
                                        Créez des comptes pour vos collaborateurs, définissez des budgets carbone par département
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <CheckCircle className="w-6 h-6 mt-1" style={{ color: '#fd490f' }} />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Recommandations intelligentes</h3>
                                    <p className="text-muted-foreground">
                                        Proposez automatiquement les options de transport et hébergement les plus durables
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <CheckCircle className="w-6 h-6 mt-1" style={{ color: '#fd490f' }} />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Compensation carbone</h3>
                                    <p className="text-muted-foreground">
                                        Intégration avec des projets de compensation certifiés pour atteindre la neutralité carbone
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4" style={{ color: '#0d2c59' }}>
                                Résultats mesurés
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Réduction empreinte carbone</span>
                                    <span className="font-bold text-2xl" style={{ color: '#fd490f' }}>-35%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Satisfaction employés</span>
                                    <span className="font-bold text-2xl" style={{ color: '#fd490f' }}>+28%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Temps de reporting</span>
                                    <span className="font-bold text-2xl" style={{ color: '#fd490f' }}>-80%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Final */}
            <div className="py-16" style={{ backgroundColor: 'rgba(232, 165, 146, 0.2)' }}>
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6" style={{ color: '#0d2c59' }}>
                            Prêt à transformer les voyages d'affaires de votre entreprise ?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Découvrez comment Trekr Business peut vous aider à atteindre vos objectifs RSE tout en améliorant l'expérience voyage de vos équipes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                onClick={handleDemoBooking}
                                style={{ backgroundColor: '#fd490f' }}
                                className="hover:opacity-90 text-white px-8 py-3 text-lg font-semibold rounded-full"
                            >
                                <Calendar className="w-5 h-5 mr-2" />
                                Réserver une démo gratuite
                            </Button>
                            <Link to="/contact">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-3 text-lg border-2 rounded-full"
                                    style={{ borderColor: '#0d2c59', color: '#0d2c59' }}
                                >
                                    Nous contacter
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccueilB2B;