import React from 'react';
import { WrapperNewsPage, WrapperNewsPageDesc, WrapperNewsPageLayOut, WrapperNewsPageTitle } from './style';
import NewsComponent from '../../components/NewsComponent/NewsComponent';
import { Pagination } from 'antd';
import * as NewsService from '../../services/NewsService'
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const NewsPage = () => {

    const fetchNewsAll =  async () => {
        const res = await NewsService.getAllNews()
        return res
    }
    const {isLoading, data: allNews} = useQuery(['news'], fetchNewsAll, { retry: 3, retryDelay: 1000 })

    return (
        <WrapperNewsPage>
            <WrapperNewsPageLayOut>
                <div>
                    <WrapperNewsPageTitle>Bài viết nổi bật</WrapperNewsPageTitle>
                    <WrapperNewsPageDesc>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học online và là nơi giải đáp những thắc mắc của bạn.</WrapperNewsPageDesc>
                </div>
            </WrapperNewsPageLayOut>
            <LoadingComponent isLoading={isLoading}>
                <div>
                    {allNews?.data?.map((allNew) => {
                        return(
                            <NewsComponent 
                                key={allNew._id} 
                                title={allNew.title} 
                                content={allNew.content}
                                image={allNew.image}
                                like={allNew.like}
                                author={allNew.author}
                            />
                        )
                    })}
                    <Pagination 
                        defaultCurrent={1} 
                        total={50} 
                        style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', margin: '20px 0', fontSize: '1.4rem', fontWeight: '600' }}
                    />
                </div>
            </LoadingComponent>
        </WrapperNewsPage>
    )
}

export default NewsPage