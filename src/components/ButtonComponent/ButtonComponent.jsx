import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({size, textButton, type, linkHoverBg, ...rests }) => {
    return (
        <Button
            size={size}
            type={type}
            linkHoverBg={linkHoverBg}
            {...rests}
        >
            {textButton}
        </Button>
    )
}

export default ButtonComponent