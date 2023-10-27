import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const ForgotContainerBackground = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ForgotContainer = styled.div`
    background: rgb(248, 248, 248);
    display: flex;
    width: 800px;
    height: 443px;
    border-radius: 20px;
    position: center;
    align-items: center;
    justify-content: center;
`

export const ForgotContainerHeadingH4 = styled.h4`
    margin: 0px 0px 10px;
    font-size: 24px;
    font-weight: 500;
`

export const ForgotLogoImage = styled.img`
    border-radius: 8px;
    height: 44px;
    object-fit: cover;
    width: 44px;
`
export const ForgotButtonHover = styled(ButtonComponent)`
    &:hover {
        opacity: 0.8;
        cusor: 'pointer',
    }
`
export const ForgotButtonHoverSearch = styled(ButtonComponent)`
    &:hover {
        opacity: 0.4;
        cusor: 'pointer',
    }
    margin-left:35px;
`

export const ForgotButtonHoverCancel = styled(ButtonComponent)`
    &:hover {
        opacity: 0.4;
        cusor: 'pointer',
    }
    border: 0.5px solid #000000;
`
export const WrapperButtonHover = styled(ButtonComponent)`
    &:hover {
        opacity: 0.8;
        cusor: 'pointer',
    }
`