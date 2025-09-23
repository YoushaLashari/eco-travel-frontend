import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Mail, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Leaf className="w-6 h-6" />
                            <span className="font-semibold text-xl">Trekr</span>
                        </div>
                        <p className="text-primary-foreground/80 max-w-md">
                            Votre compagnon de voyage éco-responsable pour des aventures personnalisées et durables.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold mb-4">Navigation</h3>
                        <div className="space-y-2">
                            <Link to="/comment-ca-marche" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                Comment ça marche
                            </Link>
                            <Link to="/contact" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                Contact
                            </Link>
                            <Link to="/accueil-b2b" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                Entreprises
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <div className="space-y-2 text-primary-foreground/80">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">contact@trekr.fr</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">Paris, France</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partners */}
                <div className="border-t border-primary-foreground/20 mt-8 pt-6">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/images/partners.png"
                            alt="Partenaires - République Française, ADEME, Impact CO2"
                            className="h-20 object-contain opacity-80"
                        />
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-primary-foreground/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-primary-foreground/60 text-sm">
                        © 2025 Trekr. Tous droits réservés.
                    </p>
                    <div className="flex gap-4 text-sm">
                        <Link to="/mentions-legales" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                            Mentions légales
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;