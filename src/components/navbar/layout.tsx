import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./navbar";
import Login from "../user/login";
import Register from "../user/register";
import Dashboard from "../user/dashboard";
import Code from "../user/code";
import Plan from "../user/trips/plan";
import Plans from "../user/plans";
import Details from "../user/plans/details";
import Compensate from "../user/plans/compensate";
import Profile from "../user/profile";
import Impact from "../user/impact";
import { useUser } from "@/context/userContext";
import Actions from "../user/mission";
import Habits from "../user/habits";
import Destinations from "../user/destinations";
import UserNavbar from "./userNavbar";
import Homepage from "../hompage";
import HowItWorks from "../howItWorks";
import Contact from "../contact";
import Legale from "../user/legal";
import AccueilB2B from "../b2b";
import PlansTarifs from "../prices";

export default function Layout(){
    const { auth } = useUser();
    
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={auth ? <Navbar/> : <UserNavbar/>}>
                        <Route index element={<Homepage/>} 
                    />
                        <Route path="how-it-works" element={<HowItWorks/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="legals" element={<Legale/>}/>
                        <Route path="b2b" element={<AccueilB2B/>}/>
                        <Route path="prices" element={<PlansTarifs/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="verification" element={<Code/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="new-trip" element={<Plan/>}/>
                        <Route path="my-trips" element={<Plans/>}/>
                        <Route path="impacts" element={<Impact/>}/>
                        <Route path="mission-carbon" element={<Actions/>}/>
                        <Route path="destinations" element={<Destinations/>}/>
                        <Route path="trip/:id" element={<Details />} />
                        <Route path="compensate/:id" element={<Compensate />} />
                        <Route path="habits/:id" element={<Habits />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}