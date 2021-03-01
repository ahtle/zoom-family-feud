import './Transition.module.css';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
    in: boolean,
    children: React.ReactNode,
}

const Fade = (props: Props) => (
    <CSSTransition
        in={props.in}
        exit={false}
        timeout={500}
        classNames='fade'
        unmountOnExit
    >
        {props.children}
    </CSSTransition>
);

export default Fade;