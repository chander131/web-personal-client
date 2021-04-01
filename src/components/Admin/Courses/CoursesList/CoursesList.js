/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { List, Button, Modal as ModalAntd, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DragSortableList from 'react-drag-sortable';

import Modal from '../../../Modal';
import AddEditCourseForm from '../AddEditCourseForm';

import { getAccessTokenApi } from '../../../../api/auth';
import { getCourseDataUdemyApi, deleteCourseApi, updateCourseApi } from '../../../../api/course';

import './CoursesList.scss';

const { confirm } = ModalAntd;

export default function CoursesList(props) {
    const { courses, setReloadCourses } = props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.course;
            const order = item.rank;
            updateCourseApi(accessToken, _id, { order });
        });
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

    const addCourseModal = () => {
        setIsVisibleModal(true);
        setModalTitle('Creando nuevo curso');
        setModalContent(
            <AddEditCourseForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
            />
        );
    };

    const editCourseModal = course => {
        setIsVisibleModal(true);
        setModalTitle('Actualizando curso');
        setModalContent(
            <AddEditCourseForm
                course={course}
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
            />
        );
    };

    useEffect(() => {
        const listCourseArray = [];
        courses.forEach(course => {
            listCourseArray.push({
                content: (
                    <Course
                        course={course}
                        deleteCourse={deleteCourse}
                        editCourseModal={editCourseModal}
                    />
                ),
            });
        });
        setListCourses(listCourseArray);
    }, [courses]);

    return (
        <div className='courses-list'>
            <div className='courses-list__header'>
                <Button type='primary' onClick={addCourseModal}>
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
            <Modal
                key='courses-courses-list'
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}

function Course(props) {
    const { course, deleteCourse, editCourseModal } = props;
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse).then(response => {
            if (response.code !== 200) notification.warning({ message: `El curso con el ${course.idCourse} no se ha encontrado.` });
            setCourseData(response.data);
        });
    }, [course]);

    return (
        <>
            {!courseData ? null : (
                <List.Item
                    actions={[
                        <Button type='primary' onClick={() => editCourseModal(course)}>
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

