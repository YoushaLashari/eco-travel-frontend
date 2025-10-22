import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RotateCcw, TrendingDown, Leaf } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CarbonResults } from "./carbonCalulator";

interface ResultsScreenProps {
    results: CarbonResults;
    onRestart: () => void;
}

const ResultsScreen = ({ results, onRestart }: ResultsScreenProps) => {
    const pieData = [
        { name: 'Transport', value: results.transport, color: '#fd490f' },
        { name: 'Hébergement', value: results.accommodation, color: '#0d2c59' },
        { name: 'Repas', value: results.food, color: '#10b981' },
        { name: 'Séminaire', value: results.event, color: '#8b5cf6' }
    ].filter(item => item.value > 0);

    const barData = [
        { name: 'Transport', kg: Math.round(results.transport) },
        { name: 'Hébergement', kg: Math.round(results.accommodation) },
        { name: 'Repas', kg: Math.round(results.food) },
        { name: 'Séminaire', kg: Math.round(results.event) }
    ].filter(item => item.kg > 0);

    const generatePDF = () => {
        // Mock PDF generation
        const pdfContent = `
      RAPPORT D'EMPREINTE CARBONE - TREKR BUSINESS
      
      Date: ${new Date().toLocaleDateString('fr-FR')}
      
      RÉSUMÉ EXÉCUTIF:
      Total CO₂: ${Math.round(results.total)} kg
      
      DÉTAIL PAR POSTE:
      • Transport: ${Math.round(results.transport)} kg CO₂
      • Hébergement: ${Math.round(results.accommodation)} kg CO₂
      • Repas: ${Math.round(results.food)} kg CO₂
      • Séminaire: ${Math.round(results.event)} kg CO₂
      
      RECOMMANDATIONS:
      • Privilégier le train pour les trajets < 4h
      • Choisir des hôtels éco-labellisés
      • Opter pour des repas végétariens
      
      Trekr Business – Automatisez vos bilans carbone voyages et restez conforme à la CSRD.
      Contactez-nous: contact@trekr.fr
    `;

        const blob = new Blob([pdfContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapport-carbone-${new Date().getTime()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getBenchmark = () => {
        const total = Math.round(results.total);
        if (total < 50) return "Votre voyage est équivalent à un trajet Paris-Lyon en train";
        if (total < 150) return "Votre voyage équivaut à un Paris-Marseille en avion";
        if (total < 300) return "Votre voyage équivaut à un Paris-Rome en avion";
        return "Votre voyage équivaut à un Paris-New York en classe économique";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#0d2c59' }}>
                            Votre Empreinte Carbone
                        </h1>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={onRestart}>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Nouveau calcul
                            </Button>
                            <Button onClick={generatePDF} style={{ backgroundColor: '#fd490f' }} className="hover:opacity-90 text-white">
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Total CO₂ */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="text-center">
                            <CardTitle className="text-lg">Total CO₂ par participant</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: '#fd490f' }}>
                                {Math.round(results.total)}
                            </div>
                            <div className="text-xl text-muted-foreground mb-4">kg CO₂</div>
                            <div className="p-4 bg-orange-50 rounded-lg">
                                <p className="text-sm font-medium" style={{ color: '#0d2c59' }}>
                                    {getBenchmark()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Détail par poste */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Détail par poste</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {results.transport > 0 && (
                                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span>🚗</span>
                                            <span>Transport</span>
                                        </div>
                                        <span className="font-bold">{Math.round(results.transport)} kg</span>
                                    </div>
                                )}
                                {results.accommodation > 0 && (
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span>🏨</span>
                                            <span>Hébergement</span>
                                        </div>
                                        <span className="font-bold">{Math.round(results.accommodation)} kg</span>
                                    </div>
                                )}
                                {results.food > 0 && (
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span>🍽️</span>
                                            <span>Repas</span>
                                        </div>
                                        <span className="font-bold">{Math.round(results.food)} kg</span>
                                    </div>
                                )}
                                {results.event > 0 && (
                                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span>🎯</span>
                                            <span>Séminaire</span>
                                        </div>
                                        <span className="font-bold">{Math.round(results.event)} kg</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Graphiques */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Répartition par poste</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${Math.round(Number(value))} kg`, 'CO₂']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Comparaison par catégorie</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`${value} kg`, 'CO₂']} />
                                        <Bar dataKey="kg" fill="#fd490f" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recommandations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Leaf style={{ color: '#10b981' }} />
                            Recommandations pour réduire votre empreinte
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="h-5 w-5 text-green-600" />
                                    <span className="font-medium text-green-800">Transport</span>
                                </div>
                                <ul className="text-sm text-green-700 space-y-1">
                                    <li>• Privilégier le train pour les trajets &lt; 4h</li>
                                    <li>• Éviter les vols avec escales inutiles</li>
                                    <li>• Classe éco plutôt que business (-40%)</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="h-5 w-5 text-blue-600" />
                                    <span className="font-medium text-blue-800">Hébergement</span>
                                </div>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Choisir des hôtels éco-labellisés</li>
                                    <li>• Réduire la durée du séjour si possible</li>
                                    <li>• Partager les chambres doubles</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="h-5 w-5 text-yellow-600" />
                                    <span className="font-medium text-yellow-800">Restauration</span>
                                </div>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• Opter pour des repas végétariens (-40%)</li>
                                    <li>• Choisir des restaurants locaux</li>
                                    <li>• Éviter le gaspillage alimentaire</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="h-5 w-5 text-purple-600" />
                                    <span className="font-medium text-purple-800">Événements</span>
                                </div>
                                <ul className="text-sm text-purple-700 space-y-1">
                                    <li>• Privilégier les formats hybrides</li>
                                    <li>• Optimiser la durée des réunions</li>
                                    <li>• Utiliser des équipements économes</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="mt-8 text-center p-6 bg-white rounded-lg border">
                    <p className="text-muted-foreground">
                        <strong>Trekr Business</strong> – Automatisez vos bilans carbone voyages et restez conforme à la CSRD.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Contactez-nous: <a href="mailto:contact@trekr.fr" className="underline" style={{ color: '#fd490f' }}>contact@trekr.fr</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultsScreen;