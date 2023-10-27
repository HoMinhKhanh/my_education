import React, { useEffect, useState,useRef  } from 'react';
import { ForgotButtonHoverSearch,ForgotButtonHoverCancel, ForgotContainer, ForgotContainerBackground, ForgotContainerHeadingH4, ForgotLogoImage, WrapperButtonHover, } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ImageLogo from '../../assets/logo/2.png';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useNavigate } from 'react-router-dom';
import * as message from '../../components/MessageComponent/MessageComponent';

const Forgotpassword = () => {
  const [user, setUser] = useState({
    email: '',
});
  const navigate = useNavigate()

  const handleOnChangeEmail = (value) => {
    setUser({
      email: value,
    })
  }

  const mutation = useMutationHooks(
    (data) => {
        const { email } = data
        const res = UserService.loginPasswork({email})
        return res
    }
)

const { data: userData, isLoading, isSuccess, isError } = mutation

const handleSignIn = () => {
  mutation.mutate(user)
}

console.log('_id', userData?.data?._id)

useEffect(() => {
  if(isSuccess && userData?.status === 'OK'){
      message.success()
      navigate(`/fogotPassword2/${userData?.data?._id}`)
  } else if (isError) {
      message.error()
  }
},[isSuccess, isError])

 
    return (
      
      <ForgotContainerBackground>
        <ForgotContainer>
          <div>
            <div style={{ marginBottom: '30px' }}>
              <a href="/" style={{ outline: 'none', textDecoration: 'none' }}>
                <ForgotLogoImage src={ImageLogo} alt="Logo" />
              </a>
              <ForgotContainerHeadingH4>
                Nhập Email đầy đủ của bạn
              </ForgotContainerHeadingH4>
            </div>
            <InputForm
              size="large"
             // id="sendername"
              style={{ marginBottom: '12px' }}
              placeholder="Tài khoản"
              value={user.email}
              onChange={handleOnChangeEmail}
            />
            <ForgotButtonHoverCancel
                textButton={'Hủy'}
                onClick={() => navigate('/sign-in')}
                type={'default'}
                styleButton={{
                  screenLeft: '20px',
                  fontSize: '1.6rem',
                  margin: '24px 12px',
                  width: '45%',
                  color: '#000000',
                  borderRadius: '6px',
                  height: '36px',
                  fontWeight: '600',
                }}
              />
              <WrapperButtonHover 
                  disabled={!user.email.length}
                  // onChange={(event) => setOtp(event.target.value)}
                  onClick={handleSignIn}
                  textButton={'Tìm kiếm'} 
                  type={'default'}
                  styleButton={{
                      fontSize: '1.6rem',
                      marginTop: '24px',
                      width: '45%',
                      backgroundColor: '#f05123',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '16px',
                      height: '36px',
                      fontWeight: '600',
                  }}
              />
          </div>
        </ForgotContainer>
      </ForgotContainerBackground>
    );
  };
  
  export default Forgotpassword;