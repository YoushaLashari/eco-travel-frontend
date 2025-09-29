import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useUser } from "@/context/userContext";

const UserNavbar = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const { auth } = useUser();
    const isActive = (path: string) => location.pathname === path;

    const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
        <Link
            to={to}
            className={`px-3 py-2 rounded-full transition-colors ${isActive(to) ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"
                }`}
            onClick={() => setOpen(false)}
        >
            {children}
        </Link>
    );

    return (
        <>
            {/* Fixed navbar */}
            <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur border-b border-border">
                <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="font-semibold text-primary text-xl">Trekr</Link>

                    <div className="hidden md:flex items-center gap-2">
                        <NavLink to="/how-it-works">Comment ça marche</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        <Button asChild size="sm" variant="outline" className="rounded-full ml-2">
                            {auth ? <Link to="/dashboard">Dashboard</Link> : <Link to="/login">Se connecter</Link>}
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setOpen(!open)}
                        aria-label="Ouvrir le menu"
                    >
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </nav>

                {open && (
                    <div className="md:hidden border-t border-border bg-background">
                        <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
                            <NavLink to="/how-it-works">Comment ça marche</NavLink>
                            <NavLink to="/contact">Contact</NavLink>
                            <Button asChild variant="outline" className="rounded-full mt-2">
                                {auth ? <Link to="/dashboard">Dashboard</Link> : <Link to="/login">Se connecter</Link>}
                            </Button>
                        </div>
                    </div>
                )}
            </header>

            {/* Main content → add padding to avoid being hidden behind navbar */}
            <main className="pt-16">
                <Outlet />
            </main>
        </>
    );
};

export default UserNavbar;
