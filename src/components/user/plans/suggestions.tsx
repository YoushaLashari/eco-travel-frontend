import React from "react";

export default function Suggestions(){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5 mx-5">
            <div className="h-auto mt-8">
                <p className="text-center mb-3">Conseils éco-responsables</p>
                <table className="border-collapse border border-gray-400 w-full lg:h-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-2 py-1">Catégories</th>
                            <th className="border border-gray-400 px-2 py-1">Astuce</th>
                            <th className="border border-gray-400 px-2 py-1">Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 px-2 py-1">Transport</td>
                            <td className="border border-gray-400 px-2 py-1">
                                Utilisez les transports en commun ou marchez/faites du vélo autant que possible
                            </td>
                            <td className="border border-gray-400 px-2 py-1">Réduit l'empreinte carbone et soutient les services locaux</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 px-2 py-1">Alimentation et Boissons</td>
                            <td className="border border-gray-400 px-2 py-1">Choisissez des restaurants locaux et durables</td>
                            <td className="border border-gray-400 px-2 py-1">Soutient les agriculteurs locaux et réduit le gaspillage alimentaire</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 px-2 py-1">Gestion des Déchets</td>
                            <td className="border border-gray-400 px-2 py-1">Recyclez et compostez autant que possible</td>
                            <td className="border border-gray-400 px-2 py-1">Réduit les déchets envoyés aux décharges et favorise des pratiques durables</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="h-auto mt-8">
                <p className="text-center mb-3">Options de transport local</p>
                <table className="border-collapse border border-gray-400 w-full lg:h-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-2 py-1">Transport</th>
                            <th className="border border-gray-400 px-2 py-1">Coût</th>
                            <th className="border border-gray-400 px-2 py-1">Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 px-2 py-1">Transports commun</td>
                            <td className="border border-gray-400 px-2 py-1">2.9 Euros</td>
                            <td className="border border-gray-400 px-2 py-1">Réduit l'empreinte carbone et soutient les services locaux</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 px-2 py-1">Marche</td>
                            <td className="border border-gray-400 px-2 py-1">0 Euro</td>
                            <td className="border border-gray-400 px-2 py-1">Transport sans émission et soutient la communauté locale</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 px-2 py-1">Vélo</td>
                            <td className="border border-gray-400 px-2 py-1">10 Euros</td>
                            <td className="border border-gray-400 px-2 py-1">Transport à faible émission de carbone et soutient les infrastructures locales</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}