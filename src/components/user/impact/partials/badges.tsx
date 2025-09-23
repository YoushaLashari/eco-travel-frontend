import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";

export default function Badge() {
    const badges = [
        {
            id: 1,
            title: "Éco-voyageur",
            description: "3 voyages éco-responsables",
            progress: 100,
            completed: true,
            color: "hsl(var(--success))",
            icon: "🌱"
        },
        {
            id: 2, 
            title: "Expert Local",
            description: "4 semaines de consommation locale",
            progress: 75,
            completed: false,
            color: "hsl(var(--warning))",
            icon: "🏆"
        },
        {
            id: 3,
            title: "Zéro Déchet",
            description: "Réduction des déchets de 50%",
            progress: 50,
            completed: false,
            color: "hsl(var(--info))",
            icon: "♻️"
        }
    ];

const nextChallenges = [
    {
        title: "Expert Mobilité Douce",
        description: "30 jours sans utiliser de voiture",
        icon: "🚴"
    },
    {
        title: "Expert Mobilité Douce", 
        description: "30 jours sans utiliser de voiture",
        icon: "🚴"
    }
];

    return (
        <div className='mx-10 my-5'>
            <Tabs defaultValue="badges" className="w-full">
                <TabsContent value="badges" className="space-y-6 mt-6">
                    {/* Mes badges */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-950 text-2xl font-semibold">Mes badges</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Continuez à améliorer votre impact
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                                {badges.map((badge) => (
                                    <div key={badge.id} className="p-4 rounded-lg border border-border">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-2xl">{badge.icon}</div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{badge.title}</h4>
                                                <p className="text-sm text-muted-foreground">{badge.description}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Progression</span>
                                                <span>{badge.progress}%</span>
                                            </div>
                                            <Progress
                                                value={badge.progress}
                                                className="h-2 bg-progress [&>div]:bg-blue-950"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Prochains défis */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-950 text-2xl font-semibold">Prochains défis</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Relevez ces défis pour obtenir de nouveaux badges
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {nextChallenges.map((challenge, index) => (
                                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-dashed border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl opacity-50">{challenge.icon}</div>
                                        <div>
                                            <h4 className="font-medium text-muted-foreground">{challenge.title}</h4>
                                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="text-green-600 hover:bg-green-600 hover:text-white">
                                        Démarrer
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}