import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-left: none;
    border-top: none;
    border-right: none;
    border-width: 2px;
    &:hover{
        border-color: #f05123;
        box-shadow: 0 0 0 2px rgb(233 107 31 / 10%);
        outline: 0;
    }
    &:focus{
        border-color: #f05123;
        box-shadow: 0 0 0 2px rgb(233 107 31 / 10%);
        outline: 0;
    }
`