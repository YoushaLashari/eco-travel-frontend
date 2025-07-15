import { faArrowTrendDown, faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Badge(){
    return(
        <div className='mx-10 my-5'>
            <div><strong>Mes badges</strong></div>
            <div className="text-gray-500">Continuez à améliorer votre impact</div>
            <div className={`grid gap-4 my-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2`}>
                <div className="mt-3 border p-4 rounded bg-white flex place-content-center items-start">
                    <div className="w-full">
                        <div className="p-3 bg-green-100 circle text-center w-15 mx-auto"><FontAwesomeIcon icon={faMedal} className="mt-1" style={{ fontSize : 25 }} color={'#4CAF50'} /></div>
                        <div className="text-center">Éco-voyageur</div>
                        <div className="text-gray-500 mt-1 text-center text-xs">3 voyages éco-responsables</div>
                        <div className="progress-bar-badge-container w-full bg-gray-200 h-4 mt-2">
                            <div className={`progress-bar-follow-up bg-green-500 h-4 transition-all duration-300`} style={{ width: `100%` }}></div>
                        </div>
                        <div className="text-center text-sm">100%</div>
                    </div>
                </div>
                <div className="mt-3 border p-4 rounded bg-white flex place-content-center items-start">
                    <div className="w-full">
                        <div className="p-3 bg-amber-100 circle text-center w-15 mx-auto"><FontAwesomeIcon icon={faMedal} className="mt-1" style={{ fontSize : 25 }} color={'#FF9800'} /></div>
                        <div className="text-center">Expert Local</div>
                        <div className="text-gray-500 mt-1 text-center text-xs">4 semaines de consommation locale</div>
                        <div className="progress-bar-badge-container w-full bg-gray-200 h-4 mt-2">
                            <div className={`progress-bar-follow-up bg-amber-500 h-4 transition-all duration-300`} style={{ width: `75%` }}></div>
                        </div>
                        <div className="text-center text-sm">75%</div>
                    </div>
                </div>
                <div className="mt-3 border p-4 rounded bg-white flex place-content-center items-start">
                    <div className="w-full">
                        <div className="p-3 bg-blue-100 circle text-center w-15 mx-auto"><FontAwesomeIcon icon={faMedal} className="mt-1" style={{ fontSize : 25 }} color={'#2196F3'} /></div>
                        <div className="text-center">Zéro Déchet</div>
                        <div className="text-gray-500 mt-1 text-center text-xs">Réduction des déchets de 50%</div>
                        <div className="progress-bar-badge-container w-full bg-gray-200 h-4 mt-2">
                            <div className={`progress-bar-follow-up bg-blue-500 h-4 transition-all duration-300`} style={{ width: `50%` }}></div>
                        </div>
                        <div className="text-center text-sm">50%</div>
                    </div>
                </div>
            </div>
            <div className="mt-3"><strong>Prochains défis</strong></div>
            <div className="text-gray-500">Relevez ces défis pour obtenir de nouveaux badges</div>
            <div className="mt-3 border p-4 rounded bg-white flex place-content-between items-start">
                <div className="flex items-start">
                    <div className="p-3 bg-red-100 circle text-center mx-auto"><FontAwesomeIcon icon={faArrowTrendDown} className="mt-1" style={{ fontSize : 25 }} color={'#E91E63'} /></div>
                    <div className="ms-2">
                        <div>Expert Mobilité Douce</div>
                        <div className="text-xs text-gray-500">30 jours sans utiliser de voiture</div>
                    </div>
                </div>
                <div className="text-green-500 text-end mt-3 cursor-pointer border border-green-500 py-1 px-3 rounded text-sm">Démarrer</div>
            </div>
            <div className="mt-3 border p-4 rounded bg-white flex place-content-between items-start">
                <div className="flex items-start">
                    <div className="p-3 bg-red-100 circle text-center mx-auto"><FontAwesomeIcon icon={faArrowTrendDown} className="mt-1" style={{ fontSize : 25 }} color={'#E91E63'} /></div>
                    <div className="ms-2">
                        <div>Expert Mobilité Douce</div>
                        <div className="text-xs text-gray-500">30 jours sans utiliser de voiture</div>
                    </div>
                </div>
                <div className="text-green-500 text-end mt-3 cursor-pointer border border-green-500 py-1 px-3 rounded text-sm">Démarrer</div>
            </div>
        </div>
    )
}