import React from 'react';
import { WrapperInputStyle } from './style';

const InputComponent = ({size, placeholder, ...rests }) => {
    return (
        <WrapperInputStyle 
            size={size} 
            placeholder={placeholder} 
            bordered={false}
            {...rests}
        />
    )
}

export default InputComponent