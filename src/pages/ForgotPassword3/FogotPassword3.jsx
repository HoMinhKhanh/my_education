import React, { useEffect,useParams, useRef, useState } from 'react';
import { ForgotButtonHoverSearch,ForgotButtonHoverCancel, ForgotContainer, ForgotContainerBackground, ForgotContainerHeadingH4, ForgotLogoImage, } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ImageLogo from '../../assets/logo/2.png';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const Forgotpassword3 = () => {
  const { id } = useParams();
  const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleGetDetailsUser = async (id, token) => {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    };
  
    const Email = (value) => {
      setEmail(value);
    };
    
    const mutation = useMutationHooks(
        data => UserService.loginUser(email)
    ) 

    const handleSearch = async () => {
      const data = await UserService.loginUser({ email });
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      /*if (data?.access_token) {
        navigate('/');
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded.id, data?.access_token);
        }
      }*/

      navigate('/fogotPassword3')//giả định kết quả ra True
    };
    
    const form = useRef();

    const serviceID='service_gltzt94';
    const templateID='template_prgh81i';
    const publickeyID='jK6Of_avoymA6mArl';
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    
    const sendEmail = async (e) => {
      const data = {
      service_id: serviceID,
      template_id: templateID,
      user_id: publickeyID,
      template_params: {
        sendername: name,
        to: email,
        to_name: 'Web Wizard',
        message: otp,
      }
    };
      e.preventDefault();
      const length = 6; // Độ dài của mã OTP
      const characters = '0123456789'; // Các ký tự được sử dụng để tạo mã OTP
     let result = '';
     for (let i = 0; i < length; i++) {
      otp = Math.floor(Math.random() * characters.length);
      result += characters.charAt(otp);
    }
       setOTP(result);
       try {
        const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const [otp, setOTP] = useState('');
     const [inputOTP, setinputOTP] = useState('');
    const checkOTP=()=>{
      if(otp===inputOTP){
        alert('Số nhập vào trùng khớp với OTP.');
        navigate('/fogotPassword3')
      }
      else {
        alert('Số nhập vào không khớp với OTP.');
      }
    }
    const handleOnChangeOTP = (value) => {
      setinputOTP(value)
  }

  
    return (
      <ForgotContainerBackground>
        <ForgotContainer>
          <div>
            <div style={{ marginBottom: '30px' }}>
              <a href="/" style={{ outline: 'none', textDecoration: 'none' }}>
                <ForgotLogoImage src={ImageLogo} alt="Logo" />
              </a>
              <ForgotContainerHeadingH4>
                Nhập Mã OTP tại đây!!!
              </ForgotContainerHeadingH4>
            </div>
            <InputForm
              size="large"
              style={{ marginBottom: '12px' }}
              placeholder="OTP"
             value={inputOTP}
              onChange={handleOnChangeOTP}
            />
            <LoadingComponent isLoading={mutation.isLoading}>
              <div style={{display: "flex"}}>
                <ForgotButtonHoverCancel
                  textButton={'Gửi mã'}
                  onclick={sendEmail}
                  type={'default'}
                  styleButton={{
                    screenLeft: '20px',
                    fontSize: '1.6rem',
                    margin: '24px 12px',
                    width: '50%',
                    color: '#000000',
                    borderRadius: '6px',
                    height: '36px',
                    fontWeight: '600',
                  }}
                />
                <ForgotButtonHoverSearch
                  textButton={'Xác nhận'}
                  type={'default'}
                  onClick={checkOTP}
                  styleButton={{
                    fontSize: '1.6rem',
                    marginTop: '24px',
                    width: '50%',
                    backgroundColor: '#f05123',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '16px',
                    height: '36px',
                    fontWeight: '600',
                  }}
                />
              </div>
            </LoadingComponent>
          </div>
        </ForgotContainer>
      </ForgotContainerBackground>
    );
  };
  
  export default Forgotpassword3;