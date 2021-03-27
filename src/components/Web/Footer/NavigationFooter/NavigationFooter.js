import React from 'react'
import { Row, Col } from 'antd';
import { AppstoreOutlined, BookOutlined, CodeOutlined, DatabaseOutlined, HddOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './NavigationFooter.scss';

export default function NavigationFooter() {
    return (
        <Row className='navigation-footer'>
            <Col md={24}>
                <h3>Navegacion</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft />
            </Col>
            <Col md={12}>
                <RenderListRight />
            </Col>
        </Row>
    );
}

function RenderListLeft() {
    return (
        <ul>
            <li>
                <a href='#'>
                    <BookOutlined /> Cursos Online
                </a>
            </li>
            <li>
                <a href='#'>
                    <CodeOutlined /> Desarrollo Wev
                </a>
            </li>
            <li>
                <a href='#'>
                    <DatabaseOutlined /> CBase de Datos
                </a>
            </li>
            <li>
                <a href='#'>
                    <RightOutlined /> Politica de Privacidad 
                </a>
            </li>
            {/* <li>
                <Link to='/contact'>
                    <CodeOutlined />Desarrollo Web
                </Link>
            </li> */}
        </ul>
    );
}

function RenderListRight() {
    return (
        <ul>
            <li>
                <a href='#'>
                    <HddOutlined /> Sistemas / Servidores
                </a>
            </li>
            <li>
                <a href='#'>
                    <AppstoreOutlined /> CMS
                </a>
            </li>
            <li>
                <a href='#'>
                    <UserOutlined /> Portafolio
                </a>
            </li>
            <li>
                <a href='#'>
                    <RightOutlined /> Politica de Cookies
                </a>
            </li>
        </ul>
    );
}
