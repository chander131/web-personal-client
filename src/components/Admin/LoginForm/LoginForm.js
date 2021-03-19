import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { signInApi } from '../../../api/user'
import { emailValidation, minLengthValidation } from '../../../utils/formValidation'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

import './LoginForm.scss';

export default function LoginForm(props) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
    });

    const changeForm = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

    const inputValidation = ({ target, target: { type, name } }) => {
        if(type === 'email') setFormValid({ ...formValid, [name]: emailValidation(target) });
        if(type === 'password') setFormValid({ ...formValid, [name]: minLengthValidation(target, 6) });
    }

    const login = async (e) => {
        e.preventDefault();

        const result = await signInApi(inputs);
        if(result.message) {
            notification.error({ message: result.message });
        } else {
            const { accessToken, refreshToken } = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            notification.success({ message: 'Login correcto' });

            window.location.href = '/admin';
        }
    };

    return (
        <Form className='login-form' onChange={changeForm} onSubmitCapture={login}>
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='email'
                    name='email'
                    placeholder='Correo electronico'
                    className='login-form__input'
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    className='login-form__input'
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' className='login-form__button'>
                    Entrar
                </Button>
            </Form.Item>
        </Form>
    );
}