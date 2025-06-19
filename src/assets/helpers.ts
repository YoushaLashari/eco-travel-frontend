import axios from "axios";
import { useEffect, useState } from "react";

export const capitalizeWords = (str: string) => {
    if(str != null) return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const firstWord = (str: string) => {
    if(str != null) return str.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
};

export const calculateDuration = (startDate: string | Date, endDate: string | Date) => {
    if (!startDate || !endDate) return "N/A";

    const start = new Date(startDate);
    const end = new Date(endDate);

    if(isNaN(start.getTime()) || isNaN(end.getTime())){
        return "N/A"; // Return "N/A" if either date is invalid
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays < 7){
        return `${diffDays} ${diffDays === 1 ? "jour" : "jours"}`;
    }else if(diffDays < 30){
        const weeks = Math.floor(diffDays / 7);
        const extraDays = diffDays % 7;
        return extraDays > 0
            ? `${weeks} ${weeks === 1 ? "semaine" : "semaines"} et ${extraDays} ${extraDays === 1 ? "jour" : "jours"}`
            : `${weeks} ${weeks === 1 ? "semaine" : "semaines"}`;
    }else{
        const months = Math.floor(diffDays / 30);
        const remainingDays = diffDays % 30;
        const weeks = Math.floor(remainingDays / 7);
        const extraDays = remainingDays % 7;

        let result = `${months} ${months === 1 ? "mois" : "mois"}`;

        if(weeks > 0){
            result += ` et ${weeks} ${weeks === 1 ? "semaine" : "semaines"}`;
        }

        if(extraDays > 0){
            result += ` et ${extraDays} ${extraDays === 1 ? "jour" : "jours"}`;
        }

        return result;
    }
};

export const calculateDurationDays = (startDate: string | Date, endDate: string | Date) => {
    if (!startDate || !endDate) return "N/A";

    const start = new Date(startDate);
    const end = new Date(endDate);

    if(isNaN(start.getTime()) || isNaN(end.getTime())){
        return "N/A"; // Return "N/A" if either date is invalid
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} ${diffDays === 1 ? "jour" : "jours"}`;
};

export const calculateDaysNumbers = (startDate: string | Date, endDate: string | Date) => {
    if (!startDate || !endDate) return "N/A";

    const start = new Date(startDate);
    const end = new Date(endDate);

    if(isNaN(start.getTime()) || isNaN(end.getTime())){
        return "N/A"; // Return "N/A" if either date is invalid
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

export const api_get = (link : string, token: string) => {
    return axios.get(`https://fastapi.aimane-web-dev.com/${link}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const api_post = (link : string, token: string) => {
    return axios.post(`https://fastapi.aimane-web-dev.com/${link}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const google_key = () =>{
    return "AIzaSyBFy2vGbRFCsGxTorJcTlcrJREsJ7rLjtQ"
}

export const weather_key = () =>{
    return "dc3fb467ef3242e39d565141253003"
}

export const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
};

export const useWindowWidth = () =>{
    const isClient = typeof window !== 'undefined';

    const [width, setWidth] = useState<number>(isClient ? window.innerWidth : 0);

    useEffect(() => {
        if (!isClient) return;

        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // update width on mount

        return () => window.removeEventListener('resize', handleResize);
    }, [isClient]);

    return width;
}