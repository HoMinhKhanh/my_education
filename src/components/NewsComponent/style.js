import styled from "styled-components";

export const WrapperNewsComponent = styled.div`
    border: 2px solid #e8e8e8;
    border-radius: 16px;
    padding: 24px;
    margin: 16px 44px 0;
`

export const WrapperNewsComponentSmall = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`

export const WrapperNewsComponentAuthor = styled.div`
    align-items: center;
    display: flex;
`

export const WrapperNewsComponentAvatar = styled.img`
    border-radius: 50%;
    height: 9em;
    object-fit: cover;
    width: 9em;
`

export const WrapperNewsComponentName = styled.span`
    color: #292929;
    font-size: 1.2rem;
    font-weight: 600;
    margin-left: 8px;
`

export const WrapperNewsComponentOption = styled.div`
    color: #757575;
    display: flex;
    font-size: 1.6rem;
    margin-right: -8px;
`

export const WrapperNewsTitle = styled.h2`
    color: #292929;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.6;
    margin-bottom: 0;
    margin-top: 8px;
`

export const WrapperNewsDesc = styled.p`
    color: #505050;
    font-size: 1.5rem;
    line-height: 1.6;
    margin-top: 4px;
    margin-bottom: 16px;
`

export const WrapperNewsCourse = styled.a`
    background-color: #f2f2f2;
    border-radius: 100px;
    color: #333;
    font-weight: 500;
    line-height: 2rem;
    margin-right: 12px;
    padding: 4px 10px;
    text-decoration: none;
`

export const WrapperNewsCourseImg = styled.img`
    background: #ebebeb;
    border-radius: 15px;
    color: #757575;
    display: block;
    font-size: 1.4rem;
    line-height: 1.8;
    max-height: 120px;
    object-fit: cover;
    overflow: hidden;
    text-align: center;
    width: 200px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
