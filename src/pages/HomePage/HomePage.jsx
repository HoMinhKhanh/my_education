import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperCourseName, WrapperTypeProduct } from './style';
import SilderComponent from '../../components/SilderComponent/SilderComponent';
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import CardComponent from '../../components/CardComponent/CardComponent';

const HomePage = () => {
    const arr = ['Toán', 'Ngữ văn', 'Tiếng Anh'];
    return (
        <div style={{ width: 'calc(100% - 96px)' }}>
            <div>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div id='container' style={{ width: '100%', padding: '0 20px 0 20px' }}>
                <SilderComponent arrImages={[slider1, slider2, slider3]} />
                <div>
                    <WrapperCourseName>Khóa học mới</WrapperCourseName>
                </div>
                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </div>
            </div>
        </div>
    )
}

export default HomePage