import * as React from 'react';
import { Translation } from '../../../models/models';
import { SHOW_INFO_DIALOG, SHOW_EMBED_DIALOG } from '../Dialog/Utils';



export interface SocialButtonsProps {

}

export interface SocialButtonsState {
    twitterLink: string;
    facebookLink: string;
}

export class SocialButtons extends React.Component<SocialButtonsProps, SocialButtonsState>{
    constructor(props: SocialButtonsProps) {
        super(props);
        this.state = {
            twitterLink: "",
            facebookLink: ""
        }
    }

    getTwitterText = () => {
        var metas = document.getElementsByTagName('meta');

        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute("name") == "twitter:description") {
                return metas[i].getAttribute("content");
            }
        }

        return "";
    }


    componentDidMount() {
        let tw = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.getTwitterText()),
            fb = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL);

        this.setState({ twitterLink: tw, facebookLink: fb });
        this.forceUpdate();
    }

    onEmbedClick = () => {
        SHOW_EMBED_DIALOG()
    }

    onInfoClick = () => {
        SHOW_INFO_DIALOG()
    }

    render() {
        let props = this.props,
            state = this.state;

        return (
            <div className="social-buttons-container">
                <a className="share-button facebook hide-on-embed inverted" href={state.facebookLink} target="_blank">
                    <i className="icon-facebook"></i>
                </a>
                <a className="share-button twitter hide-on-embed inverted" href={state.twitterLink} target="_blank">
                    <i className="icon-twitter"></i>
                </a>
                <div className="share-button embed hide-on-embed inverted" onClick={this.onEmbedClick}>
                    <i className="icon-embed"></i>
                </div>
                <div className="share-button info" onClick={this.onInfoClick}>
                    <i className="icon-info"></i>
                </div>
            </div>
        )
    }
}