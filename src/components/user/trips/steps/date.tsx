import { addMonths } from "date-fns";
import { fr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "/images/calendar.svg";
import React from "react";

interface Error {
    date?: string;
}

interface TripDateProps {
    handleDates: (dates: { startDate: Date; endDate: Date | null }) => void;
    startDate: Date;
    endDate: Date | null;
    error?: Error;
}

export function TripDate({ handleDates, startDate, endDate, error }: TripDateProps) {
    return (
        <div>
            <h2 className="font-bold text-2xl flex place-content-center align-center">
                <span className="text-blue-950 mr-2">Choisissez vos</span> 
                <span className="text-color">dates</span>
                <img src={calendar} alt="calendar" className="w-10" />
            </h2>
            <div className="mx-auto w-100 mt-9 text-center">
                <DatePicker
                    dateFormat="dd/MM/yyyy" 
                    locale={fr}
                    selected={startDate}
                    onChange={(dates: [Date | null, Date | null] | null) => {
                        if (!dates) return;
                        handleDates({ startDate: dates[0]!, endDate: dates[1] });
                    }}
                    minDate={new Date()}
                    maxDate={addMonths(new Date(), 5)}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    showDisabledMonthNavigation
                />
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error?.date}</div>
        </div>
    );
}
