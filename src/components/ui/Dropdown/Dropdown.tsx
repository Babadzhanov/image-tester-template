import * as React from 'react';

import { iValue } from '../../../models/models';

interface DropdownProps {
    className?: string;
    /**
     * The dropdown component expects an array of key value pairs
     */
    items: iValue[];
    /**
     * A custom function that is run when an option is selected
     */
    onChange?: (item?) => void;
    /**
     * Label is shown if prop is passed
     */
    label?: React.ReactNode;
    /**
     * If passed, this is shown instead of the default arrow
     */
    customArrow?: React.ReactNode;
}

interface DropdownState {
    optionSelected: iValue;
    isListExpanded: boolean;
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
    el: HTMLDivElement;

    constructor(props: DropdownProps) {
        super(props);
        this.state = {
            optionSelected: null,
            isListExpanded: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick, false);
    }

    handleOutsideClick = (e) => {
        if (this.el.contains(e.target)) {
            return
        }
        this.setState({ isListExpanded: false })
    }

    onItemSelect = (item: iValue) => {
        if (this.props.onChange) {
            this.props.onChange();
        }
        this.setState({
            optionSelected: item,
            isListExpanded: false
        })
    }

    render() {
        const { props, state } = this,
            cls = props.className || "";

        return (
            <div className="dropdown__wrapper" ref={el => this.el = el}>
                {props.label && (
                    <label className="dropdown__label" id="dropdown-label">
                        {props.label}
                    </label>
                )}
                <ul className="dropdown__list">
                    <li
                        className="dropdown__list-item dropdown__list-item--selected"
                        onClick={() => this.setState(state => ({ isListExpanded: !state.isListExpanded }))}
                        role="button"
                        aria-labelledby="dropdown-label"
                        aria-expanded={state.isListExpanded}
                        tabIndex={0}
                    >
                        {state.optionSelected ? state.optionSelected.value : "Choose"}
                        <div className={`dropdown__arrow ${state.isListExpanded ? "dropdown__arrow--open" : ""}`}>
                            {props.customArrow || <DropdownArrow />}
                        </div>
                    </li>
                    {state.isListExpanded && (
                        <ul className="dropdown__options" role="list">
                            {props.items.map((item, idx) => (
                                <li key={item.key}
                                    className="dropdown__list-item"
                                    id={`option-${idx + 1}`}
                                    tabIndex={0}
                                    role="listitem"
                                    onClick={() => this.onItemSelect(item)}
                                    onKeyDown={(e) => e.keyCode === 13 ? this.onItemSelect(item) : null}
                                >
                                    {item.value}
                                </li>
                            ))}
                        </ul>
                    )}
                </ul>
            </div>
        );
    }
}

const DropdownArrow = (props) => (
    <svg
        width="10"
        height="5"
        viewBox="0 0 10 5"
        fillRule="evenodd"
    >
        <title>Open drop down</title>
        <path d="M10 0L5 5 0 0z"></path>
    </svg>
)
