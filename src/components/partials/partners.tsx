import React from "react";
import { Leaf, Train, Globe, MapPin } from "lucide-react";

const Partners = () => {
    const items = [
        { name: "ADEME", caption: "Données carbone officielles", icon: Leaf },
        { name: "SNCF", caption: "Trajets en train optimisés", icon: Train },
        { name: "Tripadvisor", caption: "Recommandations authentiques", icon: Globe },
        { name: "Data Tourisme de France", caption: "Données touristiques officielles", icon: MapPin },
    ];

    return (
        <section className="py-14 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-blue-950">Des partenaires qui font la différence</h2>
                    <p className="mt-2 text-muted-foreground">Trekr s’appuie sur des données et services fiables pour enrichir vos voyages et garantir un impact mesuré.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
                    {items.map((p, i) => (
                        <div key={i} className={`rounded-3xl border border-border bg-card p-6 text-center shadow-soft animate-scale-in hover-glow stagger-${i + 1}`}>
                            <div className="mx-auto mb-3 w-10 h-10 rounded-2xl bg-secondary/30 flex items-center justify-center">
                                <p.icon className="w-6 h-6 text-blue-950" aria-hidden="true" />
                            </div>
                            <div className="font-medium text-blue-950">{p.name}</div>
                            <div className="text-sm text-muted-foreground">{p.caption}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
