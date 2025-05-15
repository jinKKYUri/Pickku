import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const DefaultLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow max-w-[1200px] mx-auto w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;