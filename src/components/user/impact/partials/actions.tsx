import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Car, Home, Leaf, Utensils } from "lucide-react";
import React from "react";

export default function Actions() {
    const monthlyActions = [
        {
            id: 1,
            title: "Réduire la viande rouge",
            category: "Alimentation",
            reduction: 15,
            completed: true
        },
        {
            id: 2,
            title: "Manger local et de saison",
            category: "Alimentation", 
            reduction: 10,
            completed: true
        },
        {
            id: 3,
            title: "Privilégier le train",
            category: "Transport",
            reduction: 45,
            completed: true
        },
        {
            id: 4,
            title: "Réduire le gaspillage",
            category: "Alimentation",
            reduction: 8,
            completed: false
        }
    ];

    const suggestedActions = [
        {
            id: 5,
            title: "Opter pour des produits en vrac",
            category: "Consommation",
            description: "Réduire les emballages",
            reduction: 5,
            icon: Leaf
        },
        {
            id: 6,
            title: "Covoiturage domicile-travail", 
            category: "Transport",
            description: "2 fois par semaine",
            reduction: 12,
            icon: Car
        }
    ];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Alimentation': return Utensils;
            case 'Transport': return Car;
            case 'Consommation': return Home;
            default: return Leaf;
        }
    };

    const addAction = (actionId: number) => {
        console.log(`Action ${actionId} ajoutée`);
    };

    return (
        <div className='mx-10 my-5'>
            <Tabs defaultValue="actions" className="w-full">
                <TabsContent value="actions" className="space-y-6 mt-6">
                    {/* Actions du mois */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-950 text-2xl font-semibold">Mes actions du mois</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Actions que vous avez sélectionnées pour ce mois
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4 text-blue-950">
                            {monthlyActions.map((action) => {
                                const IconComponent = getCategoryIcon(action.category);
                                return (
                                    <div key={action.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <IconComponent className="w-5 h-5 text-primary" />
                                            <div>
                                                <h4 className="font-medium">{action.title}</h4>
                                                <p className="text-sm text-muted-foreground">{action.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge
                                                variant={action.completed ? "default" : "outline"}
                                                className={action.completed ? "bg-green-600 text-white" : ""}
                                            >
                                                {action.completed ? "✅" : ""} -{action.reduction}% CO₂
                                            </Badge>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* Suggestions d'actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-950 text-2xl font-semibold">Suggestions d'actions</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Basées sur vos habitudes
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {suggestedActions.map((action) => {
                                const IconComponent = action.icon;
                                return (
                                    <div key={action.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <IconComponent className="w-5 h-5 text-primary" />
                                            <div>
                                                <h4 className="font-medium">{action.title}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {action.description} • {action.category}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline">
                                                -{action.reduction}% CO₂
                                            </Badge>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-green-600 hover:bg-green-600 hover:text-white"
                                                onClick={() => addAction(action.id)}
                                            >
                                                Ajouter
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}