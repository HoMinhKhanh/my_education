import styled from 'styled-components';
// import { Menu } from 'antd';

// export const WrapperNavigation = styled(Menu)`
//     height: 100%;
//     width: 148px;
//     font-size: 1.4rem;
// `

export const WrapperNavigation = styled.div`
    height: auto;
    width: 96px;
    font-size: 1.4rem;
    background-color: #fff;
    align-items: center;
    display: flex;
    flex-direction: column;
`

export const WrapperNavBar = styled.ul`
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
`

export const WrapperNavBarLi = styled.li`
    list-style: none;
    display: list-item;
`

export const WrapperNavBarA = styled.a`
    align-items: center;
    background-color: #fff;
    border-radius: 16px;
    color: #404040;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 72px;
    justify-content: center;
    margin-top: 4px;
    width: 72px;
`
