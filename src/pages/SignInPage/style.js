import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperContainerBackground = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const WrapperContainer = styled.div`
    background: rgb(248, 248, 248);
    display: flex;
    width: 800px;
    height: 443px;
    border-radius: 20px;
    position: relative;
`

export const WrapperContainerLeft = styled.div`
    width: 500px;
    padding: 40px 45px 24px;
    background: rgb(255, 255, 255);
    border-radius: 20px 0px 0px 20px;
`

export const WrapperContainerRight = styled.div`
    background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%);
    width: 300px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-radius: 0px 20px 20px 0px;
`

export const WrapperContainerHeadingH4 = styled.h4`
    margin: 0px 0px 10px;
    font-size: 24px;
    font-weight: 500;
`

export const WrapperContainerImageH4 = styled.h4`
    margin: 0px 0px 5px;
    color: rgb(11, 116, 229);
    font-size: 17px;
    font-weight: 500;   
`

export const WrapperContainerHeadingP = styled.p`
    margin: 0px;
    font-size: 15px;
`

export const WrapperContainerSignUpP = styled.p`
    font-size: 1.4rem;
    line-height: 1.8;
    margin-bottom: 0;
    padding: 24px 16px 0;
    text-align: center;
`

export const WrapperContainerSignUpA = styled.a`
    color: #f05123;
    font-weight: 600;
    text-decoration: none;
`

export const WrapperContainerImageSpan = styled.span`
    font-size: 13px;
    color: rgb(11, 116, 229);
    font-weight: 500;
`

export const WrapperLogoImage = styled.img`
    border-radius: 8px;
    height: 44px;
    object-fit: cover;
    width: 44px;
`

export const WrapperButtonHover = styled(ButtonComponent)`
    &:hover {
        opacity: 0.8;
        cusor: 'pointer',
    }
`