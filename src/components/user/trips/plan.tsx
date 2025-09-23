import { faAngleLeft, faAngleRight, faCalendar, faClipboardList, faDollarSign, faGlobe, faLanguage, faLocation, faLocationArrow, faLocationDot, faPen, faPlane, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { TripName } from "./steps/name";
import { TripType } from "./steps/type";
import { TripOrigin } from "./steps/origin";
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
import TripLanguage from "./steps/language";
import { format } from "date-fns";

export default function Plan(){
    const { user, auth, loading, sidebarOpen, setSidebarOpen } = useUser(); 
    const width = useWindowWidth();
    const navigate = useNavigate();   
    const [steps, setSteps] = useState(1);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
    const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(true);
    const [mainError, setMainError] = useState<string>('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState(1);
    const [childrens, setChildrens] = useState(0);
    const [cardWithd, setCardWidth] = useState(10);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [trip, setTrip] = useState({
        name : '',
        type : '',
        origin: '',
        location : '',
        transport : '',
        budget : '',
        language : '',
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
        language : '',
        notes : ''
    });

    const icons = [
        { icon: <FontAwesomeIcon icon={faLocationDot}/> },
        { icon: <FontAwesomeIcon icon={faGlobe}/> },
        { icon: <FontAwesomeIcon icon={faLocationDot}/> },
        { icon: <FontAwesomeIcon icon={faPlane}/> },
        { icon: <FontAwesomeIcon icon={faCalendar}/> },
        { icon: <FontAwesomeIcon icon={faDollarSign}/> },
        { icon: <FontAwesomeIcon icon={faUsers}/> },
        { icon: <FontAwesomeIcon icon={faLanguage}/> },
        { icon: <FontAwesomeIcon icon={faPen}/> },
        { icon: <FontAwesomeIcon icon={faClipboardList}/> },
    ];

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
        if(value && value.length > 0){
            setIsNextDisabled(false);
        }else{
            setIsNextDisabled(true);
        }

        setTrip(formData => ({
            ...formData,
            [name] : value
        }));
    }

     const handleDates = ({startDate, endDate,}: {startDate: Date; endDate: Date | null;}) => {
        setStartDate(startDate);
        setEndDate(endDate);

        if(startDate && startDate != null && endDate && endDate != null){
            setIsNextDisabled(false);
        }else{
            setIsNextDisabled(true);
        }
    };

    const handleAdults = (id: string) => {
        if(id === "plus_adults"){
            setAdults(adults +1);
        }else{
            if(adults > 1){
                setAdults(adults -1);
            }
        }

        setIsNextDisabled(adults < 1);
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

    const previousStep = () => {
        setSteps(steps - 1);
        setCardWidth(prev => Math.max(prev - 10, 0));
    }
    
    const nextStep = async () =>{
        const data = {
            user_id : user?.id,
            name : trip.name.trim(),
            type : trip.type.trim(),
            country : trip.origin.trim(),
            destination : trip.location.trim(),
            transportation : trip.transport.trim(),
            language : trip.language.trim(),
            start_date : startDate.toISOString().split("T")[0],
            end_date :  format(endDate, "yyyy-MM-dd"),
            budget : trip.budget,
            num_adult : adults,
            num_children : childrens,
            note : trip.notes.trim(),
            with_visa : false,
        }
        
        
        setCardWidth(prev => Math.min(prev + 10, 100));
        setIsNextDisabled(true);

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
            if(data.country === "" || data.destination === ""){
                if(data.country === ""){
                    setError(errorData=>({
                        ...errorData,
                        origin: "Champs destination de départ est obligatoire",
                    }));
                }
    
                if(data.destination === ""){
                    setError(errorData=>({
                        ...errorData,
                        location: "Champs destination de départ d'itinéraire est obligatoire",
                    }));
                }
            }else{
                setSteps(steps + 1);
            }
        }

        if(steps === 4){
            if(data.transportation === ""){
                setError(errorData=>({
                    ...errorData,
                    transport: "Champs type de transport est obligatoire",
                }));
            }else{
                setSteps(steps + 1);
            }
        }
        
        if(steps === 5){
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

        if(steps === 6){
            if(data.budget === ""){
                setError(errorData=>({
                    ...errorData,
                    budget: "Champs budget d'itinéraire est obligatoire",
                }));
            }else{
                setSteps(steps + 1);
            }
        }

        if(data.num_adult > 0 && steps === 7){
            setSteps(steps + 1);
        }

        if(steps === 8){
            if(data.language === ""){
                setError(errorData=>({
                    ...errorData,
                    transport: "Champs langue préférée est obligatoire",
                }));
            }else{
                setSteps(steps + 1);
            }
        }

        if(steps === 9){
            setSteps(steps + 1);
        }
        
        if(steps === 10){
            setLoading(true);
            
            try{
                const response = await axiosInstance.post("trips/create", data);
                
                if(response.data.status === "success"){
                    const tripId = response.data.trip.id;
                    
                    setMainError("");
                    setLoading(false);
                    navigate(`/trip/${tripId}`);
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

    
    useEffect(() => {
        if(steps > 1){
            setIsPreviousDisabled(false);
        }else{
            setIsPreviousDisabled(true);
        }
    }, [steps]);

    useEffect(() => {
        if(steps === 1){
            trip.name.length > 0 ? setIsNextDisabled(false) : setIsNextDisabled(true);
        }

        if(steps === 2){
            trip.type.length > 0 ? setIsNextDisabled(false) : setIsNextDisabled(true);
        }

        if(steps === 3){
            trip.origin.length > 0 ? setIsNextDisabled(false) : setIsNextDisabled(true);
            trip.location.length > 0 ? setIsNextDisabled(false) : setIsNextDisabled(true);
        }

        if(steps === 4){
            trip.transport.length > 0 ? setIsNextDisabled(false) : setIsNextDisabled(true);
        }

        if(steps === 5){
            startDate instanceof Date && !isNaN(startDate.getTime()) ? setIsNextDisabled(false) : setIsNextDisabled(true);
            endDate instanceof Date && !isNaN(startDate.getTime()) ? setIsNextDisabled(false) : setIsNextDisabled(true);
        }

        if(steps === 6){
            trip.budget.length > 0 ? setIsNextDisabled(false) : setIsNextDisabled(true);
        }

        if(steps === 7){
            adults >= 1 ? setIsNextDisabled(false) : setIsNextDisabled(true);
        }

        if(steps === 8){
            trip.language.length > 0 ? setIsNextDisabled(false) : setIsNextDisabled(true);
        }

        if(steps === 9){
            setIsNextDisabled(false);
        }

        if(steps === 10){
            setIsNextDisabled(false);
        }
    }, [steps, trip, adults, startDate, endDate]);
    
    return(
        <div>
            <div className='flex relative min-h-screen'>
                <div className={`bg-create rounded-r-lg w-full pb-5 ${(steps === 10 || steps === 2) && width <= 700 ? '' : 'h-auto'}`}>
                    <div className={`ml-10 lg:mt-10 mt-5 mr-10 flex justify-center`}>
                        <div className={`w-full max-w-4xl`}>
                            <div className="py-2 rounded-2xl font-semibold text-sm w-75 mx-auto text-center mt-4 flex items-center justify-center text-blue-950 bg-white border border-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-sparkles w-4 h-4 text-primary"
                                >
                                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                                    <path d="M20 3v4"></path>
                                    <path d="M22 5h-4"></path>
                                    <path d="M4 17v2"></path>
                                    <path d="M5 18H3"></path>
                                </svg>
                                <span className="ms-2">Créateur de voyage intelligent</span>
                            </div>
                            <h1 className="text-center text-plan-color font-semibold text-4xl mt-5">
                                Planifiez votre voyage parfait
                            </h1>
                            <h3 className="text-gray-500 text-center mt-3 text-xl">Laissez-nous vous guider étape par étape</h3>
                            <div className="hidden md:flex items-center justify-center w-full mt-8">
                                {icons.map((icon, index) => (
                                    <React.Fragment key={index}>
                                        {/* Step circle */}
                                            <div
                                                className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${steps === (index+1) ? "border-blue-950 bg-blue-950 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)] animate-pulse" : (index+1) < steps ? "border-green-500 bg-green-plan text-white" : "border-gray-300 bg-white text-gray-500"}`}
                                            >
                                                {(index+1) < steps ? (
                                                    // Check icon for completed steps
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    // Regular step icon
                                                    icon.icon
                                                )}
                                            </div>                            
                                            {/* Line between steps */}
                                            {index < icons.length - 1 && (
                                                <div className={`flex-1 h-1 transition-all duration-500 mx-2 rounded ${(index+1) < steps ? "bg-green-500" : "bg-gray-300"}`}></div>
                                            )}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="py-2 rounded-3xl text-sm w-30 mx-auto text-center mt-6 flex items-center justify-center bg-white border border-gray-300">
                                <span className="mr-2 font-semibold text-blue-950">Étape {steps}</span>
                                <span className="text-gray-400 font-semibold">sur 10</span>
                            </div>
                            <div className="w-full max-w-2xl mx-auto">
                                <div className="bg-white rounded-3xl p-5 mt-8 shadow-xl text-center">
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
                                        <TripTransport
                                            handleData = {handleData}
                                            trip = {trip}
                                            error = {error}
                                        /> : steps === 5 ?
                                        <TripDate
                                            handleDates = {handleDates}
                                            startDate = {startDate}
                                            endDate = {endDate}
                                            error = {error}
                                        /> : steps === 6 ?
                                        <TripBudget
                                            handleData = {handleData}
                                            trip = {trip}
                                            error = {error}
                                        /> : steps === 7 ?
                                        <TripPerson
                                            handleAdults = {handleAdults}
                                            handleChildrens = {handleChildrens}
                                            adults = {adults}
                                            childrens = {childrens}
                                        /> : steps === 8 ?
                                        <TripLanguage
                                            handleData = {handleData}
                                            trip = {trip}
                                            error = {error}
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
                                </div>
                                {isLoading ? (
                                    <div className="text-center">
                                        <ClipLoader color="#3498db" loading={isLoading} size={50}/>
                                    </div>
                                ) : (
                                    <div className="w-full mx-auto flex flex-wrap items-center justify-between text-center">
                                        {/* Previous button */}
                                        <div
                                            className={`border border-gray-300 rounded-2xl w-20 lg:w-35 mt-9 py-2 cursor-pointer font-semibold text-sm link-hover bg-white ${isPreviousDisabled ? "disabled" : ""}`}
                                            onClick={previousStep}
                                        >
                                            <FontAwesomeIcon icon={faAngleLeft} /> Retour
                                        </div>
                                        {/* Progress bar */}
                                        <div className="w-full md:w-auto order-3 md:order-2 mt-6 md:mt-0 md:flex-1 mx-5">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-950 h-2 rounded-full transition-[width] duration-500 ease-in-out" style={{ width: `${cardWithd}%` }}></div>
                                            </div>
                                        </div>
                                        {/* Next / Create button */}
                                        {steps === 10 ? (
                                            <div
                                                className="py-2 rounded-2xl font-semibold text-sm w-45 lg:w-50 mx-auto text-center mt-9 flex items-center justify-center rebound-zoom-btn bg-confirm-btn border border-gray-300 text-white cursor-pointer order-2 md:order-3"
                                                onClick={nextStep}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#fff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-sparkles w-4 h-4 text-primary"
                                                >
                                                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                                                    <path d="M20 3v4"></path>
                                                    <path d="M22 5h-4"></path>
                                                    <path d="M4 17v2"></path>
                                                    <path d="M5 18H3"></path>
                                                </svg>
                                                <span className="ms-2">Créer mon voyage</span>
                                            </div>
                                        ) : (
                                            <div
                                                className={`text-center border border-blue-950 rebound-zoom-btn font-semibold text-sm bg-blue-btn rounded-xl mt-9 py-2 cursor-pointer next-btn text-white w-20 lg:w-35 float-right order-2 md:order-3 ${isNextDisabled ? "disabled" : ""}`}
                                                onClick={nextStep}
                                            >
                                                <span>Suivant</span>
                                                <span className="mt-custom">
                                                    {" "}
                                                    <FontAwesomeIcon icon={faAngleRight} />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}