import React, { useEffect, useState } from 'react';
import { ForgotButtonHoverSearch,ForgotButtonHoverCancel, ForgotContainer, ForgotContainerBackground, ForgotContainerHeadingH4, ForgotLogoImage, WrapperButtonHover, } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ImageLogo from '../../assets/logo/2.png';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as message from '../../components/MessageComponent/MessageComponent';


const Forgotpassword4 = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()

  const handleNavigateLogin = () => {
      navigate('/sign-in')
  }

  const mutation = useMutationHooks(data => UserService.updatePasswork(data))

  const { data, isLoading, isSuccess, isError } = mutation
  
  useEffect(() => {
      if(isSuccess) {
          if (data.status === 'OK') {
              message.success()
              handleNavigateLogin()
          } else if (data.status === 'ERR') {
              message.error()
          }
      }else if(isError) {
          message.error()
      }
  }, [isSuccess, isError])

 

  const handleOnChangePassword = (value) => {
      setPassword(value)
  }

  const handleOnChangeConfirmPassword = (value) => {
      setConfirmPassword(value)
  }

  const handleSignUp = () => {
      mutation.mutate({
          password,
          confirmPassword
      })
  }

    return (
      <ForgotContainerBackground>
        <ForgotContainer>
          <div>
            <div style={{ marginBottom: '30px' }}>
              <a href="/" 
              style={{ 
                outline: 'none', textDecoration: 'none' }}>
                <ForgotLogoImage src={ImageLogo} alt="Logo" />
              </a>
              <ForgotContainerHeadingH4>
                Nhập Mật khẩu mới bạn muốn đổi
              </ForgotContainerHeadingH4>
            </div>
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
                        <ForgotButtonHoverCancel
                textButton={'Hủy'}
                type={'default'}
                onClick={handleSignUp}
                styleButton={{
                  screenLeft: '20px',
                  fontSize: '1.6rem',
                  marginTop: '24px',
                  width: '45%',
                  color: '#000000',
                  borderRadius: '6px',
                  height: '36px',
                  fontWeight: '600',
                }}
              />
              {data?.status === 'ERR' && <span style={{ color: 'red', fontSize: '1.4rem'}}>{data?.message}</span>}
            <LoadingComponent isLoading={isLoading}>             
                 <WrapperButtonHover
                                disabled={ !password.length || !confirmPassword.length}
                                onClick={handleSignUp}
                                textButton={'Hoàn tất'}
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
          </div>
        </ForgotContainer>
      </ForgotContainerBackground>
    );
  };
  
  export default Forgotpassword4;