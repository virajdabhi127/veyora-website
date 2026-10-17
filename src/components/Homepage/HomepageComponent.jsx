import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { SwiperSlider } from 'SharedComponents';
import { IconBulb, IconShield, IconMonitor, IconStack } from 'Icons';
import sliderData from 'localData/sliderData';
import whyChooseData from 'localData/whyChooseData';
import solutions from 'localData/solutions';

const Icons = {
    IconBulb: <IconBulb />,
    IconShield: <IconShield />,
    IconMonitor: <IconMonitor />,
    IconStack: <IconStack />,
};

function HomepageComponent() {
    return (
        <div className='homepage-component'>
            <div className='homepage-hero-section'>
                <SwiperSlider
                    modules={[Autoplay, Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    onClick={() => {
                        // swiper?.autoplay.stop();
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop
                    slides={sliderData.map((slide) => (
                        <div className='slide' key={slide.title}>
                            <img src={slide.image} alt='Veyora' />
                            <div className='hero-content'>
                                <h1>{slide.title}</h1>
                                <p>{slide.description}</p>
                                {slide.withNavigation ? (
                                    <a
                                        href={slide.navigationButtonLink}
                                        className='hero-btn'
                                    >
                                        {slide.navtigationButtonText}
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    ))}
                />
            </div>
            <div className='homepage-content-section'>
                <section className='innovation'>
                    <div className='innovation_text'>
                        <h1>Engineering Innovation For A Connected Future</h1>
                        <p>
                            Veyora develops intelligent automation solutions
                            that connect devices, data, and users through
                            powerful web and mobile platforms. By combining IoT,
                            embedded systems, cloud technologies, and real-time
                            monitoring, we create reliable solutions that
                            simplify automation and improve decision-making.
                        </p>
                    </div>
                    <div className='innovation_img'>
                        <img
                            src='/images/dashboard.png'
                            alt='Veyora Dashboard'
                        />
                    </div>
                </section>
                <div className='solutions' id='solutions'>
                    <h1>Core solutions</h1>
                    <div className='sol_cont'>
                        {solutions.map((solution, index) => (
                            <div className='solutions-card' key={solution.id}>
                                <div className='content' id={solution.id}>
                                    <h2>{solution.title}</h2>
                                    <p>{solution.description}</p>
                                    <ul>
                                        {solution.features.map(
                                            (feature, idx) => (
                                                <li key={idx}>{feature}</li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='why_choose'>
                    <h1>Why choose Veyora ?</h1>
                    <p>
                        Delivering intelligent automation solutions through
                        innovation, reliability and engineering excellence.
                    </p>
                    <div className='grid'>
                        {whyChooseData.map((item, index) => (
                            <div className='box'>
                                <div className='icon'>{Icons[item.icon]}</div>
                                <div className='box_content'>
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomepageComponent;
