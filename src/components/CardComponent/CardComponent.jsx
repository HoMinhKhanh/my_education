import React from 'react';
import { Card } from 'antd';
import { StyleNameProduct, WrapperButton, WrapperDescription, WrapperPrice, WrapperPriceSale } from './style';
import { TeamOutlined } from '@ant-design/icons';

const CardComponent = (props) => {
    const { description, image, level, name, price, type, member, listLessons} = props
    console.log('props', props)

    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="course" src={image} />}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperDescription>{description}</WrapperDescription>
            <hr />
            <span style={{ fontWeight: '600' }}>Trình độ : {level}</span>
            <div style={{ display: 'flex', gap: '4px', fontSize: '1.4rem', fontWeight: '600' }}>
                <TeamOutlined />
                <span>{member}</span>
            </div>
            <div>
                <WrapperPrice>999.000đ</WrapperPrice>
                {price === 0 ? <WrapperPriceSale>Miễn phí</WrapperPriceSale> : <WrapperPriceSale>{price}đ</WrapperPriceSale>}
            </div>
            <WrapperButton>Học ngay</WrapperButton>
        </Card>
    )
}

export default CardComponent