import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { SwiperSlider } from 'SharedComponents';
import sliderData from 'localData/sliderData';
import CoreSolutions from './components/CoreSolutions';
import WhyChoose from './components/WhyChoose';
import Innovation from './components/Innovation';

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
                <Innovation />
                <CoreSolutions />
                <WhyChoose />
            </div>
        </div>
    );
}

export default HomepageComponent;
