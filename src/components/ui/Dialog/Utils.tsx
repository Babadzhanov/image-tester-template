import * as React from 'react';

import { DP } from '../../../constants';
import { EmbedCode } from '../EmbedCode/EmbedCode';
import { DialogProps } from './Dialog';
import { SCREEN_WIDTH, RES_URL } from '../../../config';
import I18n from '../../../services/I18n';
import { NavMenu } from '../NavMenu/NavMenu';
import { iNavData } from '../../../models/models';

export function SHOW_EMBED_DIALOG() {
    DP.show((res, rej) => {
        return (
            <EmbedComponent />
        )
    }, GET_DIALOG_OPTS())
}

export function SHOW_INFO_DIALOG() {
    DP.show((res, rej) => {
        return (
            <InfoComponent />
        )
    }, GET_DIALOG_OPTS())
}

export function SHOW_MENU_DIALOG(
    navData: iNavData[],
    currSection: string,
    handleClick: (key: string) => void
) {
    DP.show((res, rej) => {
        return (
            <>
                <div className="nav-menu__campaign-logo ">
                    <a href="/">
                        <img src={RES_URL + "img/campaign-logo.svg"} alt={I18n.t("altText")} />
                    </a>
                </div>
                <NavMenu
                    navData={navData}
                    currSection={currSection}
                    handleClick={handleClick}
                />
            </>
        )
    }, { ...GET_DIALOG_OPTS(), className: "dialog--nav-menu" })
}

const GET_DIALOG_OPTS = (): DialogProps => {
    if (SCREEN_WIDTH.IS_SMALL()) {
        return {
            wrapHeight: "full-height",
            wrapWidth: 'full-width'
        }
    } else {
        return {
            wrapHeight: "large-height",
            wrapWidth: "full-width",
            position: "bottom"
        }
    }
}


export const InfoComponent: React.SFC<any> = (props) => {
    let infoHtml = { __html: I18n.t("informationCopy") }
    return (
        <div className="info-container container">
            <div className="row">
                <div className="col s12">
                    <h1 className="center dialog__header">{I18n.t("infoTitle")}</h1>
                </div>
            </div>
            <div className="row">
                <div className="center col s12 m12 " dangerouslySetInnerHTML={infoHtml}></div>
            </div>
        </div>
    )
}

export const EmbedComponent: React.SFC<any> = (props) => {
    return (
        <div className="embed-container container">

            <div className="row">
                <div className="col s12">
                    <h1 className="dialog__header center">{I18n.t("embedCopyTitle")}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <EmbedCode
                        height={600} />
                </div>
            </div>

        </div>
    )
}
