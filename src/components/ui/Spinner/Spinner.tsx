import * as React from 'react'


export interface SpinnerProps {
    className?: string;
    size?: "small" | "medium" | "large";
    type?: "double-dot-in" | "dot-in" | "double-dot-stick" | "dot-stick" |
    "double-dot-out" | "dot-out" | "wave-out" | "wave-in" | "huge-wave-out" | "huge-wave-in" |
    "double-section" | "double-section-in" | "double-section-out" | "double-section-far" | "section-far";
    animationDuration?: number;

}

export function Spinner(props: SpinnerProps) {
    let cls = props.className || "";
    let size = "spinner--" + (props.size || "medium");
    let animationDuration: string = props.animationDuration + "s" || "1s";
    let type = "spinner-" + (props.type || "double-section");
    return (
        <div className={`spinner  ${cls} ${size}`}>
            <div className={`${type} speed-3`}
                style={{
                    animationDuration: animationDuration
                }}
            ></div>
        </div>
    )
}