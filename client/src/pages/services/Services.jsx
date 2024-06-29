import React from 'react'
import './Services.css'

export const Services = () => {
    return (
        <>
            <section className="services">
                <h2>Our Services</h2>
                <p>We Are Here To Help You</p>
                <div className="services-list">
                    <div className="service-item">
                        <div className="service-image">
                            <img src="type-waste.webp" alt="Mobile Apps" />
                        </div>
                        <h3>MOBILE APPS</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum pellentesque imperdiet. Nulla lacinia iaculis nulla non metus pulvinar.</p>
                    </div>
                    <div className="service-item">
                        <div className="service-image">
                            <img src="processing-method.jpg" alt="Creative Websites" />
                        </div>
                        <h3>CREATIVE WEBSITES</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum pellentesque imperdiet. Nulla lacinia iaculis nulla non metus pulvinar.</p>
                    </div>
                    <div className="service-item">
                        <div className="service-image">
                            <img src="waste-management.jpg" alt="SEO Optimization" />
                        </div>
                        <h3>SEO OPTIMIZATION</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum pellentesque imperdiet. Nulla lacinia iaculis nulla non metus pulvinar.</p>
                    </div>
                </div>
            </section>
        </>
    )
}