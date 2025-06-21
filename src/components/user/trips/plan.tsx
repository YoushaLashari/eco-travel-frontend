import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { TripName } from "./steps/name";
import { TripType } from "./steps/type";
import { TripOrigin } from "./steps/origin";
import { TripLocation } from "./steps/location";
import TripTransport from "./steps/transport";
import { TripDate } from "./steps/date";
import { TripBudget } from "./steps/budget";
import { TripPerson } from "./steps/persons";
import { TripNote } from "./steps/note";
import { TripConfirm } from "./steps/confirm";
import { useUser } from "@/context/userContext";
import { useWindowWidth } from "@/assets/helpers";
import axiosInstance from "@/api/config";
import React from "react";
import { NavbarAdmin } from "@/components/navbar/navbarAdmin";
import { ResponsiveNavbarAdmin } from "@/components/navbar/ResponsiveNavbarAdmin";

export default function Plan(){
    const { user, auth, loading, sidebarOpen, setSidebarOpen } = useUser(); 
    const width = useWindowWidth();
    const navigate = useNavigate();   
    const [steps, setSteps] = useState(1);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [mainError, setMainError] = useState<string>('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState(1);
    const [childrens, setChildrens] = useState(0);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [trip, setTrip] = useState({
        name : '',
        type : 'Voyages de loisirs',
        origin: '',
        location : '',
        transport : '',
        budget : '',
        notes : ''
    });
    
    const [error, setError] = useState({
        name : '',
        type: '',
        origin : '',
        location : '',
        transport : '',
        date : '',
        budget : '',
        notes : ''
    });

    useEffect(() => {
        if(!loading && !auth){
          navigate("/");
        }
    }, [auth, loading, navigate]);

    useEffect(() => {
        const getIp = async () =>{
            if (!user?.id) return;

            const response = await axiosInstance.get("trips/get-ip");
            
            if(response.status === 200){
                setCountry(response.data.ip_info.country_name);
                setCity(response.data.ip_info.city);
            }
        }  
        
        getIp();
    }, [user]);

    useEffect(() => {
        if(city && country){
            setTrip(prevTrip => ({
                ...prevTrip,
                origin: `${city}, ${country}`
            }));
        }
    }, [city, country]);

    const handleData = (name: string, value: any) => {
        setTrip(formData => ({
            ...formData,
            [name] : value
        }));
    }

    const handleDates = ({ startDate, endDate }: { startDate: Date; endDate: Date | null }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const handleAdults = (id: string) => {
        if(id === "plus_adults"){
            setAdults(adults +1);
        }else{
            if(adults > 1){
                setAdults(adults -1);
            }
        }
    }

    const handleChildrens = (id: string) => {
        if(id === "plus_childrens"){
            setChildrens(childrens +1);
        }else{
            if(childrens > 0){
                setChildrens(childrens -1);
            }
        }
    }
    
    const nextStep = async () =>{
        const data = {
            user_id : user?.id,
            name : trip.name.trim(),
            type : trip.type.trim(),
            country : trip.origin.trim(),
            destination : trip.location.trim(),
            transportation : trip.transport.trim(),
            start_date : startDate.toISOString().split("T")[0],
            end_date :  endDate?.toISOString().split("T")[0],
            budget : trip.budget.trim(),
            num_adult : adults,
            num_children : childrens,
            note : trip.notes.trim(),
            with_visa : false,
        }
        
        if(steps === 1){
            if(data.name === "" ){
                setError(errorData=>({
                    ...errorData,
                    name: "Champs nom d'itinéraire est obligatoire",
                }));
            }else{
                setSteps(steps + 1);
            }
        }

        if(data.type !== "" && steps === 2){
            setSteps(steps + 1);
        }

        if(steps === 3){
            if(data.country === ""){
                setError(errorData=>({
                    ...errorData,
                    origin: "Champs destination de départ est obligatoire",
                }));
            }else{
                setSteps(steps + 1);
            }
        }

        if(steps === 4){
            if(data.destination === ""){
                setError(errorData=>({
                    ...errorData,
                    location: "Champs destination de départ d'itinéraire est obligatoire",
                }));
            }else{
                setSteps(steps + 1);
            }
        }

        if(steps === 5){
            if(data.transportation === ""){
                setError(errorData=>({
                    ...errorData,
                    transport: "Champs type de transport est obligatoire",
                }));
            }else{
                setSteps(steps + 1);
            }
        }
        
        if(steps === 6){
            if(data.end_date === null || data.end_date === undefined){
                setError(errorData=>({
                    ...errorData,
                    date: "Champs date de début et date de fin d'itinéraire est obligatoire",
                }));
            }else if(data.start_date >= (data.end_date != undefined && data.end_date)){
                setError(errorData=>({
                    ...errorData,
                    date: "Date de fin doit être supérieur à la date début",
                }));
            }else{
                setSteps(steps + 1);
            }
        }

        if(steps === 7){
            if(data.budget === ""){
                setError(errorData=>({
                    ...errorData,
                    budget: "Champs budget d'itinéraire est obligatoire",
                }));
            }else{
                setSteps(steps + 1);
            }
        }

        if(data.num_adult > 0 && steps === 8){
            setSteps(steps + 1);
        }

        if(steps === 9){
            setSteps(steps + 1);
        }
        
        if(steps === 10){
            setLoading(true);
            
            try{
                const response = await axiosInstance.post("trips/create", data);
                
                if(response.data.status === "success"){
                    setMainError("");
                    setLoading(false);
                    navigate("/dashboard", { state: "Voyage energistré avec succès" });
                }else{
                    setLoading(false);
                    console.log("error");
                }
            }catch(error: unknown){
                setLoading(false);

                if(axios.isAxiosError(error)){
                    setMainError(error.response?.data.message)
                    console.error("Erreur lors de l'inscription :", error.response?.data.message);
                }else{
                    console.error("Une erreur inattendue est survenue :", (error as Error).message);
                }
            }
        }
    }
    
    return(
        <div>
            <div className='flex mt-8 relative'>
                {user && 
                    <>
                        {/* Desktop sidebar (visible on large screens) */}
                        <div className="bg-white w-100 p-5 drop-shadow-md rounded-l-lg h-auto hidden lg:block">
                            <NavbarAdmin />
                        </div>
                        {/* Mobile sidebar (visible when sidebarOpen is true) */}
                        <div className={`${sidebarOpen ? 'block' : 'hidden'} bg-white w-full p-5 drop-shadow-md h-full lg:hidden absolute top-0 z-50`}>
                            <ResponsiveNavbarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        </div>
                    </>
                }
                {/* <div className={`bg-main rounded-r-lg w-full pb-5 ${steps === 10 && width < 1400 ? "pb-5" : "h-custom"}`}> */}
                <div className={`bg-main rounded-r-lg w-full pb-5 ${steps !== 2 || width > 700 ? 'h-custom' : ''}`}>
                    <div className="mt-4 ml-10">
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
                    <div className={`ml-10 lg:mt-10 mt-5 mr-10 ${steps !== 2 ? 'flex justify-center' : ''}`}>
                        <div className={`${steps !== 2 ? 'w-full max-w-lg' : ''}`}> 
                            {mainError && <div className="bg-red-500 text-white rounded-sm text-center py-2 mb-4">{mainError}</div>}
                            
                            {steps === 1 ?
                                <TripName
                                    handleData = {handleData}
                                    trip = {trip}
                                    error = {error}
                                /> : steps === 2 ?
                                <TripType
                                    handleData = {handleData}
                                    trip = {trip}
                                /> : steps === 3 ?
                                <TripOrigin
                                    handleData = {handleData}
                                    trip = {trip}
                                    error = {error}
                                /> : steps === 4 ?
                                <TripLocation
                                    handleData = {handleData}
                                    trip = {trip}
                                    error = {error}
                                /> : steps === 5 ?
                                <TripTransport
                                    handleData = {handleData}
                                    trip = {trip}
                                    error = {error}
                                /> : steps === 6 ?
                                <TripDate
                                    handleDates = {handleDates}
                                    startDate = {startDate}
                                    endDate = {endDate}
                                    error = {error}
                                /> : steps === 7 ?
                                <TripBudget
                                    handleData = {handleData}
                                    trip = {trip}
                                    error = {error}
                                /> : steps === 8 ?
                                <TripPerson
                                    handleAdults = {handleAdults}
                                    handleChildrens = {handleChildrens}
                                    adults = {adults}
                                    childrens = {childrens}
                                /> : steps === 9 ?
                                <TripNote
                                    handleData = {handleData}
                                    trip = {trip}
                                    error = {error}
                                /> :
                                <TripConfirm
                                    trip = {trip}
                                    startDate = {startDate}
                                    endDate = {endDate}
                                    adults = {adults}
                                    childrens = {childrens}
                                />
                            }
                            {isLoading ? (
                                <div className="text-center">
                                    <ClipLoader color="#3498db" loading={isLoading} size={50}/>
                                </div>
                            ) : (
                                <div className={`text-center ${steps === 2 ? "flex flex-wrap place-content-between mx-5" : steps > 2 ? "flex flex-wrap place-content-between w-full mx-auto" : "w-full mx-auto"}`}>
                                    {steps > 1 && <div 
                                        className={`border border-green-900 rounded-full ${steps === 2 ? "w-25" : "w-35"} mt-9 py-1 cursor-pointer next-btn`}
                                        onClick={() => setSteps(steps - 1)}
                                    >
                                        <FontAwesomeIcon icon={faAngleLeft}/> Retour
                                    </div>}
                                    <div 
                                        className={`text-center border border-green-900 rounded-full ${steps === 2 ? "w-25" : "w-35"} mt-9 py-1 cursor-pointer next-btn flex place-content-center ${steps == 1 ? "float-right" : ""}`}
                                        onClick={nextStep}
                                    >
                                        <span>{steps === 9 ? "Confirmer" : steps === 10 ? "Sauvegarder" : "Suivant" }</span> 
                                        <span className="ml-2 mt-custom">{steps !== 9 && steps !== 10 && <FontAwesomeIcon icon={faAngleRight} />}</span>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}