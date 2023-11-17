import React, { useEffect, useState } from 'react';
import { WrapperNewsComponent, WrapperNewsComponentAuthor, WrapperNewsComponentAvatar, WrapperNewsComponentName, WrapperNewsComponentOption, WrapperNewsComponentSmall, WrapperNewsCourse, WrapperNewsCourseImg, WrapperNewsDesc, WrapperNewsTitle } from './style';
import { HeartOutlined, EllipsisOutlined } from '@ant-design/icons';
import * as UserService from '../../services/UserService'

const NewsComponent = (props) => {
    const { title, content, image, like, author } = props
    const [stateNewsDetails, setstateNewsDetails] = useState({
        name: '', 
        avatar: '', 
    });

    const fetchGetDetailsUser = async (author) => {
        const res = await UserService.getProfileUser(author)
        if (res?.data){
            setstateNewsDetails({
                name: res?.data?.name,
                avatar: res?.data?.avatar,
            })
        }
    }

    useEffect(() =>{
        if (author) {
            fetchGetDetailsUser(author)
        }
    },[author])

    return (
        <WrapperNewsComponent>
            <WrapperNewsComponentSmall>
                <WrapperNewsComponentAuthor>
                    <a href="/@khanh-ho" style={{ textDecoration: 'none' }}>
                        <div style={{ fontSize: '2.9px', borderRadius: '50%' }}>
                        <WrapperNewsComponentAvatar src={stateNewsDetails.avatar} alt="avatar" />
                        </div>
                    </a>
                    <a href="/@khanh-ho" style={{ textDecoration: 'none' }}>
                        <WrapperNewsComponentName>{stateNewsDetails.name}</WrapperNewsComponentName>
                    </a>
                </WrapperNewsComponentAuthor>
                <WrapperNewsComponentOption>
                    <div style={{ cursor: 'pointer', padding: '4px 8px' }}>
                        <HeartOutlined style={{ height: '1em' }}/>
                        <span>{like}</span>
                    </div>
                    <div style={{ cursor: 'pointer', padding: '4px 8px' }}>
                        <EllipsisOutlined style={{ height: '1em' }}/>
                    </div>
                </WrapperNewsComponentOption>
            </WrapperNewsComponentSmall>
            <div style={{ display: 'flex', alignItems: 'center',marginTop: '12px' }}>
                <div style={{ flex: '1 1', fontSize: '1.4rem', paddingRight: '32px' }}>
                    <a href="/news/slug" style={{ outline: 'none', textDecoration: 'none' }}>
                        <WrapperNewsTitle>{title}</WrapperNewsTitle>
                    </a>
                    <WrapperNewsDesc>{content}</WrapperNewsDesc>
                    <div style={{ fontSize: '1.4rem', paddingRight: '32px' }}>
                        <WrapperNewsCourse href="/">Tiếng anh</WrapperNewsCourse>
                        <span>1 tuần trước</span>
                        <span style={{ margin: '0 8px' }}>·</span>
                        4 phút đọc
                    </div>
                </div>
                <div style={{ flexShrink: '0' }}>
                    <a 
                        href="/news/slug"
                        style={{ outline: 'none', textDecoration: 'none' }}
                    >
                        <WrapperNewsCourseImg src={image} alt="Hướng dẫn chi tiết cách phát âm Tiếng anh" />
                    </a>
                </div>
            </div>
        </WrapperNewsComponent>
    )
}

export default NewsComponent