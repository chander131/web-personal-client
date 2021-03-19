import React, { useEffect, useState } from 'react';
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd } from 'antd';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import AddUserForm from '../AddUserForm';

import { getAvatarApi, activateUserApi, deleteUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import NoAvatar from '../../../../assets/img/png/no-avatar.png';

import './ListUsers.scss';

const { confirm } = ModalAntd;

export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    const [ viewUsersActives, setViewUsersActives ] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const showDeleteConfirm = (user) => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: 'Eliminando usuario',
            content: `Estas seguro que quieres eliminar a ${user.email}`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deleteUserApi(accessToken, user._id)
                    .then(response => {
                        notification.success({ message: response });
                        setReloadUsers(true);
                    }).catch(err => {
                        notification.error({ message: err });
                    })
            }
        });
    };

    const adduserModal = () => {
        setIsVisibleModal(true);
        setModalTitle('Creando nuevo usuario');
        setModalContent(
            <AddUserForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadUsers={setReloadUsers}
            />
        );
    };

    return (
        <div className='list-users'>
            <div className='list-users__header'>
                <div className='list-users__header-switch'>
                    <Switch
                        defaultChecked
                        onChange={() => setViewUsersActives(!viewUsersActives)}
                    />
                    <span>{viewUsersActives ? 'Usuarios activos' : 'Usuarios inactivos'}</span>
                </div>
                <Button type='primary' onClick={adduserModal}>
                    Nuevos usuarios
                </Button>
            </div>
            {viewUsersActives ? (
                <UsersActive
                    usersActive={usersActive}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUsers={setReloadUsers}
                    showDeleteConfirm={showDeleteConfirm}
                />
            ) : ( 
                <UsersInactive
                    usersInactive={usersInactive}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUsers={setReloadUsers}
                    showDeleteConfirm={showDeleteConfirm}
                />
            )}
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

function UsersActive(props) {
    const {
        usersActive,
        setIsVisibleModal,
        setModalTitle,
        setModalContent,
        setReloadUsers,
        showDeleteConfirm,
    } = props;

    const editUser = user => {
        setModalTitle(`Editar ${user.name || '...'} ${user.lastname || '...'}`);
        setModalContent(
            <EditUserForm
                user={user}
                setIsVisibleModal={setIsVisibleModal}
                setReloadUsers={setReloadUsers}
            />
        );
        setIsVisibleModal(true);
    };

    return (
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => (
                <UserActive
                    user={user}
                    editUser={editUser}
                    setReloadUsers={setReloadUsers}
                    showDeleteConfirm={showDeleteConfirm}
                />
            )}
        />
    );
}

function UserActive(props) {
    const { user, editUser, setReloadUsers, showDeleteConfirm } = props;
    const [ avatar, setAvatar ] = useState(null);

    const inactiveUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, false)
            .then(response => {
                notification.success({ message: response.message });
                setReloadUsers(true);
            })
            .catch(err => {
                notification.error({ message: err });
            });
    };

    useEffect(() => {
        if(user.avatar) {
            getAvatarApi(user.avatar).then(response => setAvatar(response));
        } else {
            setAvatar(null);
        }
    }, [user]);

    return (
        <List.Item
            actions={[
                <Button
                    type='primary'
                    onClick={() => editUser(user)}
                >
                    <EditOutlined />
                </Button>,
                <Button
                    type='danger'
                    onClick={inactiveUser}
                >
                    <StopOutlined />
                </Button>,
                <Button
                    type='danger'
                    onClick={() => showDeleteConfirm(user)}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar || NoAvatar} />}
                title={`${ user.name || '...'} ${user.lastname || '...'}`}
                description={user.email}
            />
        </List.Item>
    );
}

function UsersInactive(props) {
    const {
        usersInactive,
        setReloadUsers,
        showDeleteConfirm,
    } = props;
    return (
        <List
            className='users-inactive'
            itemLayout='horizontal'
            dataSource={usersInactive}
            renderItem={user => (
                <UserInactive
                    user={user}
                    setReloadUsers={setReloadUsers}
                    showDeleteConfirm={showDeleteConfirm}
                />
            )}
        />
    );
}

function UserInactive(props) {
    const { user, setReloadUsers, showDeleteConfirm } = props;
    const [ avatar, setAvatar ] = useState(null);

    const activeUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, true)
            .then(response => {
                notification.success({ message: response.message });
                setReloadUsers(true);
            })
            .catch(err => {
                notification.error({ message: err });
            });
    };

    useEffect(() => {
        if(user.avatar) {
            getAvatarApi(user.avatar).then(response => setAvatar(response));
        } else {
            setAvatar(null);
        }
    }, [user]);

    return (
        <List.Item
            actions={[
                <Button
                    type='primary'
                    onClick={activeUser}
                >
                    <CheckOutlined />
                </Button>,
                <Button
                    type='danger'
                    onClick={() => showDeleteConfirm(user)}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar || NoAvatar} />}
                title={`${user.name || '...'} ${user.lastname || '...'}`}
                description={user.email}
            />
        </List.Item>
    );
}

