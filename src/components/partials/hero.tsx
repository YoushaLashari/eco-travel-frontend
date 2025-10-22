import { Button } from "@/components/ui/button";
import { Train, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselApi,
} from "@/components/ui/carousel";
import travelHeroBg from "/images/travel.jpg";
import adventureHero from "/images/adventure.jpg";
import ecoHero from "/images/eco.jpg";
import natureHero from "/images/nature.jpg";
import parisTravel from "/images/paris.jpg";
import barcelonaTravel from "/images/barcelona.jpg";
import dublinTravel from "/images/dublin.jpg";
import mountainNature from "/images/mountain.jpg";
import coastalNature from "/images/coastal.jpg";
import forestTravel from "/images/forest.jpg";
import { useUser } from "@/context/userContext";

const Hero = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const { auth } = useUser();

    const travelDestinations = [
        { image: travelHeroBg, name: "Nature", alt: "Destination voyage nature avec sentiers de randonnée et paysages montagneux" },
        { image: adventureHero, name: "Aventure", alt: "Voyage d'aventure avec randonneurs explorant de beaux paysages naturels" },
        { image: ecoHero, name: "Éco-tourisme", alt: "Destination voyage éco-responsable avec environnement préservé" },
        { image: natureHero, name: "Wilderness", alt: "Destination nature sauvage avec eaux cristallines et paysages majestueux" },
        { image: parisTravel, name: "Paris", alt: "Destination voyage à Paris avec monuments emblématiques et éléments naturels" },
        { image: barcelonaTravel, name: "Barcelone", alt: "Destination voyage à Barcelone avec architecture et nature intégrées" },
        { image: dublinTravel, name: "Dublin", alt: "Destination voyage à Dublin avec paysages verts et beauté naturelle" },
        { image: mountainNature, name: "Montagne", alt: "Destination montagne avec nature préservée et sentiers de randonnée" },
        { image: coastalNature, name: "Côte", alt: "Destination côtière avec plages préservées et beauté naturelle" },
        { image: forestTravel, name: "Forêt", alt: "Destination forêt parfaite pour les amoureux de la nature et l'écotourisme" }
    ];

    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 3000);

        return () => clearInterval(interval);
    }, [api]);

    return (
        <section className="relative pt-24 pb-16 md:pt-28 md:pb-24 bg-gradient-subtle">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 animate-slide-up">
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-blue-950">
                            Voyagez mieux. <span className="animate-bounce-subtle text-blue-950">Vivez plus.</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
                            Trekr crée des voyages personnalisés, respectueux de la planète,
                            et enrichis par vos choix au quotidien.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Button asChild size="lg" className="rounded-2xl bg-blue-950">
                                <Link to={`${auth ? '/dashboard' : '/login'}`} aria-label="Commencer mon voyage">
                                    <Train className="w-5 h-5 mr-2" />
                                    Commencer mon voyage
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-2xl">
                                <Link to="/how-it-works">
                                    <HelpCircle className="w-5 h-5 mr-2" />
                                    Comment ça marche ?
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="md:col-span-5 animate-scale-in">
                        <div className="rounded-3xl overflow-hidden shadow-soft border border-border hover-glow">
                            <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
                                <CarouselContent>
                                    {travelDestinations.map((destination, index) => (
                                        <CarouselItem key={index}>
                                            <div className="relative">
                                                <img
                                                    src={destination.image}
                                                    alt={destination.alt}
                                                    className="w-full h-64 object-cover"
                                                />
                                                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1">
                                                    <span className="text-sm font-medium text-foreground">{destination.name}</span>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;
