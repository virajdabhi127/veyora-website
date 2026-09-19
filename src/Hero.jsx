import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Hero() {
    const [swiper, setSwiper] = useState(null)
    useEffect(() => {
        const handleScroll = () => {
            swiper?.autoplay.start()
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
        }, [swiper])
    return (
        <section className="hero-slider">
            <div className="swiper-wrapper">
                <Swiper modules={[Autoplay, Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        onClick={() => {
                            swiper?.autoplay.stop()
                        }}
                        onSwiper={(swiper) => {
                            setSwiper(swiper)
                        }}
                        autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    >
                    <SwiperSlide>
                        <div className="slide">
                            <img src="/images/wallpaper.png" alt="Veyora" />
                            <div className="hero-content">
                            <h1>Engineering Intelligent Automation</h1>
                            <p>
                                Smarter technology. Better efficiency. A more connected future.
                            </p>
                            <a href="/energy-monitor" className="hero-btn">Explore Energy Monitoring</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide">
                            <img src="/images/wallpaper_1.png" alt="Smart Energy" />
                            <div className="hero-content">
                                <h1>Smart Energy Monitoring</h1>
                                <p>
                                Monitor, analyze and optimize your energy consumption intelligently.
                                </p>
                                <a href="/energy-monitor" className="hero-btn">Explore Energy Monitoring</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide">
                            <img src="/images/wallpaper_2.png" alt="Intelligent Automation" />
                            <div className="hero-content">
                                <h1>Intelligent Automation</h1>
                                <p>
                                Transform the way you manage your home and energy with intelligent technology.
                                </p>
                                <a href="/about" className="hero-btn">Discover Veyora</a>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
        </div>
        </section>
    )
}

export default Hero