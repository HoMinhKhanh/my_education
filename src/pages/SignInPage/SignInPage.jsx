import React, { useEffect, useState } from 'react';
import { WrapperButtonHover, WrapperContainer, WrapperContainerBackground, WrapperContainerHeadingH4, WrapperContainerHeadingP, WrapperContainerImageH4, WrapperContainerImageSpan, WrapperContainerLeft, WrapperContainerRight, WrapperContainerSignUpA, WrapperContainerSignUpP, WrapperLogoImage } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ImageLogin from '../../assets/images/image-login.png';
import ImageLogo from '../../assets/logo/2.png';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )

    const { data, isLoading, isSuccess } = mutation

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if(data?.access_token) {
                navigate('/')
                const decoded = jwt_decode(data?.access_token);
                if(decoded?.id){
                    handleGetDetailsUser(decoded.id, data?.access_token)
                }
            }
        }
    }, [isSuccess])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token}))
    }

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnChangePassword = (value) => {
        setPassword(value)
    }

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
    }

    return (
        <WrapperContainerBackground>
            <WrapperContainer>
                <WrapperContainerLeft>
                    <div>
                        <div style={{ marginBottom: '20px' }}>
                            <a href="/" style={{ outline: 'none', textDecoration: 'none' }}>
                                <WrapperLogoImage src={ImageLogo} alt="Logo" />
                            </a>
                            <WrapperContainerHeadingH4>MY EDUCATION xin chào,</WrapperContainerHeadingH4>
                            <WrapperContainerHeadingP>Đăng nhập hoặc tạo tài khoản</WrapperContainerHeadingP>
                        </div>
                        <InputForm 
                            size='large' 
                            style={{ marginBottom: '12px' }} 
                            placeholder='Tên đăng nhập' 
                            value={email}
                            onChange={handleOnChangeEmail}
                        />
                        <div style={{ position: 'relative' }}>
                            <span
                                onClick={() => setIsShowPassword(!isShowPassword)}
                                style={{
                                    fontSize: '16px',
                                    zIndex: '10',
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                }}
                            >
                                {
                                    isShowPassword ? ( <EyeFilled /> ) : ( <EyeInvisibleFilled /> )
                                }
                            </span>
                            <InputForm 
                                size='large' 
                                placeholder='Mật khẩu' 
                                type={isShowPassword ? 'text' : 'password'} 
                                value={password}
                                onChange={handleOnChangePassword}
                            />
                        </div>
                        {data?.status === 'ERR' && <span style={{ color: 'red', fontSize: '1.4rem'}}>{data?.message}</span>}
                        <LoadingComponent isLoading={isLoading} >
                            <WrapperButtonHover 
                                disabled={!email.length || !password.length}
                                onClick={handleSignIn}
                                textButton={'Đăng nhập'} 
                                type={'default'}
                                styleButton={{
                                    fontSize: '1.6rem',
                                    marginTop: '24px',
                                    width: '100%',
                                    backgroundColor: '#f05123',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '16px',
                                    height: '36px',
                                    fontWeight: '600',
                                }}
                            />
                        </LoadingComponent>
                        <WrapperContainerSignUpP>Bạn chưa có tài khoản? 
                            <WrapperContainerSignUpA href="/sign-up"> Đăng ký</WrapperContainerSignUpA>
                            <br/>
                            <WrapperContainerSignUpA href="/fogotPassword"> Quên mật khẩu?</WrapperContainerSignUpA>
                        </WrapperContainerSignUpP>
                        
                    </div>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <img src={ImageLogin} alt="" style={{ width: '203px' }}/>
                    <div style={{ margin: '30px 0 0', textAlign: 'center' }}>
                        <WrapperContainerImageH4>My Education</WrapperContainerImageH4>
                        <WrapperContainerImageSpan>Học mọi lúc, mọi nơi</WrapperContainerImageSpan>
                    </div>   
                </WrapperContainerRight>
            </WrapperContainer>
        </WrapperContainerBackground>
    )
}

export default SignInPage