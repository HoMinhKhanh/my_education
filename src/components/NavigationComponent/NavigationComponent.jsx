import React from 'react';
import { HomeFilled, ReadFilled, GoldenFilled, PlusCircleFilled } from '@ant-design/icons';
import { WrapperNavBar, WrapperNavBarA, WrapperNavBarLi, WrapperNavigation } from './style';

const NavigationComponent = () => {

    return (
        <WrapperNavigation>
            <div>
                <WrapperNavBar>
                    <WrapperNavBarLi>
                        <WrapperNavBarA href="/create-news">
                            <PlusCircleFilled style={{ fontSize: '28px'}} />
                            <span>Viết Blog</span>
                        </WrapperNavBarA>
                    </WrapperNavBarLi>
                    <WrapperNavBarLi>
                        <WrapperNavBarA href="/">
                            <HomeFilled style={{ fontSize: '28px'}} />
                            <span>Trang chủ</span>
                        </WrapperNavBarA>
                    </WrapperNavBarLi>
                    <WrapperNavBarLi>
                        <WrapperNavBarA href="/news">
                            <ReadFilled style={{ fontSize: '28px'}} />
                            <span>Tin tức</span>
                        </WrapperNavBarA>
                    </WrapperNavBarLi>
                    <WrapperNavBarLi>
                        <WrapperNavBarA href="/learning-paths">
                            <GoldenFilled style={{ fontSize: '28px'}} />
                            <span>Lộ trình</span>
                        </WrapperNavBarA>
                    </WrapperNavBarLi>
                </WrapperNavBar>
            </div>
        </WrapperNavigation>
    )
}

export default NavigationComponent