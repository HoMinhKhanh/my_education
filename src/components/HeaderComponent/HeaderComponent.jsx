import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover } from 'antd';
import { WrapperColHeader, WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperLogoHeader, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import { SmileFilled, CaretDownOutlined, BookFilled } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import Logo from '../../assets/logo/2.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import * as MyCourseService from '../../services/MyCourseService';
import { resetUser } from '../../redux/slides/userSlide';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { searchCourse } from '../../redux/slides/courseSlide';
import { useQuery } from '@tanstack/react-query';

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

    const fetchMyCourse = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await MyCourseService.getMyCourse(id)
            return res
        }
    }

    const { isLoadingMyCourse, data: myCourses } = useQuery(['my-course', user?.id], fetchMyCourse, { enabled: !!user?.id })

    const content = (
        <div>
          <WrapperContentPopup onClick={() => navigate('/profile-user')}>Trang cá nhân</WrapperContentPopup>
          {user?.role === 'admin' && (
              <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
          )}
          {user?.role === 'instructor' && (
              <WrapperContentPopup onClick={() => navigate('/system/instructor')}>Quản lý khóa học</WrapperContentPopup>
          )}
          <hr />
          <WrapperContentPopup>Bài viết của tôi</WrapperContentPopup>
          <hr />
          <WrapperContentPopup>Cài đặt</WrapperContentPopup>
          <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    const myCourse = (
        <div>
            <div style={{ padding: '14px 20px 16px' }}>
                <h6 style={{ fontSize: '1.8rem', fontWeight: '600' }}>Khóa học của tôi</h6>
            </div>
            <div style={{ maxHeight: '68vh', overflowY: 'auto', overscrollBehavior: 'contain', maxWidth: '350px' }}>
                {myCourses?.data?.map((myCourse) => {
                    const hrefValue = `/lesson-details/${myCourse?.courseId?._id}`;
                    return(
                        <a key={myCourse?.courseId?._id} href={hrefValue} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ display: 'flex', gap: '8px', borderRadius: '8px', margin: '0 8px', padding: '8px 12px' }}>
                                <img
                                    style={{ borderRadius: '8px', display: 'block', lineHeight: '67px', minHeight: '67px', textAlign: 'center', width: '120px' }}
                                    src={myCourse?.courseId?.image}
                                    alt=""
                                />
                                <div style={{ marginLeft: '4px' }}>
                                    <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>{myCourse?.courseId?.name}</p>
                                    <p style={{ fontSize: '1.3rem' }}>Đang học</p>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
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
                    <WrapperTextHeader>MY EDUCATION</WrapperTextHeader>
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
                                <Popover placement="bottom" content={myCourse} trigger="click">
                                    <Badge count={myCourses?.total}>
                                        <BookFilled style={{ fontSize: '28px', color: '#404040' }} />
                                    </Badge>
                                    <WrapperTextHeaderSmall>Khóa học của tôi</WrapperTextHeaderSmall>
                                </Popover>
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