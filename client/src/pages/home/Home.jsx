import React from 'react';
import './Home.css';

export const Home = () => {
    return (
        <>
            <section className="hero">
                <h2>CLEAN YOUR E-DUST</h2>
                <h1 className="animate">
                    <span>E</span><span>C</span><span>O</span><span>-</span><span>M</span><span>I</span><span>T</span><span>R</span><span>A</span>
                </h1>
                <p>The best choice for your e-waste</p>
            </section>

            <section className="info-blocks">
                <div className="info-block gray-bg">
                    <h2>What is E-Waste?</h2>
                    <p>
                        E-Waste, or electronic waste, refers to discarded electrical or electronic devices. Used electronics that are destined for reuse, resale, salvage, recycling, or disposal are also considered e-waste. 
                        The rapid expansion of technology means that a very large amount of e-waste is created every minute.
                    </p>
                </div>
                <div className="info-block white-bg">
                    <h2>Our E-Waste Management System</h2>
                    <p>
                        Our E-Waste Management System provides a comprehensive solution for the collection, transportation, and recycling of electronic waste. 
                        Users can schedule convenient pickup times, track the status of their requests, and receive notifications about upcoming collections. 
                        By using our service, you contribute to a cleaner environment and the responsible disposal of electronic waste.
                    </p>
                </div>
            </section>
        </>
    );
}
