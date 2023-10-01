import React from 'react';
import { WrapperNewsComponent, WrapperNewsComponentAuthor, WrapperNewsComponentAvatar, WrapperNewsComponentName, WrapperNewsComponentOption, WrapperNewsComponentSmall, WrapperNewsCourse, WrapperNewsCourseImg, WrapperNewsDesc, WrapperNewsTitle } from './style';
import { HeartOutlined, EllipsisOutlined } from '@ant-design/icons';

const NewsComponent = () => {
    return (
        <WrapperNewsComponent>
            <WrapperNewsComponentSmall>
                <WrapperNewsComponentAuthor>
                    <a href="/@khanh-ho" style={{ textDecoration: 'none' }}>
                        <div style={{ fontSize: '2.9px', borderRadius: '50%' }}>
                        <WrapperNewsComponentAvatar src="https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/139970244_1111153925993623_9210976419889894019_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=hED57vYu25EAX_fCMgN&_nc_ht=scontent.fdad3-4.fna&oh=00_AfDL1LbIIjrniR2VmmbIGj_uAyuT388SOj-7SPnZv1elaw&oe=653B6577" alt="avatar" />
                        </div>
                    </a>
                    <a href="/@khanh-ho" style={{ textDecoration: 'none' }}>
                        <WrapperNewsComponentName>Khánh Hồ</WrapperNewsComponentName>
                    </a>
                </WrapperNewsComponentAuthor>
                <WrapperNewsComponentOption>
                    <div style={{ cursor: 'pointer', padding: '4px 8px' }}>
                        <HeartOutlined style={{ height: '1em' }}/>
                    </div>
                    <div style={{ cursor: 'pointer', padding: '4px 8px' }}>
                        <EllipsisOutlined style={{ height: '1em' }}/>
                    </div>
                </WrapperNewsComponentOption>
            </WrapperNewsComponentSmall>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: '1 1', fontSize: '1.4rem', paddingRight: '32px' }}>
                    <a href="/news/slug" style={{ outline: 'none', textDecoration: 'none' }}>
                        <WrapperNewsTitle>Hướng dẫn chi tiết cách phát âm Tiếng anh</WrapperNewsTitle>
                    </a>
                    <WrapperNewsDesc>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae incidunt animi, sit reprehenderit laudantium quaerat in, amet eaque suscipit nobis a? Illo enim laborum quae magni vero officia est delectus?</WrapperNewsDesc>
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
                        <WrapperNewsCourseImg src="https://i.ytimg.com/vi/KwT5UKpmeWI/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCDw0cG-UoSrV0G7PaHwzNODVRNog" alt="Hướng dẫn chi tiết cách phát âm Tiếng anh" />
                    </a>
                </div>
            </div>
        </WrapperNewsComponent>
    )
}

export default NewsComponent