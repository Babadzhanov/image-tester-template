import * as React from 'react';
export interface DialogProps {
    /**
     * Function to be called when dialog is closed
     */
    close?: () => void;

    /**
     * Component parent element classname
     */
    className?: string;

    /**
     * Position of the dialog box
     */
    position?: "top" | "bottom" | "left" | "right" | "middle";

    /**
     * Sets the padding between the dialog box and the dialog content
     */
    spacing?: "small" | "medium" | "large";

    /**
     * Height of the dialog box
     */
    wrapHeight?: "default" | "full-height" | "small-height" | "medium-height" | "large-height";

    /**
     * Width of the dialog box
     */
    wrapWidth?: "default" | "full-width" | "small-width" | "medium-width" | "large-width";

    /**
     * Backdrop background color
     * Use only in stories
     */
    backdropColor?: string;

    /**
     * Dialog box background color
     * Use only in stories
     */
    dialogColor?: string;

    animateIn?: string;

    animateOut?: string;
}

export interface DialogState {
}

export class Dialog extends React.Component<DialogProps, DialogState>{
    backdropEl: HTMLDivElement;
    contentWrapperEl: HTMLDivElement;

    constructor(props: DialogProps) {
        super(props);
    }

    private static defaultProps: Partial<DialogProps> = {
        className: "",
        position: "middle",
        close: () => { },
        spacing: "medium",
        wrapHeight: "default",
        wrapWidth: "default",
        backdropColor: null,
        dialogColor: null,
        animateIn: "fadeIn",
        animateOut: "fadeOut"
    }

    close = (ev?: React.SyntheticEvent<any>) => {
        return new Promise((res, rej) => {
            this.animteExit();

            setTimeout(() => {
                if (ev) {
                    rej(new Error("dialog rejected"))
                } else {
                    res(true);
                }

            }, 700)
        })
    }

    animteExit = () => {
        this.backdropEl.classList.remove("animated", "fadeIn");
        this.contentWrapperEl.classList.remove("animated", this.props.animateIn);

        this.backdropEl.classList.add("animated", "fadeOut");
        this.contentWrapperEl.classList.add("animated", this.props.animateOut);
    }

    render() {
        let clz = this.props.className;
        let pos = "dialog--" + this.props.position;
        let spacing = "dialog--spacing-" + this.props.spacing;
        let wrapHeight = "dialog--" + this.props.wrapHeight;
        let wrapWidth = "dialog--" + this.props.wrapWidth;
        return (
            <div className={`dialog ${clz} ${pos} ${spacing} ${wrapHeight} ${wrapWidth}`}>
                <div className="dialog__backdrop animated speed-5 fadeIn"
                    onClick={this.props.close}
                    id="DialogBackdrop"
                    style={{
                        backgroundColor: this.props.backdropColor
                    }}
                    ref={e => this.backdropEl = e}></div>

                <div className={`dialog__wrapper animated speed-5 ${this.props.animateIn}`}
                    style={{
                        backgroundColor: this.props.dialogColor
                    }}
                    ref={e => this.contentWrapperEl = e}>
                    <div className="dialog__close-button"
                        id="DialogCloseButton"
                        onClick={this.props.close}>
                        <i className="icon-close"></i>
                    </div>
                    <main className="dialog__content">
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }
}

export interface DialogNormalLayoutProps {
    className?: string;
}

export const DialogNormalLayout: React.SFC<DialogNormalLayoutProps> = (props) => {
    let cls = props.className || "";
    return (
        <div className={"dialog-layout container-fluid " + cls}>
            {props.children}
        </div>
    )
}
