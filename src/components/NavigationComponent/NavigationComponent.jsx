import React from 'react';
import { HomeFilled, ReadFilled, GoldenFilled, PlusCircleFilled } from '@ant-design/icons';
import { WrapperNavBar, WrapperNavBarA, WrapperNavBarLi, WrapperNavigation } from './style';

// function getItem(label, key, icon, children, type) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//       type,
//     };
// }
// const items = [
//     getItem('Trang chủ', 'sub1', <HomeOutlined style={{ fontSize: '28px'}} />),
//     getItem('Bài viết', 'sub2', <CreditCardOutlined style={{ fontSize: '28px'}} />),
//     getItem('Lộ trình', 'sub3', <NodeCollapseOutlined style={{ fontSize: '28px'}} />),
// ];
  

const NavigationComponent = () => {

    return (
        // <div>
        //     <WrapperNavigation
        //     mode="inline"
        //     items={items}
        //     />
        // </div>
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