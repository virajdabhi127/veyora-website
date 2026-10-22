import React from 'react';

import '../../css/About.css';
import aboutUsExpertise from 'localData/aboutUsExpertise';
import {
    IconLightning,
    IconEarth,
    IconRobot,
    IconDatabase,
    IconCharging,
    IconCloud,
} from 'Icons';

const Icons = {
    IconLightning: <IconLightning />,
    IconEarth: <IconEarth />,
    IconRobot: <IconRobot />,
    IconDatabase: <IconDatabase />,
    IconCharging: <IconCharging />,
    IconCloud: <IconCloud />,
};

function AboutUsComponent() {
    return (
        <div className='about'>
            <section className='hero-slider' id='hero-slider'>
                <div className='swiper heroSwiper'>
                    <div className='swiper-wrapper'>
                        <div className='swiper-slide slide'>
                            <img src='/images/about.png' />
                            <div className='hero-content'>
                                <h1>About Veyora</h1>
                                <p className='text_head'>
                                    Driven by Innovation & Built for
                                    Reliability.
                                </p>
                                <p className='text_hero'>
                                    At Veyora, we believe technology should be
                                    intelligent, accessible and dependable. Our
                                    mission is to develop automation solutions
                                    that improve efficiency, conserve resources
                                    and create a smarter future.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='our_expertise' id='our_expertise'>
                    <h1>Our Expertise</h1>
                    <div className='grid'>
                        {aboutUsExpertise.map((expertise) => (
                            <div className='box' key={expertise.title}>
                                <div className='icon'>
                                    {Icons[expertise.icon]}
                                </div>
                                <div className='box_content'>
                                    <h2>{expertise.title}</h2>
                                    <p>{expertise.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUsComponent;
