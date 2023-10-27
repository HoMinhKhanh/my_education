import React, { useEffect, useState } from 'react';
import { WrapperButtonHover, WrapperContainer, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style';
import InputForm from '../../components/InputForm/InputForm';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../util';
import { useSelector } from 'react-redux';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as NewsService from '../../services/NewsService';
import * as message from '../../components/MessageComponent/MessageComponent';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const CreateNewsPage = () => {
    const user = useSelector((state) => state.user)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        setAuthor(user.id)
    },[user])

    const mutation = useMutationHooks(
        (data) => {
            const { title, content, image, author } = data
            const res = NewsService.createNews({title, content, image, author})
            return res
        }
    )

    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        if(isSuccess && data?.status === 'OK'){
            message.success()
        } else if (isError) {
            message.error()
        }
    },[isSuccess, isError])

    const handleOnChangeTitle = (value) => {
        setTitle(value)
    }

    const handleOnChangeContent = (value) => {
        setContent(value)
    }

    const handleOnChangeImage = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setImage(file.preview)
    }

    const handleCreatenews = () => {
        mutation.mutate({title, content, image, author})
    }

    return (
            <WrapperContainer>
                <WrapperHeader>Đăng bài viết</WrapperHeader>
                    <LoadingComponent isLoading={isLoading}>
                        <WrapperContentProfile>
                            <WrapperInput>
                                <WrapperLabel htmlFor='title' >Tiêu đề:</WrapperLabel>
                                <InputForm
                                    size='large'
                                    id='title'
                                    style={{ width: '80%' }}
                                    value={title}
                                    onChange={handleOnChangeTitle}
                                />
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor='content' >Nội dung:</WrapperLabel>
                                <InputForm
                                    size='large'
                                    id='content'
                                    style={{ width: '80%' }}
                                    value={content}
                                    onChange={handleOnChangeContent}
                                />
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor='images' >Hình ảnh:</WrapperLabel>
                                <div style={{ width: '80%', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <Upload 
                                        onChange={handleOnChangeImage} 
                                        maxCount={1}
                                    >
                                        <Button icon={<UploadOutlined />}>Tải lên</Button>
                                    </Upload>
                                    <img src={image} style={{ height: '60px', width: '60px', objectFit: 'cover', borderRadius: '6px' }} alt='images' />
                                </div>
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperButtonHover
                                        onClick={handleCreatenews}
                                        textButton={'Đăng tin'} 
                                        type={'default'}
                                />
                            </WrapperInput>
                        </WrapperContentProfile>
                    </LoadingComponent>
            </WrapperContainer>
    )
}

export default CreateNewsPage