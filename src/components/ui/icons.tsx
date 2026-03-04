import React, { JSX } from "react"

export const menuIcon = (width: number, height: number): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="lucide lucide-panel-left"
    >
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M9 3v18"></path>
    </svg>
);

export const houseIcon = (width: number, height: number): JSX.Element => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="lucide lucide-house w-4 h-4 mr-3 flex-shrink-0"
    >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    </svg>
);

export const userIcon = (width :number, height :number): JSX.Element => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user mr-2 h-4 w-4"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
    </svg>
);

export const destinationDotIcon = (width :number, height :number): JSX.Element => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="lucide lucide-map-pin w-4 h-4 mr-3 flex-shrink-0"
    >
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export const cardIcon = (width :number, height :number): JSX.Element => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="lucide lucide-credit-card w-4 h-4 mr-3 flex-shrink-0"
    >
        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
        <line x1="2" x2="22" y1="10" y2="10"></line>
    </svg>
);

export const questionMarkIcon = (width :number, height :number): JSX.Element => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="lucide lucide-circle-help w-4 h-4 mr-3 flex-shrink-0"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <path d="M12 17h.01"></path>
    </svg>
);

export const bousoleIcon = (width :number, height :number): JSX.Element => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="lucide lucide-compass w-3 h-3 sm:w-4 sm:h-4"
    >
        <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"></path>
        <circle cx="12" cy="12" r="10"></circle>
    </svg>
);