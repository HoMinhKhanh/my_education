import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperCourseDetail = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
    margin-left: 24px;
    margin-top: 20px;
    padding-bottom: 20px;
    position: sticky;
    top: 90px;
`

export const WrapperCourseDetailH5 = styled.h5`
    color: #f05123;
    font-size: 32px;
    font-weight: 400;
    margin: 0px auto;
    opacity: 0.8;
`

export const WrapperButtonHover = styled(ButtonComponent)`
    &:hover {
        opacity: 0.8;
        cusor: 'pointer',
    }
`

export const WrapperCourseDetailUl = styled.ul`
    display: inline-block;
    margin: 0px;
    padding: 24px 0px 10px 4px;
    text-align: left;
    list-style: none;
`

export const WrapperCourseDetailLi = styled.li`
    color: rgb(73, 73, 73);
    font-size: 1.4rem;
    line-height: 1.6;
    margin-bottom: 10px;
    position: relative;
`

export const WrapperCourseDetailIcon = styled.div`
    color: rgb(73, 73, 73);
    font-size: 2.6rem;
    line-height: 1.6;
    margin-top: 10px;
`

export const WrapperCourseDetailSpan = styled.span`
    margin-left: 24px;
`
