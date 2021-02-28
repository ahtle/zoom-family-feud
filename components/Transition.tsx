import React from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
    in: boolean,
    children: React.ReactNode,
}

const defaultStyle = {
    transition: 'opacity 500ms ease-in-out',
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

const Fade = (props: Props) => (
    <CSSTransition
        in={props.in}
        timeout={500}
        classNames='fade'
        unmountOnExit
    >
        {props.children}
    </CSSTransition>
);

export default Fade;