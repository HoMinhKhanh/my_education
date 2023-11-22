import React from 'react';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Row } from 'antd';
import { WrapperProducts } from './style';
import { Pagination } from 'antd';

const TypeProductPage = () => {
    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    };

    return (
        <Row style={{ width: '100%', padding: '0 20px 0 20px', justifyContent: 'center' }}>
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
            <Pagination defaultCurrent={1} total={100} onChange={onChange} style={{ marginTop: '20px' }} />
        </Row>
    )
}

export default TypeProductPage