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

export default function Layout(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar/>}>
                        <Route index 
                            element={
                                <Login/>
                            } 
                        />
                        <Route path="register" element={<Register/>}/>
                        <Route path="verification" element={<Code/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="trip" element={<Plan/>}/>
                        <Route path="plans" element={<Plans/>}/>
                        <Route path="trip/:id" element={<Details />} />
                        <Route path="compensate/:id" element={<Compensate />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}