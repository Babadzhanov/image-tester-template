import * as React from "react";


export interface ElementTooltipProps {
    /**
     * This is the element that is going to triger the tooltip to show
     */
    shownElement: JSX.Element | string;

    /**
     * Any addition class names to be added to the parent element
     */
    className?: string;

    /**
     * What triggers the too
     */
    triggeredOn: "click" | "hover";

    /**
     * Custom Funtion to call on toggle
     */
    onToggle?: () => void;

}

export interface ElementTooltipState {
    contentVisible: boolean;
}


export class ElementTooltip extends React.Component<ElementTooltipProps, ElementTooltipState>{
    contentEl: HTMLDivElement;
    constructor(props: ElementTooltipProps) {
        super(props);
        this.state = { contentVisible: false }
    }

    componentDidUpdate(prevProps: ElementTooltipProps, prevState: ElementTooltipState) {
        if (this.state.contentVisible) {
            setTimeout(() => {
                // jQuery(this.contentEl).attr("tabindex",-1).focus()
                if (this.contentEl) {
                    this.contentEl.setAttribute("tabIndex", "-1");
                    this.contentEl.focus();
                }
            }, 1500)
        }
    }

    showContent = () => {
        this.setState({ contentVisible: true });
    }

    hideContent = () => {
        this.setState({ contentVisible: false });
    }

    toggleContentView = () => {
        this.state.contentVisible ? this.hideContent() : this.showContent();
        this.props.onToggle && this.props.onToggle();
    }
    blurContent = () => {
        setTimeout(() => {
            this.hideContent()
        }, 200)
    }

    render() {
        let props = this.props,
            state = this.state;
        return (
            <div className={"element-tooltip-container trigger-on-" + props.triggeredOn + " " + props.className}
                ref={e => this.contentEl = e}
                onBlur={() => {

                    this.blurContent()

                }}
                data-visible={state.contentVisible}>
                <div className="shown-element-container"
                    onClick={this.toggleContentView}>
                    {props.shownElement}
                </div>
                <div className="element-tooltip-content-container z-depth-1"
                    onClick={() => {
                        this.blurContent()
                    }}
                >
                    {props.children}
                </div>
            </div>
        )
    }
}