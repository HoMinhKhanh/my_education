import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 40px;
    background-color: #fff;
    width: 100%;
`
export const WrapperCourseName = styled.h2`
    color: #242424;
    font-size: 2.4rem;
    font-weight: 900;
    margin-right: auto;
    margin-top: 32px;
`

export const WrapperButtonHover = styled(ButtonComponent)`
    &:hover {
        opacity: 0.8;
        cusor: 'pointer',
    }
`

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 24px;
    flex-wrap: wrap;
`