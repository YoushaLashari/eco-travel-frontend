import React from "react";

export default function Actions(){
    return(
        <div className='mx-10 my-5'>
            <div><strong>Mes actions du mois</strong></div>
            <div className="text-gray-500">Actions que vous avez sélectionnées pour ce mois</div>
            <div className="mt-3 border p-4 rounded bg-white flex place-content-between items-start">
                <div>
                    <div>Réduire la viande rouge</div>
                    <div className="text-gray-500 mt-1">Alimentation</div>
                </div>
                <div className="flex items-center">
                    <div className="text-green-500">-15% CO₂</div>
                    <div className="bg-green-500 p-3 circle ms-2"></div>
                </div>
            </div>
            <div className="mt-3 border p-4 rounded bg-white flex place-content-between items-start">
                <div>
                    <div>Manger local et de saison</div>
                    <div className="text-gray-500 mt-1">Alimentation</div>
                </div>
                <div className="flex items-center">
                    <div className="text-green-500">-10% CO₂</div>
                    <div className="bg-green-500 p-3 circle ms-2"></div>
                </div>
            </div>
            <div className="mt-3 border p-4 rounded bg-white flex place-content-between items-start">
                <div>
                    <div>Privilégier le train</div>
                    <div className="text-gray-500 mt-1">Transport</div>
                </div>
                <div className="flex items-center">
                    <div className="text-green-500">-45% CO₂</div>
                    <div className="border p-3 circle ms-2"></div>
                </div>
            </div>
            <div className="mt-3 border p-4 rounded bg-white flex place-content-between items-start">
                <div>
                    <div>Réduire le gaspillage</div>
                    <div className="text-gray-500 mt-1">Alimentation</div>
                </div>
                <div className="flex items-center">
                    <div className="text-green-500">-8% CO₂</div>
                    <div className="border p-3 circle ms-2"></div>
                </div>
            </div>
            <div className="mt-3"><strong>Suggestions d'actions</strong></div>
            <div className="text-gray-500">Basées sur vos habitudes</div>
            <div className="mt-3 border p-4 rounded bg-white flex place-content-between items-start">
                <div>
                    <div>Opter pour des produits en vrac</div>
                    <div className="text-gray-500 mt-1">Réduire les emballages</div>
                    <div className="mt-2 text-xs text-gray-500">Consommation</div>
                </div>
                <div>
                    <div className="text-green-500"><strong>-5% CO₂</strong></div>
                    <div className="text-green-500 text-end mt-3 cursor-pointer">Ajouter</div>
                </div>
            </div>
            <div className="mt-3 border p-4 rounded bg-white flex place-content-between items-start">
                <div>
                    <div>Covoiturage domicile-travail</div>
                    <div className="text-gray-500 mt-1">2 fois par semaine</div>
                    <div className="mt-2 text-xs text-gray-500">Transport</div>
                </div>
                <div>
                    <div className="text-green-500"><strong>-12% CO₂</strong></div>
                    <div className="text-green-500 text-end mt-3 cursor-pointer">Ajouter</div>
                </div>
            </div>
        </div>
    )
}