import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, styleButton, textButton, type, disabled, ...rests }) => {
    return (
        <Button
            disabled={disabled}
            style={{
                ...styleButton,
                // backgroundColor: disabled ? '#ccc' : styleButton.backgroundColor,
            }}
            size={size}
            type={type}
            {...rests}
        >
            {textButton}
        </Button>
    )
}

export default ButtonComponent