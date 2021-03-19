import React, { useState, useEffect } from 'react';

import ListUsers from '../../../components/Admin/Users/ListUsers';

import { getAccessTokenApi } from '../../../api/auth';
import { getUsersActiveApi } from '../../../api/user';

import './Users.scss';

export default function Users(props) {
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();

    useEffect(() => {
        getUsersActiveApi(token, true).then(response => {
            setUsersActive(response.users);
        });
        getUsersActiveApi(token, false).then(response => {
            setUsersInactive(response.users);
        });
        setReloadUsers(false);
    }, [token, reloadUsers]);

    return (
        <div className='users'>
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
        </div>
    );
}