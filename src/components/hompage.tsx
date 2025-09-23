import React from "react";
import UserNavbar from "./navbar/userNavbar";
import Hero from "./partials/hero";
import Features from "./partials/features";
import Partners from "./partials/partners";
import Business from "./partials/business";
import Footer from "./partials/footer";

const Homepage = () => {
    return (
        <div className="min-h-screen bg-background">
            <UserNavbar />
            <main>
                <Hero />
                <section aria-label="B2C – Voyageurs">
                    <Features />
                </section>
                <section aria-label="Partenaires">
                    <Partners />
                </section>
                <section aria-label="B2B – Entreprises">
                    <Business />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Homepage;
