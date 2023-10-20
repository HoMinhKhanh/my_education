import React, { useEffect, useState } from 'react';
import { WrapperButtonHover, WrapperContainer, WrapperContainerBackground, WrapperContainerHeadingH4, WrapperContainerHeadingP, WrapperContainerImageH4, WrapperContainerImageSpan, WrapperContainerLeft, WrapperContainerRight, WrapperContainerSignUpA, WrapperContainerSignUpP, WrapperLogoImage } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ImageLogin from '../../assets/images/image-login.png';
import ImageLogo from '../../assets/logo/2.png';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import * as message from '../../components/MessageComponent/MessageComponent';

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate()

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const mutation = useMutationHooks(data => UserService.signupUser(data))

    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        if(isSuccess) {
            message.success()
            handleNavigateLogin()
        }else if(isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnChangePassword = (value) => {
        setPassword(value)
    }

    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const handleSignUp = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword
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
                            <WrapperContainerHeadingH4>My Education xin chào,</WrapperContainerHeadingH4>
                            <WrapperContainerHeadingP>Đăng ký tài khoản</WrapperContainerHeadingP>
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
                                style={{ marginBottom: '12px' }} 
                                placeholder='Mật khẩu' 
                                type={isShowPassword ? 'text' : 'password'} 
                                value={password}
                                onChange={handleOnChangePassword}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <span
                                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                style={{
                                    fontSize: '16px',
                                    zIndex: '10',
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                }}
                            >
                                {
                                    isShowConfirmPassword ? ( <EyeFilled /> ) : ( <EyeInvisibleFilled /> )
                                }
                            </span>
                            <InputForm 
                                size='large' 
                                placeholder='Nhập lại mật khẩu' 
                                type={isShowConfirmPassword ? 'text' : 'password'} 
                                value={confirmPassword}
                                onChange={handleOnChangeConfirmPassword}
                            />
                        </div>
                        {data?.status === 'ERR' && <span style={{ color: 'red', fontSize: '1.4rem'}}>{data?.message}</span>}
                        <LoadingComponent isLoading={isLoading} >
                            <WrapperButtonHover
                                disabled={!email.length || !password.length || !confirmPassword.length}
                                onClick={handleSignUp}
                                textButton={'Đăng ký'}
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
                        <WrapperContainerSignUpP>Bạn đã có tài khoản? 
                            <WrapperContainerSignUpA href="/sign-in"> Đăng nhập</WrapperContainerSignUpA>
                            <br/>
                            <WrapperContainerSignUpA href="/sign-in"> Quên mật khẩu?</WrapperContainerSignUpA>
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

export default SignUpPage