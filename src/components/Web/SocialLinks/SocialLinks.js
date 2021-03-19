import React from 'react';
import { ReactComponent as YouTubeIcon } from '../../../assets/img/svg/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/img/svg/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/img/svg/facebook.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/img/svg/linkedin.svg';

import './SocialLinks.scss';

export default function SocialLinks(props) {

    return (
        <div className='social-links'>
            <a
                href='https://www.youtube.com/channel/UCxuhSQ2c9mi1YcmFLPCBFwA?sub_confirmation=1'
                className='youtube'
                target='_black'
                rel='noopener noreferrer'
            >
                <YouTubeIcon />
            </a>
            <a
                href='https://twitter.com/_danielelias131'
                className='twitter'
                target='_black'
                rel='noopener noreferrer'
            >
                <TwitterIcon />
            </a>
            <a
                href='https://www.facebook.com/daniel.elias131'
                className='facebook'
                target='_black'
                rel='noopener noreferrer'
            >
                <FacebookIcon />
            </a>
            <a
                href='https://www.linkedin.com/in/daniel-alexander-el%C3%ADas-ard%C3%B3n-9a02aa195/'
                className='linkedin'
                target='_black'
                rel='noopener noreferrer'
            >
                <LinkedinIcon />
            </a>
        </div>
    );
}