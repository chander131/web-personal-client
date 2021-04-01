import React from 'react'

import AcademyLogo from '../../../../assets/img/png/academy-logo.png';

import './PresentationCourses.scss';

export default function PresentationCourses() {
    return (
        <div className='presentation-courses'>
            <img
                src={AcademyLogo}
                alt='Cursos de Daniel Alexander Elias'
            />
            <p>
                En Daniel Elias Academy vas a encontrar los mejores cursos online de
                desarrollo web en Español. Unete a nosotros y empieza tu camino como
                Desarrollador Web o desarrollador de CMS. Sinceramente, estos cursos es el
                tipo de contenido que a mi me hubiera gustado encontrar cuando empece en
                el mundo del desarrollo web profesional.
            </p>
            <p>
                ¡¡¡Hechales un vistazo y aprovecha las ofertas!!!
            </p>
        </div>
    )
}
