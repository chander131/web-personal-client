import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Editor } from '@tinymce/tinymce-react';

import { getAccessTokenApi } from '../../../../api/auth';
import { addPostApi, updatePostApi } from '../../../../api/post';

import './AddEditPostForm.scss';

export default function AddEditPostForm(props) {
    const { post, setIsVisibleModal, setReloadPosts } = props;
    const [postData, setPostData] = useState({});

    const updatePost = () => {
        const token = getAccessTokenApi();

        updatePostApi(token, post._id, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? 'success' : 'warning';
                notification[typeNotification]({ message: response.message });
                setIsVisibleModal(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(() => notification.error({ message: 'Error del servidor.' }));
    };

    const addPost = () => {
        const token = getAccessTokenApi();

        addPostApi(token, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? 'success' : 'warning';
                notification[typeNotification]({ message: response.message });
                setIsVisibleModal(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(() => notification.error({ message: 'Error del servidor.' }));
    };

    const processPost = e => {
        e.preventDefault();
        const { title, description, url, date } = postData;

        if (!title || !description || !url || !date) {
            notification.error({ message: 'Todos los campos son obligatorios.' })
        } else {
            if (!post) {
                addPost()
            } else {
                updatePost();
            }
        }
    };

    useEffect(() => {
        if (post) setPostData(post);
        else setPostData({});
    }, [post]);

    return (
        <div>
            <AddEditForm postData={postData} setPostData={setPostData} post={post} processPost={processPost} />
        </div>
    );
}

function AddEditForm(props) {
    const { postData, setPostData, post, processPost } = props;

    return (
        <Form className='add-edit-post-form' onSubmitCapture={processPost}>
            <Row gutter={24}>
                <Col span={8}>
                    <Input
                        prefix={<FontSizeOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                        placeholder='Titulo'
                        value={postData.title || ''}
                        onChange={e => setPostData({ ...postData, title: e.target.value })}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        prefix={<LinkOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                        placeholder='URL'
                        value={postData.url || ''}
                        onChange={e => setPostData({ ...postData, url: transformTextUrl(e.target.value) })}
                    />
                </Col>
                <Col span={8}>
                    <DatePicker
                        style={{ width: '100%' }}
                        format='DD/MM/YYYY HH:mm:ss'
                        placeholder='Fecha de publicación'
                        // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        value={postData.date && moment(postData.date)}
                        onChange={(e, value) =>
                            setPostData({
                                ...postData,
                                date: moment(value, 'DD/MM/YYYY HH:mm:ss').toString(),
                            })
                        }
                    />
                </Col>
            </Row>

            <Editor
                initialValue={post?.description || ''}
                init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        `undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help`
                }}
                onBlur={e => setPostData({ ...postData, description: e.target.getContent() })}
            />

            <Button type='primary' htmlType='submit' className='btn-submit'>
                {post ? 'Actualizar post' : 'Crear post'}
            </Button>
        </Form>
    );
}

function transformTextUrl(text = '') {
    const url = text.replace(' ', '-');
    return url.toLowerCase();
}
