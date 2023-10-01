import React from 'react';
import { WrapperNewsPage, WrapperNewsPageDesc, WrapperNewsPageLayOut, WrapperNewsPageTitle } from './style';
import NewsComponent from '../../components/NewsComponent/NewsComponent';
import { Pagination } from 'antd';

const NewsPage = () => {
    return (
        <WrapperNewsPage>
            <WrapperNewsPageLayOut>
                <div>
                    <WrapperNewsPageTitle>Bài viết nổi bật</WrapperNewsPageTitle>
                    <WrapperNewsPageDesc>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học online và là nơi giải đáp những thắc mắc của bạn.</WrapperNewsPageDesc>
                </div>
            </WrapperNewsPageLayOut>
            <div>
                <NewsComponent />
                <NewsComponent />
                <NewsComponent />
                <NewsComponent />
                <NewsComponent />
                <NewsComponent />
                <NewsComponent />
                <NewsComponent />
                <NewsComponent />
                <NewsComponent />
                <Pagination 
                    defaultCurrent={1} 
                    total={50} 
                    style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', margin: '20px 0', fontSize: '1.4rem', fontWeight: '600' }}
                />
            </div>
        </WrapperNewsPage>
    )
}

export default NewsPage