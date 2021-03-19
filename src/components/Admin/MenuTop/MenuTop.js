import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';

import { logout } from '../../../api/auth';

import DanielLogo from '../../../assets/img/png/logo-white.png';

import './MenuTop.scss';

export default function MenuTop(props) {
    const { menuCollapsed, setMenuCollapsed } = props;
    const logoutUser = () => {
        logout();
        window.location.reload();
    };

    return (
        <div className='menu-top'>
            <div className='menu-top__left'>
                <Link to={'/admin'}>
                    <img
                        className='menu-top__left-logo'
                        src={DanielLogo}
                        alt='Daniel Alexander Elias'
                    />
                </Link>
                <Button
                    type='link'
                    onClick={() => setMenuCollapsed(!menuCollapsed)} >
                        {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
            <div className='menu-top__right'>
                <Button
                    type='link'
                    onClick={logoutUser} >
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
} 