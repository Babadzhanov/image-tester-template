import * as React from 'react';


export interface IconProps {
    className?: string;
    onClick?: () => void;
}

export interface IconState {

}

export const Icon: React.SFC<IconProps> = (props) => {
    let cls = props.className || "";
    return (
        <div className={"icon " + cls} onClick={props.onClick && props.onClick}>
            {props.children}
        </div>
    )
}
