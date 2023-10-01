import React, { useState } from 'react';
import { WrapperButtonHover, WrapperContainer, WrapperContainerBackground, WrapperContainerHeadingH4, WrapperContainerHeadingP, WrapperContainerImageH4, WrapperContainerImageSpan, WrapperContainerLeft, WrapperContainerRight, WrapperContainerSignUpA, WrapperContainerSignUpP, WrapperLogoImage } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ImageLogin from '../../assets/images/image-login.png';
import ImageLogo from '../../assets/logo/2.png';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

const SignUpPage = () => {
    const [isShowPassword, setIdShowPassword] = useState(false);
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
                        <InputForm size='large' style={{ marginBottom: '12px' }} placeholder='Tên đăng nhập' />
                        <div style={{ position: 'relative' }}>
                            <span style={{
                                fontSize: '16px',
                                zIndex: '10',
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                            }}>
                                {
                                    isShowPassword ? ( <EyeFilled /> ) : ( <EyeInvisibleFilled /> )
                                }
                            </span>
                            <InputForm size='large' style={{ marginBottom: '12px' }} placeholder='Mật khẩu' type={isShowPassword ? 'text' : 'password'} />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <span style={{
                                fontSize: '16px',
                                zIndex: '10',
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                            }}>
                                {
                                    isShowPassword ? ( <EyeFilled /> ) : ( <EyeInvisibleFilled /> )
                                }
                            </span>
                            <InputForm size='large' placeholder='Nhập lại mật khẩu' type={isShowPassword ? 'text' : 'password'} />
                        </div>
                        <WrapperButtonHover textButton='Đăng ký' type='default' 
                            style={{
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