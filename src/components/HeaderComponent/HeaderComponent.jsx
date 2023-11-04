import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover } from 'antd';
import { WrapperColHeader, WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperLogoHeader, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import { SmileFilled, CaretDownOutlined, BookFilled } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import Logo from '../../assets/logo/2.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlide';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { searchCourse } from '../../redux/slides/courseSlide';

const HeaderComponent = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [search, setSearch] = useState('')
    const [avatar, setAvatar] = useState('')
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        localStorage.removeItem('access_token')
        setLoading(false)
        navigate('/sign-in')
    }

    useEffect(() => {
        setLoading(true)
        setName(user?.name)
        setAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
          <WrapperContentPopup onClick={() => navigate('/profile-user')}>Trang cá nhân</WrapperContentPopup>
          {user?.role === 'admin' && (
              <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
          )}
          <hr />
          <WrapperContentPopup>Bài viết của tôi</WrapperContentPopup>
          <hr />
          <WrapperContentPopup>Cài đặt</WrapperContentPopup>
          <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchCourse(e.target.value))
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
                        onChange={onSearch}
                        size='large'
                        placeholder='Tìm kiếm khóa học'
                        textbutton=''
                    />
                </Col>
                <Col span={8}>
                    <LoadingComponent isLoading={loading} >
                        <WrapperHeaderAccount>
                            <div>
                                <Badge count={4}>
                                    <BookFilled style={{ fontSize: '28px', color: '#404040' }} />
                                </Badge>
                                <WrapperTextHeaderSmall>Khóa học của tôi</WrapperTextHeaderSmall>
                            </div>
                            <div>
                                {avatar ? (
                                    <img src={avatar} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} alt="avatar" />
                                ) : (
                                    <SmileFilled style={{ fontSize: '28px' }} />
                                )}
                            </div>
                            {user?.access_token ? ( 
                                <Popover placement="bottom" content={content} trigger="click">
                                    <WrapperTextHeaderSmall>{name || user?.email}</WrapperTextHeaderSmall>
                                </Popover>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderAccount>
                    </LoadingComponent>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent