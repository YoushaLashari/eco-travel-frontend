import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Business = () => {
    return (
        <section className="py-14 md:py-20 bg-gradient-subtle">
            <div className="container mx-auto px-4">
                <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-slide-up hover-glow">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-blue-950">
                            Trekr accompagne aussi les entreprises
                        </h2>
                        <p className="mt-2 text-muted-foreground max-w-2xl">
                            pour rendre les voyages de leurs salariés plus durables.
                        </p>
                    </div>
                    <Button asChild variant="outline" size="lg" className="rounded-2xl">
                        <Link to="/accueil-b2b">Découvrir l’offre entreprise</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Business;
