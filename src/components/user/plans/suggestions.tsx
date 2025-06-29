import React from "react";

interface TipComponent{
    tip: any;
}

export default function Suggestions({tip} : TipComponent){
    if(!tip){
        return <p>Loading tips...</p>;
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5 mx-5">
            <div className="h-auto mt-8">
                <p className="text-center mb-3">Conseils éco-responsables</p>
                <div className="overflow-x-auto">
                    <table className="border-collapse border border-gray-400 min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-2 py-1">Catégories</th>
                                <th className="border border-gray-400 px-2 py-1">Astuce</th>
                                <th className="border border-gray-400 px-2 py-1">Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tip.ecofriendly_tips.map((item, index) => (
                                <tr>
                                    <td className="border border-gray-400 px-2 py-1">{item.category}</td>
                                    <td className="border border-gray-400 px-2 py-1">{item.tip}</td>
                                    <td className="border border-gray-400 px-2 py-1">{item.impact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="h-auto mt-8">
                <p className="text-center mb-3">Options de transport local</p>
                 <div className="overflow-x-auto">
                    <table className="border-collapse border border-gray-400 min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-2 py-1">Transport</th>
                                <th className="border border-gray-400 px-2 py-1">Coût</th>
                                <th className="border border-gray-400 px-2 py-1">Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tip.local_transport_options.map((item, index) => (
                                <tr>
                                    <td className="border border-gray-400 px-2 py-1">{item.mode}</td>
                                    <td className="border border-gray-400 px-2 py-1">{item.cost}</td>
                                    <td className="border border-gray-400 px-2 py-1">{item.eco_impact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}