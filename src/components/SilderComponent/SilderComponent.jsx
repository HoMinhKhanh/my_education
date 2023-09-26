import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';

const SilderComponent = ({arrImages}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
    };
    return (
        <Slider {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt='slider' preview={false} width='100%' height='360px' />
                )
            })}
        </Slider>
    )
}

export default SilderComponent