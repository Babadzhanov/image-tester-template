import * as React from 'react';
import { IS_MOBILE } from '../../../config';


export interface ButtonProps {
    onClick: (e: any) => void;
    className?: string;
}

export const Button: React.SFC<ButtonProps> = (props) => {
    let cls = props.className || "";
    return (
        <div className={"button " + cls} onClick={props.onClick} >
            <div className="button__label">
                {props.children}
            </div>
        </div>
    )
}


export interface LinkButtonProps {
    className?: string;
    href: string;
}

function redirectTo(e: React.SyntheticEvent<any>) {
    if (IS_MOBILE) {
        let el: HTMLAnchorElement = e.currentTarget as HTMLAnchorElement;

        window.location.href = el.href;
    }
}

export const LinkButton: React.SFC<LinkButtonProps> = (props) => {
    let cls = props.className || "";
    // {props.label}
    return (
        <a href={props.href || ""} className={"button " + cls} onTouchStart={redirectTo}>
            <div className="button__label">
                {props.children}
            </div>
        </a>
    )
}

