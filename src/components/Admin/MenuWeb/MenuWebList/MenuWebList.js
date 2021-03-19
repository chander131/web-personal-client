import React, { useState, useEffect } from 'react';
import DragSortableList from 'react-drag-sortable';
import {
    Switch,
    List,
    Button,
    Modal as ModalAntd,
    notification,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Modal from '../../../Modal';
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';

import { updateMenuApi, activateMenuApi, deleteMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './MenuWebList.scss';

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
    const { menu, setReloadMenuWeb } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateMenuApi(accessToken, _id, { order });
        });
    };

    const activateMenu = (menu, status) => {
        const accessToken = getAccessTokenApi();
        activateMenuApi(accessToken, menu._id, status)
            .then(response => notification.success({ message: response }));
    };

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle('Creando nuevo menu');
        setModalContent(
            <AddMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
            />
        );
    };

    const editMenuWebModal = menu => {
        setIsVisibleModal(true);
        setModalTitle(`Editando menu ${menu.title}`);
        setModalContent(
            <EditMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
                menu={menu}
            />
        );
    };

    const deleteMenu = menu => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: 'Eliminando menu',
            content: `¿Estas seguro de que quieres eliminar el menu ${menu.title}?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deleteMenuApi(accessToken, menu._id)
                    .then(response => {
                        notification.success({ message: response });
                        setReloadMenuWeb(true);
                    }).catch(_ => {
                        notification.error({ message: 'Error del servidor, intentelo mas tarde.' })
                    });
            }
        });
    };

    useEffect(() => {
        let listItemsArray = [];
        menu.forEach(item => {
            listItemsArray.push({
                content: (
                    <MenuItem
                        item={item}
                        activateMenu={activateMenu}
                        editMenuWebModal={editMenuWebModal}
                        deleteMenu={deleteMenu}
                    />
                )
            });
        });
        setListItems(listItemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu]);

    return (
        <div className='menu-web-list'>
            <div className='menu-web-list__header'>
                <Button type='primary' onClick={addMenuWebModal}>Nuevo menu</Button>
            </div>

            <div className='menu-web-list__items'>
                <DragSortableList items={listItems} onSort={onSort} type='vertical' />
            </div>

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

function MenuItem(props) {
    const { item, activateMenu, editMenuWebModal, deleteMenu } = props;

    return (
            <List.Item
                actions={[
                    <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)} />,
                    <Button type='primary' onClick={() => editMenuWebModal(item)}>
                        <EditOutlined />
                    </Button>,
                    <Button type='danger' onClick={() => deleteMenu(item)}>
                        <DeleteOutlined />
                    </Button>
                ]}
            >
                <List.Item.Meta title={item.title} description={item.url} />
            </List.Item>
    );
}
