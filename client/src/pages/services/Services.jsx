import React from 'react'
import './Services.css'

export const Services = () => {
    return (
        <>
            <section class="services">
                <h2>Our Services</h2>
                <p>We Are Here To Help You</p>
                <div class="services-list">
                    <div class="service-item">
                        <div class="service-image">
                            <img src="img/type-waste.webp" alt="Mobile Apps" />
                        </div>
                        <h3>MOBILE APPS</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum pellentesque imperdiet. Nulla lacinia iaculis nulla non metus pulvinar.</p>
                    </div>
                    <div class="service-item">
                        <div class="service-image">
                            <img src="img/processing-method.jpg" alt="Creative Websites" />
                        </div>
                        <h3>CREATIVE WEBSITES</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum pellentesque imperdiet. Nulla lacinia iaculis nulla non metus pulvinar.</p>
                    </div>
                    <div class="service-item">
                        <div class="service-image">
                            <img src="img/waste-management.jpg" alt="SEO Optimization" />
                        </div>
                        <h3>SEO OPTIMIZATION</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum pellentesque imperdiet. Nulla lacinia iaculis nulla non metus pulvinar.</p>
                    </div>
                </div>
            </section>
        </>
    )
}