import styled from 'styled-components';

export const WrapperNavigation = styled.div`
    height: auto;
    width: 96px;
    font-size: 1.4rem;
    background-color: #fff;
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 800px;
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
    &:hover {
        background-color: #e8ebed;
        color: #1a1a1a;
    }
`
