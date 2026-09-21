import { Link } from 'react-router-dom'
import '../css/EnergyMonitor.css'

function EnergyMonitor() {
    return(
        <div className='energy'>
            <section className="hero-slider" id = "hero-slider">
                <div className="swiper heroSwiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slide">
                            <img src="/images/wallpaper_1.png"/>
                            <div className="hero-content">
                                <h1>Smart Energy Monitoring System</h1>
                                <p className="text_hero">Monitor your home's electrical consumption with real-time insights, cloud connectivity, and intelligent analytics—all through a modern, easy-to-use platform.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-product">
                <div className="product-content">
                    <span className="gradient-line"></span>
                    <h1>Smart Energy Meter</h1>
                    <p>The Veyora Smart Energy Monitoring System is designed to give homeowners a clearer understanding of how electricity is consumed throughout their home. By combining real-time monitoring with intelligent analytics and cloud connectivity, it transforms raw electrical data into meaningful insights that support greater efficiency, awareness, and control.</p>
                </div>
                <div className="monitor-image">
                    <img src="/images/energy-monitor-design.png" alt="energy-monitor"/>
                </div>
            </section>
            <section className="working">
                <div className="working-content">
                    <h1>How it works</h1>
                    <p>From measuring electrical parameters to delivering meaningful insights, Veyora transforms raw energy data into a simple, connected, and intelligent monitoring experience.</p>
                </div>
                <div className="works-grid">
                    <div className="work-card">
                        <div className="work-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database-plus-icon lucide-database-plus"><path d="M19 16v6"/><path d="M21 12.536V5"/><path d="M22 19h-6"/><path d="M3 12A9 3 0 0 0 15.1824 14.8061"/><path d="M3 5V19A9 3 0 0 0 13.318 21.968"/><ellipse cx="12" cy="5" rx="9" ry="3"/></svg>
                        </div>
                        <div className="work-info">
                            <h3>Measure</h3>
                            <p>
                                Continuously monitors voltage, current, power, energy consumption,
                                and power factor to provide accurate real-time electrical measurements.
                            </p>
                        </div>
                    </div>
                    <div className="work-card">
                        <div className="work-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-no-axes-column-icon lucide-chart-no-axes-column"><path d="M5 21v-6"/><path d="M12 21V3"/><path d="M19 21V9"/></svg>
                        </div>
                        <div className="work-info">
                            <h3>Analyze</h3>
                            <p>
                                Processes and interprets electrical data to deliver reliable
                                information and meaningful insights into your energy usage.
                            </p>
                        </div>
                    </div>
                    <div className="work-card">
                        <div className="work-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-check-icon lucide-cloud-check"><path d="m17 15-5.5 5.5L9 18"/><path d="M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327"/></svg>
                        </div>
                        <div className="work-info">
                            <h3>Connect</h3>
                            <p>
                                Securely synchronizes your energy data to the cloud, enabling
                                remote access across your connected devices.
                            </p>
                        </div>
                    </div>
                    <div className="work-card">
                        <div className="work-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor-icon lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
                        </div>
                        <div className="work-info">
                            <h3>Visualize</h3>
                            <p>
                                Explore live readings, historical trends, and interactive analytics
                                through a clean and intuitive dashboard.
                            </p>
                        </div>
                    </div>
                    <div className="work-card">
                        <div className="work-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb-icon lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                        </div>
                        <div className="work-info">
                        <h3>Optimize</h3>
                            <p>
                                Turn energy data into actionable insights that help improve
                                efficiency and support smarter energy decisions.
                            </p>
                        </div>
                    </div>
                    <div className="work-card">
                        <div className="work-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-icon lucide-brain"><path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/></svg>
                        </div>
                        <div className="work-info">
                        <h3>Analyze Smarter</h3>
                            <p>
                                AI-powered analysis identifies consumption patterns, detects unusual energy behavior, and delivers intelligent recommendations to help you optimize energy usage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-product">
                <div className="product-content">
                    <span className="gradient-line"></span>
                    <h1>Dasboard Preview</h1>
                    <p>The Veyora dashboard brings all your energy data together in one intelligent platform. Track live electrical parameters, explore historical consumption trends, and gain meaningful insights through interactive visualizations. Powered by AI, the system learns from your previous usage patterns to estimate your upcoming electricity bill, detect unusual energy consumption, and provide smart recommendations that help you save energy and make informed decisions.</p>
                    <Link to="/login" className="dashboard-btn">View Dashboard</Link>
                </div>
                <div className="product-image">
                    <img src="/images/dash.png" alt="dashboard"/>
                </div>
            </section>
        </div>
    )
}

export default EnergyMonitor