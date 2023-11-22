import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';
import NavigationComponent from '../NavigationComponent/NavigationComponent';
import { Layout } from 'antd';

const DefaultComponent = ({children}) => {
    return (
        <Layout>
            <HeaderComponent />
            <Layout hasSider>
                <NavigationComponent />
                {children}
            </Layout>
            <FooterComponent />
        </Layout>
    )
}

export default DefaultComponent