import { Col, Row } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled(Row)`
    --height: 66px;
    padding: 0 28px;
    align-items: center;
    flex-wrap: nowrap;
    background-color: #fff;
    border-bottom: 1px solid #e8ebed;
    font-size: 1.4rem;
    height: var(--height);
    left: 0;
    right: 0;
    top: 0;
`

export const WrapperColHeader = styled(Col)`
    display: flex;
    align-items: center;
`

export const WrapperLogoHeader = styled.img`
    border-radius: 8px;
    height: 38px;
    width: 38px;
`

export const WrapperTextHeader = styled.span`
    font-size: 1.4rem;
    color: #000;
    font-weight: 700;
    margin-left: 16px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 1.2rem;
    color: #404040;
    font-weight: 600;
    white-space: nowrap;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    color: #404040;
    float: right;
`