import * as React from 'react';

export interface CollapseTextProps {
}

export interface CollapseTextState {
    isShown: boolean;
}

export class CollapseText extends React.Component<CollapseTextProps, CollapseTextState>{
    constructor(p: CollapseTextProps) {
        super(p);
        this.state = { isShown: false }
    }

    toggleText = () => {
        this.setState({ isShown: !this.state.isShown });
    }

    render() {
        let props = this.props,
            state = this.state;
        return (
            <div className="collapse-text">
                <div className="collapse-text__content"
                    data-visible={state.isShown}>
                    {this.props.children}
                </div>
                <div className="collapse-text__button"
                    onClick={this.toggleText}>
                    + <span>Read More</span>
                </div>
            </div>
        )
    }
}