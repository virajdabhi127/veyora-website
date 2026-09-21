function HomeSections() {
    return(
        <section>
            <section className="innovation">
                <div className="innovation_text">
                    <h1>Engineering Innovation For A Connected Future</h1>
                    <p>
                        Veyora develops intelligent automation solutions
                        that connect devices, data, and users through
                        powerful web and mobile platforms.
                        By combining IoT, embedded systems, cloud
                        technologies, and real-time monitoring, we
                        create reliable solutions that simplify
                        automation and improve decision-making.
                    </p>
                </div>
                <div className="innovation_img">
                    <img src="/images/dashboard.png" alt="Veyora Dashboard"/>
                </div>
            </section>
            <div className="solutions" id="solutions">
                <h1>Core solutions</h1>
                <div className="sol_cont">
                    <div id="solutions-card">
                        <div className="content" id="energy-monitor">
                            <h2>Smart Energy Monitoring System</h2>
                            <p>
                                Gain complete visibility into your home's electrical consumption with real-time monitoring, advanced analytics and intelligent insights designed to improve efficiency and reduce energy costs.
                            </p>
                            <ul>
                                <li>Real Time Energy Monitoring</li>
                                <li>Voltage - Current Power Analytics</li>
                                <li>Energy Consumption History</li>
                                <li>Cloud Dashboard</li>
                                <li>Mobile Access</li>
                            </ul>
                        </div>
                    </div>
                    <div id="solutions-card">
                        <div className="content" id="home-automation">
                            <h2>Building smarter, connected living spaces</h2>
                            <p>
                                Transform your home into an intelligent living space with connected devices, remote control, smart scheduling and seamless automation all managed through a unified ecosystem.
                            </p>
                            <ul>
                                <li>Intelligent Lighting Control</li>
                                <li>Energy Optimization</li>
                                <li>Advanced Security Monitoring</li>
                                <li>Voice Control</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="why_choose">
                <h1>Why choose Veyora ?</h1>
                <p>Delivering intelligent automation solutions through innovation, reliability and engineering excellence.</p>
                <div className="grid">
                    <div className="box">
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb-icon lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                        </div>
                        <div className="box_content">
                            <h2>Innovation-Driven Solutions</h2>
                            <p>Leveraging modern IoT technologies to develop intelligent and efficient automation systems.</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check-icon lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                        </div>
                        <div className="box_content">
                            <h2>Reliable Engineering</h2>
                            <p>Designed with stability, precision, and long-term performance at the core of every solution.</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor-cloud-icon lucide-monitor-cloud"><path d="M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z"/><path d="M12 17v4"/><path d="M8 21h8"/><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
                        </div>
                        <div className="box_content">
                            <h2>Real-Time Monitoring</h2>
                            <p>Access live system data and insights for better control, visibility, and decision-making.</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-no-axes-combined-icon lucide-chart-no-axes-combined"><path d="M12 16v5"/><path d="M16 14.639V21"/><path d="M20 10.656V21"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18.463V21"/><path d="M8 14.656V21"/></svg>
                        </div>
                        <div className="box_content">
                            <h2>Scalable Architecture</h2>
                            <p>Flexible solutions built to adapt and grow with future requirements and technological advancements.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeSections