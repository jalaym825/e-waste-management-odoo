import React from 'react';
import './Services.css';

export const Services = () => {
    return (
        <>
            <section className="services">
                <h2>Our Services</h2>
                <p>We Are Here To Help You</p>
                <div className="services-list">
                    <div className="service-item">
                        <div className="service-image">
                            <img src="type-waste.webp" alt="Types of Waste" />
                        </div>
                        <a href='/types' className='link'>
                            <h3>TYPES OF WASTE</h3>
                        </a>
                        <p>
                            A waste management system is a streamlined process that organizations use to dispose of, reduce, reuse, and prevent waste. Also known as waste disposal, it is an approach where companies implement comprehensive strategies to efficiently manage wastes from their origin until their final disposal. Possible waste disposal methods are recycling, composting, incineration, landfills, bioremediation, waste to energy, and waste minimization.
                        </p>
                    </div>
                    <div className="service-item">
                        <div className="service-image">
                            <img src="processing-method.jpg" alt="Processing Method" />
                        </div>
                        <a href='/methods' className='link'>
                            <h3>PROCESSING METHOD</h3>
                        </a>
                        <p>
                            E-Waste management seeks to recover and process the electronic waste and recycle or refurbish it to make it useful. But, electronic recycling can be challenging especially because these devices are sophisticated and manufactured from varying proportions of glass, metals and plastics. Depending on the type of electronics, the process for recycling or refurbishing may change.
                        </p>
                    </div>
                    <div className="service-item">
                        <div className="service-image">
                            <img src="waste-management.jpg" alt="Service Area" />
                        </div>
                        <a href='/areas' className='link'>
                            <h3>SERVICE AREA</h3>
                        </a>
                        <p>
                            Waste disposal area means a place where garbage, refuse or domestic or industrial waste, exclusive of liquid industrial waste, is disposed of or dumped and shall include a sewage treatment plant or sewage lagoons. The major objective of e-waste management is to reduce, reuse, and recycle. Some of the e-waste consists of valuable covering or materials inside which can be reused or recycled.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
