import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useDropzone, } from 'react-dropzone';

import { uploadAvatarApi, updateUserApi, getAvatarApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import NoAvatar from '../../../../assets/img/png/no-avatar.png';

import './EditUserForm.scss';

export default function EditUserForm(props) {
    const { user, setIsVisibleModal, setReloadUsers } = props;
    const [ avatar, setAvatar ] = useState(null);
    const [userData, setUserData] = useState({});

    const updateUser = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if(userUpdate.password || userUpdate.repeatPassword) {
            if(userUpdate.password !== userUpdate.repeatPassword) {
                notification.error({ message: 'Las contraseñas deben de ser iguales.' });
                return;
            } else {
                delete userUpdate.repeatPassword;
            }
        }

        if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification.error({ message: 'El nombre, apellidos y correo son obligatorios.' });
            return;
        }

        if(typeof userUpdate.avatar === 'object') {
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
                userUpdate.avatar = response.avatarName;
                updateUserApi(token, userUpdate, user._id).then(result => {
                    notification.success({ message: result.message });
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                });
            });
        } else {
            updateUserApi(token, userUpdate, user._id).then(result => {
                notification.success({ message: result.message });
                setIsVisibleModal(false);
                setReloadUsers(true);
            });
        }
    }

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        });
    }, [user]);

    useEffect(() => {
        if(user.avatar) getAvatarApi(user.avatar).then(response => setAvatar(response));
        else setAvatar(null);
    }, [user]);

    useEffect(() => {
        if(avatar) {
            setUserData({ ...userData, avatar: avatar.file });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);

    return (
        <div className='edit-user-form'>
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm
                userData={userData}
                setUserData={setUserData}
                updateUser={updateUser}
            />
        </div>
    );
};

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) });
        }, [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        onDrop
    });

    useEffect(() => {
        if(avatar) {
            if(avatar.preview) setAvatarUrl(avatar.preview);
            else setAvatarUrl(avatar);
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);

    return (
        <div className='upload-avatar' {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl || NoAvatar} />
            )}
        </div>
    );
};

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form className='form-edit' onSubmitCapture={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                            placeholder='Nombre'
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                            placeholder='Apellidos'
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                            placeholder='Correo electronico'
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder='Selecciona un rol'
                            onChange={(e) => setUserData({ ...userData, role: e })}
                            value={userData.role}
                        >
                            <Option value='admin'>Administrador</Option>
                            <Option value='editor'>Editor</Option>
                            <Option value='reviewr'>Revisor</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                            type='password'
                            placeholder='Contraseña'
                            onChange={e => setUserData({ ...userData, password: e.target.value  })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                            type='password'
                            placeholder='Repetir contraseña'
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value  })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Actualizar usuario
                </Button>
            </Form.Item>
        </Form>
    );
}
