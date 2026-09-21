import '../css/About.css'

function About() {
    return (
        <div className='about'>
            <section className="hero-slider" id = "hero-slider">
                <div className="swiper heroSwiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slide">
                            <img src="/images/about.png"/>
                            <div className="hero-content">
                                <h1>About Veyora</h1>
                                <p className="text_head">Driven by Innovation & Built for Reliability.</p>
                                <p className="text_hero">At Veyora, we believe technology should be intelligent, accessible and dependable. Our mission is to develop automation solutions that improve efficiency, conserve resources and create a smarter future.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="our_expertise" id = "our_expertise">
                    <h1>Our Expertise</h1>
                    <div className="grid">
                        <div className="box">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                            </div>
                            <div className="box_content">
                                <h2>Embedded Systems</h2>
                                <p>Designing reliable hardware and firmware solutions using modern microcontrollers and embedded technologies.</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                            </div>
                            <div className="box_content">
                                <h2>IoT Solutions</h2>
                                <p>Connecting devices to the cloud for real-time monitoring, control, and data-driven decision making.</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                            </div>
                            <div className="box_content">
                                <h2>Automation</h2>
                                <p>Developing smart systems that reduce manual effort and improve operational efficiency.</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database-icon lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                            </div>
                            <div className="box_content">
                                <h2>Data Monitoring</h2>
                                <p>Transforming real-time data into meaningful insights through dashboards and analytics.</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-battery-charging-icon lucide-battery-charging"><path d="m11 7-3 5h4l-3 5"/><path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935"/><path d="M22 14v-4"/><path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936"/></svg>
                            </div>
                            <div className="box_content">
                                <h2>Energy Systems</h2>
                                <p>Building intelligent solutions focused on power management, monitoring, and optimization.</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-icon lucide-cloud"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
                            </div>
                            <div className="box_content">
                                <h2>Cloud Platforms</h2>
                                <p>Creating responsive web interfaces for seamless device management and user interaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About