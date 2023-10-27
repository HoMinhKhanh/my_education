import React, { useEffect, useState } from 'react';
import { WrapperButtonHover, WrapperContainer, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style';
import InputForm from '../../components/InputForm/InputForm';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import * as message from '../../components/MessageComponent/MessageComponent';
import { updateUser } from '../../redux/slides/userSlide';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../util';

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch()

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, access_token, rests)
        }
    )

    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setPassword(user?.password)
        setName(user?.name)
        setAvatar(user?.avatar)
        setPhone(user?.phone)
    },[user])

    useEffect(() => {
        if(isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if(isError) {
            message.error()
        }
    }, [isSuccess, isError])

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

    const handleOnChangeName = (value) => {
        setName(value)
    }

    const handleOnChangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }

    const handleOnChangePhone = (value) => {
        setPhone(value)
    }

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, password, name, avatar, phone, access_token: user?.access_token })
    }

    return (
        <WrapperContainer>
            <WrapperHeader>Thông tin cá nhân</WrapperHeader>
            <LoadingComponent isLoading={isLoading}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor='email' >Email:</WrapperLabel>
                        <InputForm
                            size='large'
                            id='email'
                            style={{ width: '70%' }}
                            value={email}
                            onChange={handleOnChangeEmail}
                        />
                        <WrapperButtonHover
                            onClick={handleUpdate}
                            textButton={'Cập nhật'} 
                            type={'default'}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='password' >Mật khẩu:</WrapperLabel>
                        <InputForm
                            size='large'
                            id='password'
                            style={{ width: '70%' }}
                            value={password}
                            onChange={handleOnChangePassword}
                        />
                        <WrapperButtonHover
                            onClick={handleUpdate}
                            textButton={'Cập nhật'} 
                            type={'default'}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='name' >Họ tên:</WrapperLabel>
                        <InputForm
                            size='large'
                            id='name'
                            style={{ width: '70%' }}
                            value={name}
                            onChange={handleOnChangeName}
                        />
                        <WrapperButtonHover
                            onClick={handleUpdate}
                            textButton={'Cập nhật'} 
                            type={'default'}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='avatar' >Avatar:</WrapperLabel>
                        <div style={{ width: '70%', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Upload onChange={handleOnChangeAvatar} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                            {avatar && (
                                <img src={avatar} style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '50%' }} alt='avatar' />
                            )}
                        </div>
                        <WrapperButtonHover
                            onClick={handleUpdate}
                            textButton={'Cập nhật'} 
                            type={'default'}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='phone' >Số điện thoại:</WrapperLabel>
                        <InputForm
                            size='large'
                            id='phone'
                            style={{ width: '70%' }}
                            value={phone}
                            onChange={handleOnChangePhone}
                        />
                        <WrapperButtonHover
                            onClick={handleUpdate}
                            textButton={'Cập nhật'} 
                            type={'default'}
                        />
                    </WrapperInput>
                </WrapperContentProfile>
            </LoadingComponent>
        </WrapperContainer>
    )
}

export default ProfilePage