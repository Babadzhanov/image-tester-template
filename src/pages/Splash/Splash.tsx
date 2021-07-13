import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IStoreState } from '../../_reducers';
import { Translation, iNavData } from '../../models/models';
import { RES_URL } from '../../config';
import I18n from '../../services/I18n';
import { LinkButton } from '../../components/ui/Button/Button';

export interface SplashProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    locale: Translation;
    deeplink: string;
    navData: iNavData[];
}

const INIT_STATE: SplashState = {

}

export interface SplashState {

}

export class Splash extends React.Component<SplashProps, SplashState>{

    constructor(props: SplashProps) {
        super(props);
        this.state = INIT_STATE;
    }

    render() {
        const { props, state } = this;
        const cls = this.props.className || "";

        return (
            <div className={"splash " + cls}>
                <h1>Studio Generator</h1>
                <div className="splash__block splash__campaign-logo">
                    <img src={`${RES_URL}img/campaign-logo.png`} alt={I18n.t('campaignName')} />
                </div>
                <div className="splash__block splash__copy">
                    <p>{I18n.t('splashIntro')}</p>
                </div>
                <LinkButton className="splash__block splash__button" href={`/`} />
            </div>
        )
    }
}

const mapStateToProps = (state: IStoreState, ownProps): Partial<SplashProps> => {
    return {
        locale: state.app.locale,
        deeplink: state.app.deeplinkHtml,
        navData: state.app.navData,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
