import { faAdd, faDownload, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
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
  start_date: Date,
  end_date: Date
}

const Dashboard = () => {
  const { auth, user, loading, sidebarOpen, setSidebarOpen } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trips[]>([]);
  
  let latestCarbonEmission = trip?.carbon_emission || 0;
  let carbonPercent = ((latestCarbonEmission / (trip?.total_carbon_emission ?? 1)) * 100).toFixed(2);
  
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
      <div className='flex mt-8 relative'>
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
          {user && (
            <div className='ml-10 mt-5'>
              <div>
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
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h1 className="text-xl lg:text-2xl">
                  <span className="text-blue-950">Dashboard de</span>{' '}
                  <span className="text-color">Compensation</span>
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
              {location.state && <div className="p-4 bg-green-600 text-white rounded-lg mt-9 text-center">{location.state}</div>}
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
                      <h2 className='text-red-500 mt-3'>2 actions de compensation requises</h2>
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
                          <div>Empreinte:  1 Tonne CO<sub>2</sub></div>
                          <div className='mt-3'>Compensation</div>
                          <div className='progress-bar-container'>
                            <div className='progress-bar w-10'></div>
                          </div>
                          <div className='flex place-content-between'>
                            <div>0.2 / 1 tonne</div>
                            <div>10%</div>
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
                      <span className="text-color">de Compensation</span>
                    </div>
                    <img src={earth} alt="budget" className="w-6 sm:w-10" />
                  </h2>
                  <div className="mt-5 overflow-x-auto">
                    <table className="border-collapse border border-gray-400 min-w-full table-auto">
                      <thead className="bg-blue-950 text-white">
                        <tr>
                          <th className="px-4 py-2">Voyage</th>
                          <th className="px-4 py-2">Destination</th>
                          <th className="px-4 py-2">Durée</th>
                          <th className="px-4 py-2">Actions</th>
                          <th className="px-4 py-2">Compensation</th>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
