import React, { useState, useEffect } from 'react';
import { Spin, notification } from 'antd';
import moment from 'moment';

import { getPostByUrlApi } from '../../../../api/post';

import 'moment/locale/es';
import './PostInfo.scss';

export default function PostInfo(props) {
    const { url } = props;
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        getPostByUrlApi(url)
            .then(response => {
                if (response?.code !== 200) notification.warning({ message: response.message });
                else setPostInfo(response.post);
            })
            .catch(() => notification.error({ message: 'Error del servidor.' }));
    }, [url]);

    return (
        <>
            {!postInfo ? <Spin tip='Cargando...' style={{ width: '100%', padding: '200px 0' }} /> : (
                <div className='post-info'>
                    <h1 className='post-info__title'>{postInfo.title}</h1>
                    <div className='post-info__creation-date'>
                        {moment(postInfo.date).local('es').format('LL')}
                    </div>
                    <div
                        className='post-info__description'
                        dangerouslySetInnerHTML={{ __html: postInfo.description }}
                    />
                </div>
            )}
        </>
    );
}
