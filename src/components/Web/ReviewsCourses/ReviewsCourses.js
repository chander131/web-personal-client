import React from 'react'
import { Row, Col, Card, Avatar } from 'antd';

import AvatarPerson from '../../../assets/img/png/avatar.png';

import './ReviewsCourses.scss';

export default function ReviewsCourses() {
    return (
        <Row className='reviews-courses'>
            <Row>
                <Col lg={4} />
                <Col lg={16} className='reviews-courses__title'>
                    <h2>
                        Forma parte de los +35 mil estudiantes que estan aprendiendo con mis
                        cursos
                    </h2>
                </Col>
                <Col lg={4} />
            </Row>

            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row className='row-cards'>
                        <Col md={8}>
                            <CardReview
                                name='Carlos Lopez'
                                subtitle='Alumno de Udemy'
                                avatar={AvatarPerson}
                                review='Texto aleatorio para rellenar la descripcion que se esta pidiendo :)'
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Michael Pepper'
                                subtitle='Alumno de Udemy'
                                avatar={AvatarPerson}
                                review='Texto aleatorio para rellenar la descripcion que se esta pidiendo :)'
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Juan Mendez'
                                subtitle='Alumno de Udemy'
                                avatar={AvatarPerson}
                                review='Texto aleatorio para rellenar la descripcion que se esta pidiendo :)'
                            />
                        </Col>
                    </Row>
                    <Row className='row-cards'>
                        <Col md={8}>
                            <CardReview
                                name='Sandra Maria'
                                subtitle='Alumno de Udemy'
                                avatar={AvatarPerson}
                                review='Texto aleatorio para rellenar la descripcion que se esta pidiendo :)'
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Tomas Edison'
                                subtitle='Alumno de Udemy'
                                avatar={AvatarPerson}
                                review='Texto aleatorio para rellenar la descripcion que se esta pidiendo :)'
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name='Miguel Perez'
                                subtitle='Alumno de Udemy'
                                avatar={AvatarPerson}
                                review='Texto aleatorio para rellenar la descripcion que se esta pidiendo :)'
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
            </Row>
        </Row>
    )
}

function CardReview(props) {
    const { name, subtitle, avatar, review } = props;
    const { Meta } = Card;

    return (
        <Card className='reviews-courses__card'>
            <p>{review}</p>
            <Meta
                avatar={<Avatar src={avatar} />}
                title={name}
                description={subtitle}
            />
        </Card>
    );
}
