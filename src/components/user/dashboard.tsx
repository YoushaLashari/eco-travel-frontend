import { faAdd, faCalendar, faDownload, faEdit, faLocation, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import carbon from "/images/carbon.svg";
import calendar from "/images/calendar-trip.svg";
import luggage from "/images/luggage.svg";
import earth from "/images/earth.svg";
import React from 'react';
import { useUser } from '@/context/userContext';
import axiosInstance from '@/api/config';
import { NavbarAdmin } from '../navbar/navbarAdmin';
import { ResponsiveNavbarAdmin } from '../navbar/ResponsiveNavbarAdmin';
import { calculateDurationDays, capitalizeWords, formatDate } from '@/assets/helpers';

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
  const { auth, user, loading, sidebarOpen, setSidebarOpen } = useUser();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trips[]>([]);
  
  let latestCarbonEmission = trip?.carbon_emission || 0;
  
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

      const response = await axiosInstance.get("trips/get", {
        params : {user_id : user.id}
      });
          
      if(response.status === 200){
        setTrips(response.data.trips);
      }
    }  
    
    getTrips();
  }, [user]);
  
  return (
    <div>
      <div className='bg-header w-full p-12'>
        <div className='flex items-center place-content-center text-white'>
          <div className='text-center'>
            <h1 className='lg:text-6xl text-3xl'><strong>Où allez-vous ?</strong></h1>
            <h2 className='text-xl mt-4'>Planifiez votre prochain voyage en quelques clics</h2>
            <div className='mt-8'>
              <Link to={'/trip'} className='bg-white border-0 text-blue-950 raduis py-2 px-8 text-lg font-medium'>Créer un voyage</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='flex relative'>
        {user && (
          <>
            {/* Desktop sidebar (visible on large screens) */}
            <div className={`bg-white w-100 p-5 drop-shadow-md rounded-l-lg ${trips.length > 0 ? "h-auto" : "h-custom"} hidden lg:block`}>
              <NavbarAdmin />
            </div>
            {/* Mobile sidebar (visible when sidebarOpen is true) */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} bg-white w-full p-5 drop-shadow-md h-full lg:hidden absolute top-0 z-50`}>
              <ResponsiveNavbarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
          </>
        )}
        <div className='bg-main rounded-r-lg w-screen'>
          <div className='ml-10 mt-5'>
            <button
              className="lg:hidden text-blue-900"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
          <div className="px-10">
            <div className="grid gap-4 my-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              <Link to={"/trip"} className="bg-white raduis p-5 flex items-center place-content-center drop-shadow-xl rebound-zoom">
                <div>
                  <div className='bg-blue-950 text-white rounded-full py-4 px-5 w-15 mx-auto'>
                    <FontAwesomeIcon icon={faPlus} className='text-2xl' />
                  </div>
                  <div className='mt-4 text-center text-blue-950 text-lg font-semibold'> Nouveau voyage</div>
                  <div className='mt-5 text-gray-500'>Planifiez votre prochaine destination</div>
                </div>
              </Link>
              <Link to={"/trip"} className="bg-white raduis p-5 flex items-center place-content-center drop-shadow-xl rebound-zoom">
                <div className=''>
                  <div className='bg-calendar text-white rounded-full py-4 px-5 w-15 mx-auto'>
                    <FontAwesomeIcon icon={faCalendar} className='text-2xl' />
                  </div>
                  <div className='mt-4 text-center text-blue-950 text-lg font-semibold'>Mes voyages</div>
                  <div className='mt-5 text-gray-500'>Gérez vos voyages existants</div>
                </div>
              </Link>
              <Link to={"/trip"} className="bg-white raduis p-5 flex items-center place-content-center drop-shadow-xl rebound-zoom">
                <div className=''>
                  <div className='bg-location text-white rounded-full py-4 px-5 w-15 mx-auto'>
                    <FontAwesomeIcon icon={faLocationDot} className='text-2xl' />
                  </div>
                  <div className='mt-4 text-center text-blue-950 text-lg font-semibold'>Suggestions</div>
                  <div className='mt-5 text-gray-500'>Découvrez de nouvelles destinations</div>
                </div>
              </Link>
            </div>
            <div className='mt-custom'>
              <div className='flex items-center place-content-between'>
                <h1 className='text-2xl text-blue-950 font-bold'>Vos voyages</h1>
                <div>
                  <Link to={'/plans'} className='px-3 py-2 border rounded-xl font-semibold text-sm link-hover'>
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
                            <div>{calculateDurationDays(trip.start_date, trip.end_date)}</div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/trip/${trip.id}`}
                        className="w-full block mt-5 text-center border rounded-xl font-semibold text-sm link-hover py-3"
                      >
                        Voir les détails
                      </Link>
                    </div>
                  ))
              }
              </div>
            </div>
            <div className='mt-custom'>
              <h1 className='text-2xl text-blue-950 font-bold'>Besoin d'inspiration ?</h1>
              <div className="my-5 bg-card-dashboard raduis p-7 shadow-xl">
                <div className='flex items-start place-content-between'>
                  <div>
                    <h1 className='text-xl text-blue-950 font-bold'>Découvrez de nouvelles destinations</h1>
                    <p className='text-md text-gray-500'>Laissez-nous vous proposer des idées de voyages adaptées à vos goûts</p>
                    <div className='mt-7'>
                      <Link
                        to="/plans"
                        className="text-center rounded-xl font-semibold text-sm bg-blue-950 text-white py-3 px-4 link-explore"
                      >
                        Explorer
                      </Link>
                    </div>
                  </div>
                  <div className='text-6xl text-left'>✈️</div>
                </div>
              </div>
            </div>
          </div>
          {/* {user && (
            <div className='ml-10 mt-5'>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h1 className="text-xl lg:text-2xl">
                  <span className="text-blue-950">Dashboard de</span>{' '}
                  <span className="text-color">Décarbonation</span>
                </h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center mr-0 lg:mr-5 gap-3">
                  <div className="bg-white rounded-full py-2 px-6 sm:px-10 text-blue-950 text-center cursor-pointer drop-shadow-md w-full sm:w-auto">
                    <FontAwesomeIcon icon={faDownload} />
                    <span className="ml-2">Exporter</span>
                  </div>
                  <Link
                    to="/trip"
                    className="bg-color rounded-full py-2 px-6 sm:px-10 text-white text-center cursor-pointer drop-shadow-md w-full sm:w-auto"
                  >
                    <FontAwesomeIcon icon={faAdd} />
                    <span className="ml-2">Nouveau voyage</span>
                  </Link>
                </div>
              </div>
              <div className='lg:mt-10 mt-8 mr-8'>
                <div className={`grid gap-4 my-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:${trips.length > 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  <div className='bg-white rounded-lg p-5 flex shadow-md items-start'>
                    <div>
                      <img src={carbon} alt="carbon" className='w-15' />
                    </div>
                    <div className='ms-5'>
                      <h2 className='text-blue-950'>Total empreinte CO<sub>2</sub></h2>
                      <h2 className='text-blue-950 text-xl mt-3'><strong>{trip?.total_carbon_emission.toFixed(2)} kg CO₂</strong></h2>
                      <h2 className='text-green-400 mt-3'>+{carbonPercent}% depuis votre premier voyage</h2>
                    </div>
                  </div>
                  <div className='bg-white rounded-lg p-5 flex shadow-md items-start'>
                    <div>
                      <img src={luggage} alt="luggage" className='w-15' />
                    </div>
                    <div className='ms-5'>
                      <h2 className='text-blue-950'>Mes voyages</h2>
                      <h2 className='text-blue-950 text-xl mt-3'><strong>{trips.length} {trips.length > 1 ? "Voyages" : "Voyage"}</strong></h2>
                      <h2 className='text-red-500 mt-3'>2 actions de décarbonation requises</h2>
                    </div>
                  </div>
                  {trip && 
                    <div className='bg-blue-950 rounded-lg p-5 flex shadow-md items-start'>
                      <div>
                        <img src={calendar} alt="calendar" className='w-20' />
                      </div>
                      <div className='ms-5 w-full text-white'>
                        <h2 className='text-white'>Mon dernier voyage</h2>
                        <div className='mt-3 text-sm'>
                          <div>Destination: {capitalizeWords(trip?.destination)}</div>
                          <div>Départ: {capitalizeWords(formatDate(trip.start_date))}</div>
                          <div>Retour: {capitalizeWords(formatDate(trip.end_date))}</div>
                          <div>Empreinte: {trip?.carbon_emission}Kg CO<sub>2</sub></div>
                          <div className='mt-3'>Décarbonation</div>
                          <div className="progress-bar-container w-full bg-gray-200 h-4">
                          <div
                            className="progress-bar bg-green-500 h-4 transition-all duration-300"
                            style={{ width: `${carbonPercent}%` }}
                          ></div>
                        </div>
                          <div className='flex place-content-between'>
                            <div>{trip?.carbon_emission} / {trip?.total_carbon_emission.toFixed(2)} Kg</div>
                            <div>{carbonPercent}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <div className='pt-15 pb-10'>
                  <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                    <div>
                      <span className="text-blue-950 mr-2">Mes plans,</span> 
                      <span className="text-color">de Décarbonation</span>
                    </div>
                    <img src={earth} alt="earth" className="w-6 sm:w-10" />
                  </h2>
                  <div className="mt-5 overflow-x-auto">
                    <table className="border-collapse border border-gray-400 min-w-full table-auto">
                      <thead className="bg-blue-950 text-white">
                        <tr>
                          <th className="px-4 py-2">Voyage</th>
                          <th className="px-4 py-2">Destination</th>
                          <th className="px-4 py-2">Durée</th>
                          <th className="px-4 py-2">Actions</th>
                          <th className="px-4 py-2">Décarbonation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trips.length > 0 ? (
                          trips.map((trip, index) => (
                            <tr key={index} className="text-center align-middle">
                              <td className="px-4 py-2">{capitalizeWords(trip.name)}</td>
                              <td className="px-4 py-2">{capitalizeWords(trip.destination)}</td>
                              <td className="px-4 py-2">{calculateDurationDays(trip.start_date, trip.end_date)}</td>
                              <td className="px-4 py-2">20/103</td>
                              <td className="px-4 py-2">
                                <Link to={`/compensate/${trip.id}`} className="text-blue-950 text-2xl">
                                  <FontAwesomeIcon icon={faEdit} />
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="text-center px-4 py-2">
                              Aucun voyage trouvé
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
