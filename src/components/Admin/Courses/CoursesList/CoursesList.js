import React, { useEffect, useState } from 'react'
import { List, Button, Modal as ModalAntd, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DragSortableList from 'react-drag-sortable';

import Modal from '../../../Modal';

import { getAccessTokenApi } from '../../../../api/auth';
import { getCourseDataUdemyApi, deleteCourseApi } from '../../../../api/course';

import './CoursesList.scss';

const { confirm } = ModalAntd;

export default function CoursesList(props) {
    const { courses, setReloadCourses } = props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const onSort = (sortedList, dropEvent) => {
        console.log("🚀 ~ file: CoursesList.js ~ line 22 ~ onSort ~ sortedList", sortedList)
    };

    const deleteCourse = course => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: 'Eliminando curso',
            content: `¿Esta seguro que quieres eliminar el curso ${course.idCourse}?`,
            okText: 'Elimiar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deleteCourseApi(accessToken, course._id)
                    .then(({ code, message }) => {
                        const typeNotification = code === 200 ? 'success' : 'warning';
                        notification[typeNotification]({ message: message });
                        setReloadCourses(true);
                    })
                    .catch(err => notification.error({ message: 'Error del servidor intentelo mas tarde.' }));
            }
        });
    };

    useEffect(() => {
        const listCourseArray = [];
        courses.forEach(course => {
            listCourseArray.push({
                content: (
                    <Course
                        course={course}
                        deleteCourse={deleteCourse}
                    />
                ),
            });
        });
        setListCourses(listCourseArray);
    }, [courses]);

    return (
        <div className='courses-list'>
            <div className='courses-list__header'>
                <Button type='primary' onClick={() => { }}>
                    Nuevo curso
                </Button>
            </div>

            <div className='courses-list__items'>
                {!listCourses.length && (
                    <h2 style={{ textAlign: 'center', margin: 0 }}>
                        No tienes cursos creados
                    </h2>
                )}
                <DragSortableList items={listCourses} onSort={onSort} type='vertical' />
            </div>
        </div>
    )
}

function Course(props) {
    const { course, deleteCourse } = props;
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse).then(response => {
            if (response.code !== 200) notification.warning({ message: `El curso con el ${course.idCourse} no se ha encontrado.` });
            setCourseData(response.data);
        })
    }, [course]);

    return (
        <>
            {!courseData ? null : (
                <List.Item
                    actions={[
                        <Button type='primary' onClick={_ => { }}>
                            <EditOutlined />
                        </Button>,
                        <Button type='danger' onClick={() => deleteCourse(course)}>
                            <DeleteOutlined />
                        </Button>,
                    ]}
                >
                    <img
                        src={courseData.image_480x270}
                        alt={courseData.title}
                        style={{ width: '100px', marginRight: '20px' }}
                    />
                    <List.Item.Meta
                        title={`${courseData.title} | ID: ${course.idCourse}`}
                        description={courseData.headline}
                    />
                </List.Item>
            )}
        </>
    );
}

