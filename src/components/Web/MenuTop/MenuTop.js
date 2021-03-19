import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import SocialLinks from '../SocialLinks';

import { getMenuApi } from '../../../api/menu';

import logo from '../../../assets/img/png/logo-white.png';

import './MenuTop.scss';

export default function MenuTop(props) {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        const arrayData = [];
        getMenuApi().then(({ menu }) => {
            menu.forEach(item => item.active && arrayData.push(item));
            setMenuData(arrayData);
        });
    }, []);

    return (
        <Menu className='menu-top-web' mode='horizontal'>
            <Menu.Item className='menu-top-web__logo'>
                <Link to={'/'}>
                    <img src={logo} alt='Daniel Alexander Elias' />
                </Link>
            </Menu.Item>

            {menuData.map(item => {
                const external = item.url.indexOf('http') > -1;

                return (
                    <Menu.Item key={item._id} className='menu-top-web__item'>
                        {external ?
                            (<a href={item.url} target='_blank' rel='noreferrer'>{item.title}</a>) :
                            (<Link to={item.url}>{item.title}</Link>)
                        }
                    </Menu.Item>
                );
            })}

            <SocialLinks />
        </Menu>
    );
}