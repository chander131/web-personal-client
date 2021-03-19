import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';

import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './EditMenuWebForm.scss';

export default function EditMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb, menu } = props;
    const [menuWebData, setMenuWebData] = useState({});

    const editMenu = e => {
        e.preventDefault();

        if(!menuWebData.title || !menuWebData.url) {
            notification.error({ message: 'Todos los campose son obligatorios. '});
            return;
        }

        const accessToken = getAccessTokenApi();
        updateMenuApi(accessToken, menuWebData._id, menuWebData)
            .then(response => {
                notification.success({ message: response });
                setIsVisibleModal(false);
                setReloadMenuWeb(true);
            }).catch(_ => notification.error({ message: 'Error del servidor'}));
    };

    useEffect(() => {
        setMenuWebData(menu);
    }, [menu]);

    return (
        <div className='edit-menu-web-form'>
            <EditForm
                editMenu={editMenu}
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
            />
        </div>
    );
}

function EditForm(props) {
    const { menuWebData, setMenuWebData, editMenu } = props;

    return (
        <Form className='form-edit' onSubmitCapture={editMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined style={{color: 'rgba(0, 0, 0, .25)'}} />}
                    placeholder='Titulo'
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({...menuWebData, title: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LinkOutlined style={{color: 'rgba(0, 0, 0, .25)'}} />}
                    placeholder='URL'
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({...menuWebData, url: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Actualizar menu
                </Button>
            </Form.Item>
        </Form>
    );
}
