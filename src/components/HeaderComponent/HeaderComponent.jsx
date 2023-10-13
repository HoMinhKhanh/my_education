import React from 'react';
import { Badge, Col } from 'antd';
import { WrapperColHeader, WrapperHeader, WrapperHeaderAccount, WrapperLogoHeader, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import { SmileFilled, CaretDownOutlined, BookFilled } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import Logo from '../../assets/logo/2.png';
import { useNavigate } from 'react-router-dom';


const HeaderComponent = () => {

    const navigate = useNavigate()
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    return (
        <div>
            <WrapperHeader>
                <WrapperColHeader span={8}>
                    <a href="/">
                        <WrapperLogoHeader src={Logo} alt="My Education" />
                    </a>
                    <WrapperTextHeader>My Education</WrapperTextHeader>
                </WrapperColHeader>
                <Col span={8}>
                    <ButtonInputSearch
                        size='large'
                        placeholder='Tìm kiếm khóa học'
                        textButton=''
                    />
                </Col>
                <Col span={8}>
                    <WrapperHeaderAccount>
                        <div>
                            <Badge count={4}>
                                <BookFilled style={{ fontSize: '28px', color: '#404040' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Khóa học của tôi</WrapperTextHeaderSmall>
                        </div>
                        <div>
                            <SmileFilled style={{ fontSize: '28px' }} />
                        </div>
                        <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                            <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent