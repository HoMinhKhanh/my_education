import { Row } from "antd";
import styled from "styled-components";

export const WrapperLessonsDetailDiv = styled(Row)`
    width: 100%;
    background-color: #fff;
`

export const WrapperLessonsDetailLeft = styled.div`
    left: 0;
    top: 0;
    height: 100vh;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
`

export const WrapperLessonsDetailVideo = styled.div`
    background-color: #000;
    padding: 0 8.5%;
    position: relative;
    width: 100%;
    height: 530px;
`

export const WrapperLessonsDetailDescription = styled.div`
    min-height: 200px;
    padding: 0 8.5%;
`

export const WrapperLessonsDetailName = styled.h1`
    font-size: 2.8rem;
    margin: 48px 0 8px;
`

export const WrapperLessonsDetailDescriptionP = styled.div`
    word-wrap: break-word;
    color: #292929;
    font-size: 1.6rem;
    line-height: 2;
`

export const WrapperLessonsDetailRight = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    user-select: none;
`

export const WrapperLessonsDetailHeader = styled.h1`
    font-size: 1.6rem;
    line-height: 1.4;
    margin: 0;
    font-weight: 600;
`