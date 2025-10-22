import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Train } from "lucide-react";

const Features = () => {
    const features = [
        {
            title: "Planifiez sans effort",
            description: "Dites-nous vos envies et contraintes: on orchestre un itinéraire clair, beau et réaliste.",
            icon: Calendar,
        },
        {
            title: "Voyagez plus léger",
            description: "Des choix simples et sereins, sans surcharge d'informations ni onglets à rallonge.",
            icon: Heart,
        },
        {
            title: "Décarbonez vos aventures",
            description: "Priorité au train et aux gestes du quotidien pour approcher le zéro carbone.",
            icon: Train,
        },
    ];

    return (
        <section className="py-14 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-3">
                    {features.map((f, i) => (
                        <Card key={i} className={`rounded-3xl border-border/70 shadow-soft animate-scale-in hover-glow stagger-${i + 1}`}>
                            <CardHeader>
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-blue-950 flex items-center justify-center">
                                    <f.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="mt-4 text-xl text-blue-950">{f.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{f.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
