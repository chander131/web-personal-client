import React from 'react';
import { Pagination as PaginationAntd } from 'antd';

import './Pagination.scss';

export default function Pagination(props) {
    const { posts, location, history } = props;
    const currentPage = parseInt(posts.page);

    const onChangePage = newPage => history.push(`${location.pathname}?page=${newPage}`);

    return (
        <PaginationAntd
            defaultCurrent={currentPage}
            current={currentPage}
            total={posts.total}
            pageSize={parseInt(posts.limit)}
            onChange={onChangePage}
            className='pagination'
        />
    );
}
