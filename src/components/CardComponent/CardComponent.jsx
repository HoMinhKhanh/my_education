import React from 'react';
import { Card } from 'antd';
import { StyleNameProduct, WrapperButton, WrapperDescription, WrapperPrice, WrapperPriceSale } from './style';
import { TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const CardComponent = (props) => {
<<<<<<< HEAD
    const { description, image, level, name, price, type, member, listLessons} = props
=======
    const { description, image, level, name, price, type, member, listLessons, id } = props
    const navigate = useNavigate()

    const handleDetailsCourse = (id) => {
        navigate(`/product-details/${id}`)
    }
>>>>>>> 09a384dec923a768188f78a69ed32d1851d6c782

    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="course" src={image} />}
            onClick={() => handleDetailsCourse(id)}
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
                {price === 0 ? <WrapperPriceSale>Miễn phí</WrapperPriceSale> : <WrapperPriceSale>{price.toLocaleString()}đ</WrapperPriceSale>}
            </div>
            <WrapperButton>Học ngay</WrapperButton>
        </Card>
    )
}

export default CardComponent