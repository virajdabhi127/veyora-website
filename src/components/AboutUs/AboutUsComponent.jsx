import React from 'react';

import '../../css/About.css';
import OurExpertise from './components/OurExpertise';


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
            <OurExpertise />
        </div>
    );
}

export default AboutUsComponent;
