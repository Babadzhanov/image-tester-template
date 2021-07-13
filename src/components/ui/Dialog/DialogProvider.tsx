
import { Dialog, DialogProps } from './Dialog';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class DialogProvider {
    el: HTMLElement;
    dialogEl: Dialog;
    constructor(el?: HTMLElement) {
        if (!el) {
            el = document.createElement('div');
            el.className = 'dialog-service-wrapper';
            document.querySelector('body').appendChild(el);
        }
        this.el = el;

    }

    show = (content: (resolve, reject) => React.ReactElement<any>, dialogProps?: DialogProps) => {
        this.el.classList.add("shown")
        return new Promise((resolve, reject) => {
            var props = {
                ...dialogProps,
                visible: true,
                close: () => { this.hide(resolve, reject) }
            };
            ReactDOM.render(
                <Dialog {...props}
                    ref={e => this.dialogEl = e}>
                    {content(resolve, reject)}
                </Dialog>,
                this.el)
        });
    }

    hide = (resolve?: any, reject?: any) => {
        this.dialogEl.close().then((res) => {
            if (res) {
                ReactDOM.unmountComponentAtNode(this.el);
                // this.el.classList.remove("shown")
                // this.el.innerHTML = "";
                resolve && resolve()
            }
        }, () => { })
    }
}
