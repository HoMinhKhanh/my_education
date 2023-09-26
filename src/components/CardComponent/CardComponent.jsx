import React from 'react';
import { Card } from 'antd';
import { StyleNameProduct, WrapperButton, WrapperDescription, WrapperPrice, WrapperPriceSale } from './style';

const CardComponent = () => {
    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="course" src="https://i.ytimg.com/vi/6ZcGSYn9Ark/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAptGmj8g7I7_nt17ZmbM9N96vLGw" />}
        >
            <StyleNameProduct>Khóa học Tiếng Anh Matt</StyleNameProduct>
            <WrapperDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, perferendis! Delectus, in nostrum? Ipsam possimus quasi debitis quam iste a velit accusantium laudantium eligendi? Amet iste exercitationem a nobis sed.</WrapperDescription>
            <div>
                <WrapperPrice>999.000đ</WrapperPrice>
                <WrapperPriceSale>599.000đ</WrapperPriceSale>
            </div>
            <WrapperButton>Học ngay</WrapperButton>
        </Card>
    )
}

export default CardComponent