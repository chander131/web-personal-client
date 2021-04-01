import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Modal from '../../../components/Modal';
import { getPostsApi } from '../../../api/post';

import './Blog.scss';

function Blog(props) {
    const { location, history } = props;
    const [posts, setPosts] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const [reloadPosts, setReloadPosts] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const { page = 1 } = queryString.parse(location.search);
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    useEffect(() => {
        getPostsApi(12, page)
            .then(response => {
                if (response?.code !== 200) {
                    notification.warning({ message: response.message });
                } else {
                    setPosts(response.posts.docs);
                }
            })
            .catch(() => notification.error({ message: 'Error del servidor.' }));
        setReloadPosts(false);
    }, [page, reloadPosts]);

    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button type='primary'>
                    Nuevo post
                </Button>
            </div>

            <h1>PostList...</h1>
            <h2>Paginacion.......</h2>

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                width='75%'
            />
        </div>
    );
};

export default withRouter(Blog);
