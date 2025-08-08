import React from "react";
import { useEffect, useState } from "react";

export default function Slider({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [slides.length]);

    return (
        <div className="relative w-full max-w-xl h-64 mx-auto overflow-hidden rounded-xl shadow-lg">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={`Slide ${index}`}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 text-white font-bold p-3">
                        <span className="text-sm"></span>{slide.text_1} <br />
                        <span className="text-xs">{slide.text_2}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}