import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { WrapperTextButton } from './style';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton} = props;
    return (
        <WrapperTextButton>
            <InputComponent size={size} placeholder={placeholder} bordered={false} />
            <ButtonComponent size={size} type="text" icon={<SearchOutlined />} textButton={textButton} />
        </WrapperTextButton>
    )
}

export default ButtonInputSearch