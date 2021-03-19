import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { signUpApi } from '../../../api/user'
import { emailValidation, minLengthValidation } from '../../../utils/formValidation'

import './RegisterForm.scss';

export default function RegisterForm(props) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        privacyPolicy: false,
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false,
    });

    const changeForm = ({ target: { name, value, checked }}) => {
        if(name === 'privacyPolicy') setInputs({ ...inputs, [name]: checked });
        else setInputs({ ...inputs, [name]: value });
    }

    const inputValidation = ({ target, target: { type, name } }) => {
        if(type === 'email') setFormValid({ ...formValid, [name]: emailValidation(target) });
        if(type === 'password') setFormValid({ ...formValid, [name]: minLengthValidation(target, 6) });
        if(type === 'checkbox') setFormValid({ ...formValid, [name]: target.checked });
    }

    const register = async e => {
        e.preventDefault();
        const passwordValid = inputs.password;
        const repeatPasswordValid = inputs.repeatPassword;

        if(!inputs.email || !passwordValid || !repeatPasswordValid || !inputs.privacyPolicy) {
            notification.error({ message: 'Todos los campos son obligatorios' });
        } else {
            if(passwordValid !== repeatPasswordValid) {
                notification.error({ message: 'Las contraseñas deben de ser iguales' });
            } else {
                const result = await signUpApi(inputs);
                
                if(!result.ok) {
                    notification.error({ message: result.message });
                } else {
                    notification.success({ message: result.message });
                    resetForm();
                }
            }
        }
    }

    const resetForm = () => {
        const inputs = document.getElementsByTagName('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
        }

        setInputs({
            email: '',
            password: '',
            repeatPassword: '',
            privacyPolicy: false,
        });

        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false,
        });
    }

    return (
        <Form className='register-form' onChange={changeForm} onSubmitCapture={register}>
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='email'
                    name='email'
                    placeholder='Correo electronico'
                    className='register-form__input'
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
                    className='register-form__input'
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='password'
                    name='repeatPassword'
                    placeholder='Repetir contraseña'
                    className='register-form__input'
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox name='privacyPolicy' checked={inputs.privacyPolicy} onChange={inputValidation}>
                    He leido y acepto la politica de privacidad.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' className='register-form__button'>
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    );
}