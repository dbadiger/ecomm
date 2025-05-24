import React from 'react'
import { assets } from '../assets/assets'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"

const slides = [
    {
        title:"STEP INTO ELEGANCE WITH OUR SIGNATURE COLLECTION",
        subtitle:"Crafted for Bold, Beautiful You.",
        image:assets.slider_2,
        alt:"Divastra's Men & Kids Collection"
    },
    {
        title:"COOL COTTONS, BREEXY FITS, AND VIBRANT HUES",
        subtitle:"Divastra's Summer Drop is Live!",
        image:assets.slider_3,
        alt:"Divastra's Summer Collection"
    },
    {
        title:"FROM BOSS-LADY BLAZERS TO SLEEK DRESSES",
        subtitle:"Redefine Your Power Wardrobe.",
        image:assets.slider_1,
        alt:"Divastra's Women Collection"
    },
]


const HeroSlider = () => {
  return (
    <div  className="relative w-full h-[70vh]">
        <Swiper 
        spaceBetween = {0}
        slidePerView={1}
        loop
        autoplay={{delay:1500}}
        pagination={{clickable:true}}
        navigation
        modules = {[Autoplay, Pagination, Navigation]}
        className="h-full"
        >

            {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-label={slide.alt}
            >
              <div className="text-center bg-black/50 p-8 rounded-xl text-white max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
      
    </div>
  )
}

export default HeroSlider
