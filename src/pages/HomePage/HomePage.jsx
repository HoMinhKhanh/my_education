import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonHover, WrapperCourseName, WrapperProducts, WrapperTypeProduct } from './style';
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
                <WrapperProducts>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </WrapperProducts>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <WrapperButtonHover textButton={'Xem thêm'} type={'default'} 
                        styleButton={{
                            fontSize: '1.6rem',
                            marginTop: '16px',
                            minWidth: '180px',
                            backgroundColor: '#f05123',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            height: '36px',
                            fontWeight: '600',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage