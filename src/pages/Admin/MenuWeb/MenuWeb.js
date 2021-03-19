import React, { useState, useEffect } from 'react';

import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList';

import { getMenuApi } from '../../../api/menu';

import './MenuWeb.scss';

export default function MenuWeb(props) {
    const [menu, setMenu ] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

    useEffect(() => {
        getMenuApi().then(response => {
            setMenu(response.menu);
        });
        setReloadMenuWeb(false);
    }, [reloadMenuWeb]);

    return (
        <div className='menu-web'>
            <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
        </div>
    );
}