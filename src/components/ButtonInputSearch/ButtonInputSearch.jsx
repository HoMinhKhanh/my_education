import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { WrapperTextButton } from './style';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import InputComponent from '../InputComponent/InputComponent';

const ButtonInputSearch = (props) => {
    const { size, placeholder, textbutton} = props;
    return (
        <WrapperTextButton>
            <InputComponent size={size} placeholder={placeholder} bordered={false} {...props} />
            <ButtonComponent size={size} type="text" icon={<SearchOutlined />} textButton={textbutton} />
        </WrapperTextButton>
    )
}

export default ButtonInputSearch