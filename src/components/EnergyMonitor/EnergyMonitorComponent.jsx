import React from 'react';

function EnergyMonitorComponent() {
    return (
        <div>
            <section className='hero-slider' id='hero-slider'>
                <div className='swiper heroSwiper'>
                    <div className='swiper-wrapper'>
                        <div className='swiper-slide slide'>
                            <img src='/images/wallpaper_1.png' />
                            <div className='hero-content'>
                                <h1>
                                    See exactly where every unit of electricity
                                    goes
                                </h1>
                                <p className='text_hero'>
                                    Your bill shows one total. Veyora shows
                                    which circuit caused it, what it will cost
                                    you this month, and tells you where you can
                                    save it.
                                </p>
                                <div className='actions'>
                                    <a className='hero-btn' href='#pilot'>
                                        Start enquiry
                                    </a>
                                    <a className='btn btn-ghost' href='/login'>
                                        View live dashboard
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='about-product'>
                <div className='product-content'>
                    <h1>
                        A electricity bill tells you the total.
                        <br />
                        Not the cause.
                    </h1>
                    <p>
                        Most people find out about a high electricity bill weeks
                        after the damage is done. Veyora closes that gap.
                    </p>
                </div>
                <div className='split'>
                    <div className='card bad'>
                        <h3>Without monitoring</h3>
                        <ul>
                            <li>One monthly number, no explanation</li>
                            <li>
                                AC, geyser or a faulty appliance quietly drain
                                units
                            </li>
                            <li>Surprise bill after the billing cycle ends</li>
                            <li>
                                No way to check if the utility reading is fair
                            </li>
                        </ul>
                    </div>
                    <div className='card good'>
                        <h3>With Veyora</h3>
                        <ul>
                            <li>
                                Live load and per-circuit usage on your phone
                            </li>
                            <li>
                                Spot heavy or abnormal consumers the same day
                            </li>
                            <li>
                                Running bill estimate using real DISCOMs slabs
                            </li>
                            <li>Daily summary on WhatsApp, no app to open</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className='working' id='features'>
                <div className='wrap'>
                    <div className='working-content'>
                        <h1>
                            Built for how Indian homes & businesses <br />
                            use electricity
                        </h1>
                    </div>
                    <div className='fgrid'>
                        <div className='feat'>
                            <div className='ico'>⚡</div>
                            <h3>Real-time measurement</h3>
                            <p>
                                Voltage, current, active and apparent power,
                                power factor and cumulative kWh, updated live.
                            </p>
                        </div>
                        <div className='feat'>
                            <div className='ico'>🔌</div>
                            <h3>Circuit-level visibility</h3>
                            <p>
                                Monitor all your circuits individually, so you
                                see the AC, geyser or kitchen on its own, not
                                just the total.
                            </p>
                        </div>
                        <div className='feat'>
                            <div className='ico'>📟</div>
                            <h3>On-device display</h3>
                            <p>
                                Check kWh, power, voltage and current right at
                                the board on LCD. No phone needed.
                            </p>
                        </div>
                        <div className='feat'>
                            <div className='ico'>💰</div>
                            <h3>Bill estimate in rupees</h3>
                            <p>
                                Usage is converted to cost using DISCOMs
                                telescopic slab rates, so you see what you will
                                pay, not just units.
                            </p>
                        </div>
                        <div className='feat'>
                            <div className='ico'>💬</div>
                            <h3>WhatsApp summary</h3>
                            <p>
                                You can get a short message with the usage and
                                simple saving tips directly on your whatsapp.
                            </p>
                        </div>
                        <div className='feat'>
                            <div className='ico'>🛡️</div>
                            <h3>Keeps data when WiFi drops</h3>
                            <p>
                                Readings are stored on the device during outages
                                and synced when the connection returns. No gaps
                                in your history.
                            </p>
                        </div>
                        <div className='feat'>
                            <div className='ico'>☁️</div>
                            <h3>Cloud dashboard</h3>
                            <p>
                                Live readings, daily and monthly history and
                                trends in your browser, from anywhere.
                            </p>
                        </div>
                        <div className='feat'>
                            <div className='ico'>🧠</div>
                            <h3>
                                AI insights{' '}
                                <span className='tag'>Rolling out</span>
                            </h3>
                            <p>
                                Usage forecasting, unusual-consumption detection
                                and a chat assistant over your own energy data.
                            </p>
                        </div>
                        <div className='feat'>
                            <div className='ico'>🔧</div>
                            <h3>Professional installation</h3>
                            <p>
                                Fitted near your distribution board by a
                                professional electrician, not left as a DIY
                                wiring job.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id='how'>
                <div className='wrap'>
                    <div className='center'>
                        <span className='eyebrow'>How it works</span>
                        <h1>Up and running in three steps</h1>
                        <p className='lead'>
                            You do not need to learn anything technical. We
                            handle the wiring and setup.
                        </p>
                    </div>
                    <div className='steps'>
                        <div className='step'>
                            <h3>We install it</h3>
                            <p>
                                Veyora is mounted next to your distribution
                                board and connected to the circuits you want to
                                track.
                            </p>
                        </div>
                        <div className='step'>
                            <h3>It connects to your WiFi</h3>
                            <p>
                                The unit sends readings securely to the Veyora
                                cloud. The local display works even without
                                internet.
                            </p>
                        </div>
                        <div className='step'>
                            <h3>You see everything</h3>
                            <p>
                                Open the dashboard or just read the daily
                                WhatsApp message. Both show usage and estimated
                                cost.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='dash'>
                <div className='wrap'>
                    <div className='center'>
                        <span className='eyebrow'>Dashboard</span>
                        <h1>Your whole home's energy in one screen</h1>
                        <p className='lead'>
                            Live readings, history and cost underneath. Built to
                            be understood in five seconds.
                        </p>
                    </div>
                    <div className='dash-frame d-none'>
                        <img
                            src='#'
                            alt='Veyora dashboard preview'
                            onError={(e) =>
                                console.log(
                                    'Dashboard preview image not found',
                                    e,
                                )
                            }
                        />
                    </div>
                    <div className='dash-points'>
                        <div>
                            <b>Live view</b>Load current, voltage and power
                            factor as they change.
                        </div>
                        <div>
                            <b>History</b>Daily and monthly consumption you can
                            scroll back through.
                        </div>
                        <div>
                            <b>Cost</b>Running bill estimate based on DISCOMs
                            slab rates.
                        </div>
                    </div>
                    <div className='center' style={{ marginTop: '34px' }}>
                        <a className='btn btn-primary' href='/login'>
                            Open the dashboard
                        </a>
                    </div>
                </div>
            </section>
            <section className='features' id='specs'>
                <div className='wrap'>
                    <div className='center'>
                        <span className='eyebrow'>Specifications</span>
                        <h1>Technical details</h1>
                    </div>
                    <p className='swipe-hint'>Swipe to see more →</p>
                    <div className='tablebox'>
                        <table className='specs'>
                            <tbody>
                                <tr>
                                    <td>Measured parameters</td>
                                    <td>
                                        Voltage, current, active power, apparent
                                        power, power factor & energy
                                    </td>
                                </tr>
                                <tr>
                                    <td>Circuit channels</td>
                                    <td>
                                        Multiple circuits measurement and total
                                        line current measured separately
                                    </td>
                                </tr>
                                <tr>
                                    <td>Rated load per channel</td>
                                    <td>
                                        Designed for typical
                                        household/commercial loads up to 30 to
                                        35 A
                                    </td>
                                </tr>
                                <tr>
                                    <td>Connectivity</td>
                                    <td>WiFi to Veyora cloud (MQTT)</td>
                                </tr>
                                <tr>
                                    <td>Local display</td>
                                    <td>
                                        LCD with total energy readings as well
                                        as live electrical values
                                    </td>
                                </tr>
                                <tr>
                                    <td>Offline behaviour</td>
                                    <td>
                                        Readings stored on device and synced
                                        when WiFi returns
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cloud and apps</td>
                                    <td>
                                        Web dashboard, daily and monthly
                                        history, your respective DISCOMs bill
                                        estimate & WhatsApp summary
                                    </td>
                                </tr>
                                <tr>
                                    <td>Installation</td>
                                    <td>Mounted near the distribution board</td>
                                </tr>
                                <tr>
                                    <td>Made in</td>
                                    <td>Rajkot, Gujarat, India</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section className='who'>
                <div className='wrap'>
                    <div className='center'>
                        <span className='eyebrow'>Who it is for</span>
                        <h1>Anywhere the electricity bill needs explanation</h1>
                    </div>
                    <div className='uc'>
                        <div className='card'>
                            <h3>🏠 Homes and flats</h3>
                            <p>
                                Find which appliance is behind a high bill and
                                track higher loads like AC and geyser by
                                circuit.
                            </p>
                        </div>
                        <div className='card'>
                            <h3>🏪 Shops and offices</h3>
                            <p>
                                See business-hours load versus after-hours
                                standby waste and control running cost.
                            </p>
                        </div>
                        <div className='card'>
                            <h3>🏢 Rentals and PGs</h3>
                            <p>
                                Monitor separate floors or rooms so usage is
                                transparent for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='pilot' id='pilot'>
                <div className='wrap pilot-grid'>
                    <div className='pilot-content'>
                        <span className='eyebrow'>Pilot program, Rajkot</span>
                        <h1>Be one of our first installs</h1>
                        <p className='lead' style={{ color: '#5a4620' }}>
                            We are onboarding a limited number of early homes
                            and shops in Rajkot. Early users get hands-on
                            support and a say in what we build next.
                        </p>
                        <ul>
                            <li>Free site visit and board assessment</li>
                            <li>Professional installation</li>
                            <li>
                                Dashboard and WhatsApp summary set up for you
                            </li>
                            <li>Get 24*7 support</li>
                            <li>
                                <div className='warranty'>
                                    <p>1 year Gaurantee + 3 years Warranty</p>
                                    <a
                                        href='#'
                                        className='warranty-link'
                                        onClick={() => console.log('Viewing warranty terms')}
                                    >
                                        View Warranty Terms
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <div className='pricing'>
                            <h3>
                                Book your VEYORA SMART ENERGY MONITOR with all
                                above benefits at just ₹2499/-
                            </h3>
                        </div>
                    </div>
                    <form id='leadForm'>
                        <label>
                            Your name
                            <input
                                name='name'
                                required
                                placeholder='Full name'
                            />
                        </label>
                        <label>
                            Phone / WhatsApp
                            <input
                                name='phone'
                                required
                                inputMode='tel'
                                placeholder='10-digit mobile number'
                            />
                        </label>
                        <label>
                            Where will it be installed?
                            <select name='type'>
                                <option>Home / flat</option>
                                <option>Shop / office</option>
                                <option>Rental / PG</option>
                                <option>Other</option>
                            </select>
                        </label>
                        <label>
                            Typical monthly bill (optional)
                            <input name='bill' placeholder='e.g. ₹3,500' />
                        </label>
                        <button className='btn btn-dark' type='submit'>
                            Start enquiry
                        </button>
                        <p className='fine'>
                            Opens WhatsApp with your details pre-filled. We
                            reply personally.
                        </p>
                    </form>
                </div>
            </section>
            <section id='faq'>
                <div className='wrap'>
                    <div className='center'>
                        <span className='eyebrow'>FAQ</span>
                        <h1>Questions people ask first</h1>
                    </div>
                    <div className='faq'>
                        <details>
                            <summary>Does it replace my DISCOM meter?</summary>
                            <p>
                                No. Your utility meter stays and remains the
                                official billing meter. Veyora sits alongside it
                                and gives you the detail the utility meter does
                                not.
                            </p>
                        </details>
                        <details>
                            <summary>How accurate is it?</summary>
                            <p>
                                Every Veyora unit is carefully calibrated for
                                voltage and current against a reference
                                instrument before it leaves our bench, and we
                                verify it again on site after installation. On
                                our first field installation, the unit's kWh
                                reading matched the PGVCL meter on a live
                                household load. Veyora is built to give you
                                dependable, day-to-day usage and cost insight.
                                Your DISCOM meter remains the official meter for
                                billing. (Note: Veyora energy monitor can have
                                error margins which would typically lie within ±
                                1 %)
                            </p>
                        </details>
                        <details>
                            <summary>
                                What if my WiFi or internet goes down?
                            </summary>
                            <p>
                                The unit keeps measuring and showing readings on
                                its own display. It stores data on the device
                                and uploads it once the connection is back.
                            </p>
                        </details>
                        <details>
                            <summary>Is the installation safe?</summary>
                            <p>
                                Installation is done by Veyora, with a skilled
                                electrician.
                            </p>
                        </details>
                        <details>
                            <summary>
                                Can it monitor my AC or geyser separately?
                            </summary>
                            <p>
                                Veyora monitors the electrical circuits
                                connected to its sensors. If your AC or geyser
                                has a dedicated circuit, that circuit can be
                                monitored separately when supported by your
                                installation configuration. If multiple
                                appliances share a circuit, Veyora measures
                                their combined consumption rather than
                                identifying each appliance individually.
                            </p>
                        </details>
                        <details>
                            <summary>Where is my data stored?</summary>
                            <p>
                                Readings are sent to the Veyora cloud and shown
                                when you login the dashboard.
                            </p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EnergyMonitorComponent;
