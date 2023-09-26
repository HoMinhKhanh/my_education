import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({size, textButton, ...rests }) => {
    return (
        <Button
        size={size}
        type="text"
        {...rests}
        >
            {textButton}
        </Button>
    )
}

export default ButtonComponent