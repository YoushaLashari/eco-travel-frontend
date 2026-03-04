import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import React from 'react';
import { useUser } from '@/context/userContext';
import axiosInstance from '@/api/config';
import { calculateDurationDays, capitalizeWords } from '@/assets/helpers';
import { bousoleIcon } from '../ui/icons';
import MobileHeader from '../navbar/mobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Compass, Camera } from "lucide-react";

interface Trip{
  destination: string,
  carbon_emission: number,
  total_carbon_emission: number,
  start_date: Date,
  end_date: Date,
}

interface Trips{
  id: number,
  name: string,
  destination: string,
  total_carbon_emission: number,
  start_date: Date,
  end_date: Date
}

const Dashboard = () => {
  const { auth, user, loading } = useUser();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trips[]>([]);
  
  useEffect(() => {
    if(!loading && !auth){
      navigate("/");
    }
  }, [auth, loading, navigate]);

  useEffect(() => {
    if (!user?.id || trips.length > 0) return;

    const getLatestTrip = async () => {
      try {
        const response = await axiosInstance.post("trips/latest", {
          user_id: user.id,
        });

        if (response.status === 200) {
          setTrip(response.data.trip);
        }
      } catch (error) {
        console.error("Failed to fetch latest trip:", error);
      }
    };

    getLatestTrip();
  }, [user?.id, trips.length]);
  
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

  const quickActions = [
    {
      title: "Nouveau voyage",
      description: "Planifiez votre prochaine aventure",
      icon: Plus,
      path: "/new-trip"
    },
    {
      title: "Mes voyages",
      description: "Revivez vos souvenirs de voyage", 
      icon: Camera,
      path: "/my-trips"
    },
    {
      title: "Découvrir",
      description: "Explorez de nouvelles destinations",
      icon: Compass,
      path: "/destinations"
    }
  ];
  
  return (
    <div>
      <div className='relative bg-main'>
        <div className="md:hidden">
          <MobileHeader userName={user.name} />
        </div>
        <div className='pt-6 px-5 h-auto'>
          <div className='w-full'>
            <div 
              className="relative flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/adventure.jpg')", // Replace with your image
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-orange-700/70"></div>
              <div className="relative text-center text-white px-4 max-w-4xl py-25">
                <button className="mb-6 px-4 py-2 bg-white/20 hover:bg-white/30 text-sm font-medium rounded-full backdrop-blur flex content-center justify-center items-center w-60 mx-auto">
                  <span className='mr-2'>{bousoleIcon(15, 15)}</span>
                  <span>Tableau de Bord Aventure</span>
                </button>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                  Voyagez léger, explorez grand
                </h1>

                <p className="text-lg md:text-xl font-light">
                  Découvrez vos parcours et réduisez votre empreinte pas à pas
                </p>
              </div>
            </div>
          </div>
          <div className="xl:px-[65px] px-10">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 animate-slide-up mt-8">
              {quickActions.map((action, idx) => (
                <Card 
                  key={idx}
                  className="cursor-pointer shadow-soft hover-glow transition-all duration-300 border-border/70 rounded-3xl"
                  onClick={() => navigate(action.path)}
                >
                  <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <action.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-950" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-display text-blue-950">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center p-4 sm:p-6 pt-0">
                    <p className="text-sm sm:text-base text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </section>
            <div className='mt-custom'>
              <div className='flex items-center place-content-between'>
                <h1 className='text-2xl text-blue-950 font-bold'>Vos voyages</h1>
                <div>
                  <Link to={'/my-trips'} className='px-3 py-2 border rounded-xl font-semibold text-sm link-hover'>
                    Voir tout
                  </Link>
                </div>
              </div>
              <div className="grid gap-8 my-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                {trips.length > 0 &&
                  trips
                  .slice() // create a shallow copy to avoid mutating original
                  .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()) // latest first
                  .slice(0, 2) // take the latest 4
                  .map((trip, index) => (
                    <div key={index} className="bg-white raduis p-5 shadow-xl rebound-zoom border">
                      <div className='flex items-start'>
                        <div className='rounded-circle bg-icone w-7 h-7 text-center flex place-content-center items-center mt-1'>
                          <FontAwesomeIcon icon={faLocationDot} color='#2E496D' />
                        </div>
                        <div className='ml-3'>
                          <h3 className='text-xl text-blue-950 font-semibold'>{capitalizeWords(trip.name)}</h3>
                          <div className='text-md text-gray-500 flex items-center'>
                            <div>
                              {new Date(trip.start_date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                              }).replace(/^\w/, c => c.toUpperCase())}
                            </div>
                            <div className="w-1 h-1 bg-gray-500 rounded-full mx-2"></div>
                            <div>{calculateDurationDays(trip.start_date, trip.end_date)} Jours</div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/trip/${trip.id}`}
                        className="w-full block mt-5 text-center border rounded-xl font-semibold text-sm link-hover py-1.5 bg-main text-blue-950"
                      >
                        Voir les détails
                      </Link>
                    </div>
                  ))
              }
              </div>
            </div>
            <div className='mt-custom pb-5'>
              <h1 className='text-2xl text-blue-950 font-bold'>Inspiration du jour</h1>
              <div className="my-5 bg-card-dashboard raduis p-7 shadow-xl">
                <div className='flex items-start place-content-between'>
                  <div>
                    <p className='text-md text-gray-500'>"Le voyage ne se mesure pas en kilomètres, mais en expériences vécues"</p>
                    <div className='mt-7'>
                      <Link
                        to="/plans"
                        className="text-center rounded-2xl font-semibold text-sm bg-blue-950 text-white py-2 px-4 link-explore flex lg:w-75 justify-center items-center"
                      >
                        <Compass className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Découvrir de nouvelles destinations</span>
                        <span className="sm:hidden text-center">Découvrir</span>
                      </Link>
                    </div>
                  </div>
                  <div className='text-6xl text-left'>🚂</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
