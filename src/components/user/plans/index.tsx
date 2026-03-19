import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import React from "react";
import { useUser } from "@/context/userContext";
import axiosInstance from "@/api/config";
import { capitalizeWords, formatDateRange } from "@/assets/helpers";
import Trip from "./trip";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock, Edit2, Euro, Eye, FileText, Leaf, MapPin, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Trips{
    id: number,
    name: string,
    type: string,
    destination: string,
    status: string,
    image: string,
    budget: string,
    start_date: Date,
    end_date: Date,
    adult: number,
    carbon_emission: number,
    children: number
}

interface Trip{
    id: number,
    name: string,
    type: string,
    destination: string,
    budget: string,
    start_date: Date,
    end_date: Date,
    adult: number,
    children: number,
    total_carbon_emission: number,
    status: string,
    image: string,
}

const getStatutBadge = (statut: Trip['status']) => {
    switch (statut) {
        case 'valide':
            return <Badge variant="default" className="bg-green-600 text-white"><CheckCircle className="w-3 h-3 mr-1" />Validé</Badge>;
        case 'En cours':
            return <Badge variant="secondary" className="bg-yellow-500 text-white"><Clock className="w-3 h-3 mr-1" />En cours</Badge>;
        case 'brouillon':
            return <Badge variant="outline"><FileText className="w-3 h-3 mr-1" />Brouillon</Badge>;
        default:
            return null;
    }
};

function CityImage({ image, alt }: { image: string | null; alt: string }) {
    return (
        <img
            src={image || '/images/paris.jpg'}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/paris.jpg'; }}
        />
    );
}

export default function Plans(){
    const navigate = useNavigate(); 
    const { user, auth, loading } = useUser(); 
    const [trips, setTrips] = useState<Trips[]>([]);
    const [trip, setTrip] = useState<Trip | null>(null);
    const [activeTab, setActiveTab] = useState("tous");
    const handleDelete = async (tripId: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce voyage ?")) return;
    
        const response = await axiosInstance.delete(`trips/delete/${tripId}`);
        if (response.status === 200) {
            setTrips(prev => prev.filter(t => t.id !== tripId));
        }
    }

    useEffect(() => {
        if(!loading && !auth){
          navigate("/");
        }
    }, [auth, loading, navigate]);

    useEffect(() => {
        const getTrips = async () =>{
            if (!user?.id) return;

            try {
                const response = await axiosInstance.get("trips/get", {
                    params : {user_id : user.id}
                });
                if(response.status === 200){
                    setTrips(response.data.trips ?? []);
                }
            } catch (error) {
                setTrips([]); // Stay on empty state, don't crash
            }
            
        }
        
        getTrips();
    }, [user]);
    
    useEffect(() => {
        const getLatestTrip = async () =>{
            if (!user?.id || trips.length === 0) return;
            
            const user_id = user.id;
            const response = await axiosInstance.post("trips/latest", {user_id});
            
            if(response.status === 200){
                setTrip(response.data.trip);
            }
        }

        getLatestTrip()
    }, [user, trips]);
    
    const displayTrip = async (id: number) =>{
        const response = await axiosInstance.post("trips/first", {id});
        
        if(response.status === 200){
            setTrip(response.data.trip);
        }
    }

    const getEcoScoreColor = (score: number) => {
        if (score <= 50) return "text-green-600";   // low impact → green
        if (score <= 100) return "text-yellow-500"; // medium impact → yellow
        return "text-red-600";                      // high impact → red
    };

    const filteredVoyages = activeTab === "tous" ? trips : trips.filter(voyage => voyage.status === activeTab);

    const stats = {
        total: trips.length,
        brouillons: trips.filter(v => v.status === 'brouillon').length,
        enCours: trips.filter(v => v.status === 'En cours').length,
        valides: trips.filter(v => v.status === 'valide').length
    };
    console.log(trips);
    
    return (
        <div>
            <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                <h1 className="text-2xl font-bold text-blue-950">Mes Planners de Voyage</h1>
                <p className="text-gray-500 mt-1">
                    Gérez vos projets de voyage et suivez votre impact environnemental
                </p>
                </div>

                <Link to="/new-trip" className="bg-blue-950 text-white hover:bg-blue-900 rounded-2xl flex py-2 px-4 items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    <span>Nouveau voyage</span>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-2xl font-bold text-blue-950">{stats.total}</p>
                            </div>
                            <MapPin className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Brouillons</p>
                                <p className="text-2xl font-bold text-blue-950">{stats.brouillons}</p>
                            </div>
                            <FileText className="w-8 h-8 text-gray-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">En cours</p>
                                <p className="text-2xl font-bold text-blue-950">{stats.enCours}</p>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Validés</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.valides}</p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-5">
                <TabsList className="grid w-full grid-cols-4 mb-6 rounded-full">
                    <TabsTrigger value="tous" className="rounded-full cursor-pointer">Tous ({stats.total})</TabsTrigger>
                    <TabsTrigger value="brouillon" className="rounded-full cursor-pointer">Brouillons ({stats.brouillons})</TabsTrigger>
                    <TabsTrigger value="En cours" className="rounded-full cursor-pointer">En cours ({stats.enCours})</TabsTrigger>
                    <TabsTrigger value="valide" className="rounded-full cursor-pointer">Validés ({stats.valides})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4">
                {filteredVoyages.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-semibold mb-2">Aucun voyage trouvé</h3>
                            <p className="text-gray-500 mb-4">
                                Commencez à planifier votre prochaine aventure !
                            </p>
                            <Link to="/new-trip" className="bg-blue-950 text-white hover:bg-blue-900 rounded-2xl flex py-2 px-4 items-center w-50 mx-auto justify-center">
                                <Plus className="w-4 h-4 mr-2" />
                                <span>Nouveau voyage</span>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVoyages.map((voyage) => (
                        <Card
                            key={voyage.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
                        >
                            <div className="aspect-video relative">
                                <CityImage image={voyage.image} alt={voyage.name} />
                                <div className="absolute top-2 right-2">
                                    {getStatutBadge(voyage.status)}
                                </div>
                            </div>

                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 text-blue-950">
                                        <CardTitle className="text-lg font-semibold mb-1 ml-1">
                                            {capitalizeWords(voyage.name)}
                                        </CardTitle>
                                        <Badge variant="outline" className="mb-2">
                                            {voyage.type}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span>{voyage.destination}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span>{formatDateRange(voyage.start_date, voyage.end_date)}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-500" />
                                            <span>{voyage.adult + voyage.children} pers.</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Euro className="w-4 h-4 text-gray-500" />
                                            <span>{voyage.budget}€</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <Leaf className="w-4 h-4 text-green-600" />
                                            <span className="text-sm">Impact CO₂</span>
                                        </div>
                                        <span
                                            className={`font-semibold ${getEcoScoreColor(
                                                voyage.carbon_emission
                                            )}`}
                                        >
                                            {voyage.carbon_emission} kg
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Link
                                        to={`/trip/${voyage.id}`}
                                        className="flex-1 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        Voir
                                    </Link>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Edit2 className="w-4 h-4 mr-1" />
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDelete(voyage.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    </div>
                )}
                </TabsContent>
            </Tabs>
            </div>
        </div>
);
}