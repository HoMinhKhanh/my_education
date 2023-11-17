import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperContainer = styled.div`
    width: calc(100% - 96px);
    padding: 0 40px 0 20px;
    min-height: 800px;
    background-color: #fff;
`

export const WrapperHeader = styled.h1`
    color: #242424;
    font-size: 2.8rem;
    font-weight: 900;
    margin: 0.67em 0;
`

export const WrapperContentProfile = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #242424;
    border-radius: 12px;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    gap: 24px;
`

export const WrapperLabel = styled.label`
    color: #292929;
    font-size: 1.6rem;
    font-weight: 600;
    text-align: left;
    width: 15%;
`

export const WrapperButtonHover = styled(ButtonComponent)`
    font-size: 1.4rem;
    width: 120px;
    color: #f05123;
    border: 1px solid #f05123;
    border-radius: 16px;
`