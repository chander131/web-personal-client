import React from 'react'

import SocialLinks from '../../SocialLinks';

import LogoWhite from '../../../../assets/img/png/logo-white.png';

import './MyInfo.scss';

export default function MyInfo() {
    return (
        <div className='my-info'>
            <img src={LogoWhite} alt='Daniel Alexander Elias' />
            <h4>
                Entra en el mundo del desarrollo web, disfruta creando proyectos de todo tipo, deja que tu imaginacion fluya y crea verdaderas maravillas!!!
            </h4>
            <SocialLinks />
        </div>
    )
}
