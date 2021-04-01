import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { DollarOutlined, GiftOutlined, KeyOutlined, LinkOutlined } from '@ant-design/icons';

import { getAccessTokenApi } from '../../../../api/auth';

import './AddEditCourseForm.scss';
import { addCourseApi, updateCourseApi } from '../../../../api/course';

export default function AddEditCourseForm(props) {
    const {
        setIsVisibleModal,
        setReloadCourses,
        course,
    } = props;
    const [courseData, setCourseData] = useState({});

    const addCourse = e => {
        e.preventDefault();

        if (!courseData.idCourse) {
            notification.error({ message: 'El ID del curso es obligatorio.' });
        } else {
            const accessToken = getAccessTokenApi();

            addCourseApi(accessToken, courseData)
                .then(response => {
                    const typeNotification = response.code === 200 ? 'success' : 'warning';
                    notification[typeNotification]({ message: response.message });
                    setIsVisibleModal(false);
                    setReloadCourses(true);
                    setCourseData({});
                })
                .catch(() => notification.error({ message: 'Error del servidor, intentelo mas tarde.' }));
        }
    };

    const updateCourse = e => {
        e.preventDefault();
        const accessToken = getAccessTokenApi();

        updateCourseApi(accessToken, course._id, courseData)
            .then(response => {
                const typeNotification = response.code ? 'success' : 'warning';
                notification[typeNotification]({ message: response.message });
                setIsVisibleModal(false);
                setReloadCourses(true);
                setCourseData({});
            })
            .catch(_ => notification.error({ message: 'Error del servidor, intentelo mas tarde.' }));
    };

    useEffect(() => {
        course ? setCourseData(course) : setCourseData({});
    }, [course]);

    return (
        <div className='add-edit-course-form'>
            <AddEditForm
                course={course}
                addCourse={addCourse}
                updateCourse={updateCourse}
                courseData={courseData}
                setCourseData={setCourseData}
            />
        </div>
    );
}

function AddEditForm(props) {
    const {
        course,
        addCourse,
        updateCourse,
        courseData,
        setCourseData,
    } = props;

    return (
        <Form className='form-add-edit' onSubmitCapture={course ? updateCourse : addCourse}>
            <Form.Item>
                <Input
                    prefix={<KeyOutlined />}
                    placeholder='ID del curso'
                    value={courseData.idCourse}
                    onChange={({ target }) => setCourseData({ ...courseData, idCourse: target.value })}
                    disabled={course ? true : false}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LinkOutlined />}
                    placeholder='URL del curso'
                    value={courseData.link}
                    onChange={({ target }) => setCourseData({ ...courseData, link: target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<GiftOutlined />}
                    placeholder='Cupon de descuento'
                    value={courseData.coupon}
                    onChange={({ target }) => setCourseData({ ...courseData, coupon: target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<DollarOutlined />}
                    placeholder='Precio del curso'
                    value={courseData.price}
                    onChange={({ target }) => setCourseData({ ...courseData, price: target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    {course ? 'Actualizar curso' : 'Crear curso'}
                </Button>
            </Form.Item>
        </Form>
    );
}
