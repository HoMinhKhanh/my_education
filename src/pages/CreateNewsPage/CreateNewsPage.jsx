import React, { useState } from 'react';
import { WrapperButtonHover, WrapperContainer, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style';
import InputForm from '../../components/InputForm/InputForm';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../util';

const CreateNewsPage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')

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
        console.log('clickCreateNews', title, content, image)
    }

    return (
        <WrapperContainer>
            <WrapperHeader>Đăng bài viết</WrapperHeader>
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
        </WrapperContainer>

    )
}

export default CreateNewsPage