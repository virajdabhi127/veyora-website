import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './styles.css'

function SwiperSlider({ slides = [], modules = [], slideClassName, ...swiperProps }) {
    return (
        <Swiper modules={modules} {...swiperProps}>
            {slides.map((slide, index) => (
                <SwiperSlide key={slide?.key ?? index} className={slideClassName}>
                    {slide}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperSlider
