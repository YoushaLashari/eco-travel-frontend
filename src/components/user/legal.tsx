import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const Legale = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Link to="/">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour à l'accueil
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">Mentions Légales</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Informations légales et conditions d'utilisation de Trekr
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-8">
                    {/* Éditeur du site */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-green-600" />
                                Éditeur du site
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">Trekr SAS</h3>
                                <p className="text-gray-600">
                                    Société par actions simplifiée au capital de 50 000 euros
                                </p>
                                <p className="text-gray-600">
                                    Siège social : 123 Avenue de l'Innovation, 69000 Lyon, France
                                </p>
                                <p className="text-gray-600">
                                    RCS Lyon : 123 456 789
                                </p>
                                <p className="text-gray-600">
                                    SIRET : 123 456 789 00012
                                </p>
                                <p className="text-gray-600">
                                    TVA intracommunautaire : FR12345678901
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">contact@trekr.fr</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-600">+33 (0)4 72 00 00 00</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Directeur de publication */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Directeur de publication</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Marie Dupont, Présidente de Trekr SAS
                            </p>
                            <p className="text-gray-600">
                                Email : direction@trekr.fr
                            </p>
                        </CardContent>
                    </Card>

                    {/* Hébergement */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hébergement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <strong>Lovable.dev</strong>
                                </p>
                                <p className="text-gray-600">
                                    Hébergement cloud sécurisé
                                </p>
                                <p className="text-gray-600">
                                    Site web : lovable.dev
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Propriété intellectuelle */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Propriété intellectuelle</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">
                                L'ensemble de ce site relève de la législation française et internationale
                                sur le droit d'auteur et la propriété intellectuelle. Tous les droits de
                                reproduction sont réservés, y compris pour les documents téléchargeables
                                et les représentations iconographiques et photographiques.
                            </p>
                            <p className="text-gray-600">
                                La marque "Trekr" ainsi que tous les logos et visuels présents sur ce site
                                sont la propriété exclusive de Trekr SAS.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Données personnelles */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Protection des données personnelles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">
                                Conformément au Règlement Général sur la Protection des Données (RGPD)
                                et à la loi "Informatique et Libertés", vous disposez d'un droit d'accès,
                                de rectification, de suppression et de portabilité de vos données personnelles.
                            </p>
                            <p className="text-gray-600">
                                Pour exercer ces droits, vous pouvez nous contacter à l'adresse :
                                privacy@trekr.fr
                            </p>
                            <p className="text-gray-600">
                                <strong>Responsable du traitement :</strong> Trekr SAS
                            </p>
                        </CardContent>
                    </Card>

                    {/* Cookies */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Cookies et traceurs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">
                                Ce site utilise des cookies pour améliorer votre expérience de navigation
                                et mesurer l'audience. En continuant à naviguer sur ce site, vous acceptez
                                l'utilisation de cookies.
                            </p>
                            <p className="text-gray-600">
                                Vous pouvez paramétrer vos préférences cookies dans les paramètres de
                                votre navigateur.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Responsabilité */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Limitation de responsabilité</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">
                                Les informations contenues sur ce site sont aussi précises que possible.
                                Toutefois, Trekr SAS ne pourra être tenue responsable des omissions,
                                inexactitudes et carences dans la mise à jour.
                            </p>
                            <p className="text-gray-600">
                                L'utilisation des informations et contenus disponibles sur ce site
                                se fait sous l'entière responsabilité de l'utilisateur.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Droit applicable */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Droit applicable et juridiction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Les présentes mentions légales sont régies par le droit français.
                                En cas de litige, les tribunaux français seront seuls compétents.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Date de mise à jour */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Date de dernière mise à jour</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Ces mentions légales ont été mises à jour le 6 août 2025.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Call to action */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-lg p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Questions sur nos mentions légales ?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Notre équipe juridique est à votre disposition pour répondre à vos questions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <Button size="lg">
                                    Nous contacter
                                </Button>
                            </Link>
                            <Link to="/">
                                <Button variant="outline" size="lg">
                                    Retour à l'accueil
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Legale;