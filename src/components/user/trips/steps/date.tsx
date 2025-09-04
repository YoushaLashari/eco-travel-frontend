import { addMonths } from "date-fns";
import { fr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "/images/calendar.svg";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

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
    const realTime = (date) =>{
        format(date, "yyyy-MM-dd")
    }
    return (
        <div>
            <h2 className="font-bold text-xl lg:text-2xl text-center">
                <span className="text-blue-950">Quand partez-vous ?</span> 
            </h2>
            <h2 className="text-center mt-3">
                <span className="text-gray-500">Sélectionnez vos dates de voyage</span> 
            </h2>
            <div className="mx-auto w-full mt-5 max-w-3xl px-4">
                <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
                    {/* Start Date Input */}
                    <div className="flex-1">
                        <label htmlFor="startDate" className="block mb-1 font-bold text-blue-900 text-left text-sm">Date de début</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faCalendarAlt} className="absolute text-blue-950 top-0 mt-5 ml-3 z-3" />
                            <DatePicker
                                id="startDate"
                                dateFormat="dd/MM/yyyy"
                                locale={fr}
                                selected={startDate}
                                onChange={(date: Date | null) => {
                                if (!date) return;
                                if (endDate && date > endDate) {
                                    handleDates({ startDate: date, endDate: null });
                                } else {
                                    handleDates({ startDate: date, endDate });
                                }
                                }}
                                minDate={new Date()}
                                maxDate={endDate ?? addMonths(new Date(), 5)}
                                placeholderText="Sélectionnez la date de début"
                                isClearable
                                showDisabledMonthNavigation
                                className="border rounded-xl border-input text-blue-950 text-center h-14 w-full bg-input cursor-pointer link-hover"
                            />
                        </div>
                    </div>
                    {/* End Date Input */}
                    <div className="flex-1">
                        <label htmlFor="endDate" className="block mb-1 font-bold text-blue-900 text-left text-sm">Date de fin</label>
                        <div className="relative">
                            <FontAwesomeIcon icon={faCalendarAlt} className="absolute text-blue-950 top-0 mt-5 ml-3 z-3" />
                            <DatePicker
                                id="endDate"
                                dateFormat="dd/MM/yyyy"
                                locale={fr}
                                selected={endDate}
                                onChange={(date: Date | null) => {
                                    if (!date) return;
                                    if (startDate && date < startDate) return;

                                    handleDates({ startDate, endDate: date });
                                }}
                                minDate={startDate ?? new Date()}
                                maxDate={addMonths(new Date(), 5)}
                                placeholderText="Choisir"
                                isClearable
                                showDisabledMonthNavigation
                                className="border rounded-xl border-input text-blue-950 text-center h-14 w-full bg-input cursor-pointer link-hover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-4 text-red-500 text-sm text-center">{error?.date}</div>
        </div>
    );
}
