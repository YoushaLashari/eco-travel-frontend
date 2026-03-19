import earth from "/images/earth.svg";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faTrainSubway, faHandsHolding, faHouse, faUtensils, faXmark } from "@fortawesome/free-solid-svg-icons";
import Food from "../carbon/food";
import Transportation from "../carbon/transportation";
import Housing from "../carbon/housing";
import Miscellaneous from "../carbon/miscellaneous";
import tickets from "/images/tickets.svg";
import tree from "/images/tree.svg";
import autumnTree from "/images/autumn-tree.svg";
import pineTree from "/images/pine-tree.svg";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from "react";
import axiosInstance from "@/api/config";
import { NavbarAdmin } from "@/components/navbar/navbarAdmin";
import { capitalizeWords } from "@/assets/helpers";
import { useUser } from "@/context/userContext";
import { ResponsiveNavbarAdmin } from "@/components/navbar/ResponsiveNavbarAdmin";

type AdemKey = "food" | "miscellaneous" | "housing" | "social_services" | "transportation";

interface Trip{
    name: string,
    carbon_emission: number,
    destination: string,
    start_date: Date,
    end_date: Date,
}

interface Adems{
    id: number,
    name: AdemKey;
    total: number
}

export default function Compensate(){
    const {id} = useParams();
    const navigate = useNavigate();
    const { auth, loading, sidebarOpen, setSidebarOpen } = useUser(); 
    const [trip, setTrip] = useState<Trip | null>(null);
    const [adems, setAdems] = useState<Adems[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [choosen, setChoosen] = useState<Record<string, string[]>>({});
    const [counter, setCounter] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [stop, setStop] = useState<boolean>(true);

    const progress = 12;
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if(!loading && !auth){
          navigate("/");
        }
    }, [auth, loading, navigate]);

    useEffect(() => {
        const getTrip = async () =>{
            if (!id) return;
            
            const response = await axiosInstance.post("trips/first", {id});
            
            if(response.status === 200){
                setTrip(response.data.trip);
            }
        }

        getTrip()
    }, [id]);

    useEffect(() => {
        const getAdems = async () =>{
            if (!id) return;
            
            const response = await axiosInstance.get("adems/all");
            
            if(response.status === 200){
                setAdems(response.data.adems);
                console.log(response.data.adems);
            }
        }

        getAdems()
    }, [id]);

    useEffect(() => {
        document.title = "Décarbonation " + trip?.name;
    }, [trip]);
    
    const toggleSelected = (key: string) => {
        setSelected(selected === key ? null : key);
    };

    const handleData = (field: string, value: string, action: "add" | "remove") => {
        setChoosen((prevState) => {
            const newFieldValues = prevState[field] || [];
    
            if(action === "add" && !newFieldValues.includes(value)){
                setCounter(counter + (100 / progress));
                setTotal(total + (100 / progress));
                newFieldValues.push(value);
            }else if(action === "remove"){
                setCounter(counter - (100 / progress));
                setTotal(total - (100 / progress));
                
                if(total < 1){
                    setTotal(0);
                }
                
                const index = newFieldValues.indexOf(value);
                if(index > -1){
                    newFieldValues.splice(index, 1);
                }
            }
    
            return {
                ...prevState,
                [field]: newFieldValues,
            };
        });
    };
    
    const ademInfo = {
        food: { icon: faUtensils, label: "Alimentation" },
        miscellaneous: { icon: faBoxes, label: "Divers" },
        housing: { icon: faHouse, label: "Logement" },
        social_services: { icon: faHandsHolding, label: "Services sociétaux" },
        transportation: { icon: faTrainSubway, label: "Transport" },
    };
    
    useEffect(() => {
        if(counter >= 80 && stop) {
            MySwal.fire({
                title: <strong>🎉 Mission accomplie! 🎉</strong>,
                html: <i>Vous avez compensé plus de 80% de votre voyage!</i>,
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'Partager mon impact',
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                color: 'white',
                timer: 5000,
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif")
                    left top
                    no-repeat
                `,
                customClass: {
                    confirmButton: 'custom-confirm-btn',
                },
            });

            setStop(false);
        }

        if(counter < 80){
            setStop(true);
        }
    }, [counter, stop]);

    return (
        <div>
            <div className="flex mt-8">
                {/* Desktop sidebar (visible on large screens) */}
                <div className="bg-white w-100 p-5 drop-shadow-md rounded-l-lg h-auto hidden lg:block">
                    <NavbarAdmin />
                </div>
                {/* Mobile sidebar (visible when sidebarOpen is true) */}
                <div className={`${sidebarOpen ? 'block' : 'hidden'} bg-white w-full p-5 drop-shadow-md h-full lg:hidden absolute top-0 z-55`}>
                    <ResponsiveNavbarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                </div>
                {trip && 
                    <div className="bg-main rounded-r-lg w-screen px-5">
                        <div className="mt-9">
                            <div className="mt-4">
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
                            <h2 className="font-bold text-xl lg:text-2xl flex place-content-center align-center">
                                <div>
                                    <span className="text-blue-950 mr-2">Mon plan,</span> 
                                    <span className="text-color">de Décarbonation ({capitalizeWords(trip?.name)})</span>
                                </div>
                                <img src={earth} alt="note" className="w-6 sm:w-10" />
                            </h2>
                        </div>
                        <div className="max-w-screen-lg mx-auto ">
                            <div className="sticky top-0 z-50 mt-5 bg-white rounded-lg shadow-md p-7 bg-linear-to-r from-blue-500 to-green-500">
                                <div className="flex items-center">
                                    <img src={tickets} alt="tickets" className="w-15" />
                                    <div className="ml-3">
                                        <h1 className="text-white font-bold">Voyage à {capitalizeWords(trip.destination) }</h1>
                                        <p className="text-white">Impact: <span className="font-bold">{trip.carbon_emission}</span> kg CO<sub>2</sub></p>
                                    </div>
                                </div>
                                <div className="mt-5 text-white">
                                    <h2 className="flex place-content-between font-bold">
                                        <span>Décarbonation: 0/{trip.carbon_emission} kg</span>
                                        <span>{total < 0 ? "0.00" : total.toFixed(2)}%</span>
                                    </h2>
                                    <div className='progress-bar-container mt-3'>
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${counter.toFixed(2)}%`,
                                                background: counter < 33 ? '#FF4910' : counter > 33 && counter < 66 ? "orange" : "green"
                                            }}
                                        >
                                            <div className="progress-label">
                                                <span className="font-bold text-sm flex items-center">
                                                    <img src={counter < 33 ? autumnTree : counter > 33 && counter < 66 ? pineTree : tree} alt="tree" className="w-5" /> 
                                                    <span className="ml-2">En progression</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-9 bg-white flex flex-wrap sm:flex-nowrap justify-between rounded-lg shadow-md p-4 gap-4">
                                {adems.map((adem, index) => (
                                    <div
                                        key={index}
                                        className={`flex-1 min-w-[120px] text-center cursor-pointer py-2 px-3 ${selected === adem.name ? "bg-active rounded-lg" : "opacity-70"} transition-all`}
                                        onClick={() => toggleSelected(adem.name)}
                                    >
                                        <span><FontAwesomeIcon icon={ademInfo[adem.name].icon} /></span>
                                        <span className="ms-2">{ademInfo[adem.name].label}</span>
                                    </div>
                                ))}
                                <div 
                                    className="flex-1 min-w-[120px] text-center cursor-pointer py-2 px-3"
                                    onClick={() => toggleSelected("")}
                                >
                                    <span><FontAwesomeIcon icon={faXmark}/></span>
                                </div>
                            </div>
                            <div className="mt-5">
                            {selected === "food" ?
                                <Food handleData={handleData} choosen={choosen}/> : 
                                selected === "miscellaneous" ?
                                <Miscellaneous handleData={handleData} choosen={choosen}/> :
                                selected === "transportation" ?
                                <Transportation handleData={handleData} choosen={choosen}/> :
                                selected === "housing" ?
                                <Housing handleData={handleData} choosen={choosen}/> : selected === "" || selected === null ?
                                <>
                                    <Food handleData={handleData} choosen={choosen}/>
                                    <Miscellaneous handleData={handleData} choosen={choosen}/>
                                    <Transportation handleData={handleData} choosen={choosen}/>
                                    <Housing handleData={handleData} choosen={choosen}/>
                                </> : ""
                            }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}