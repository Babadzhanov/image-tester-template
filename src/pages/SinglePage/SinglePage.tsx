import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import { configureAnchors, goToAnchor, removeHash } from 'react-scrollable-anchor';

import { IStoreState } from '../../_reducers';
import { iData, iNavData, Dictionary } from '../../models/models';
import { DP } from '../../constants';
import { SHOW_MENU_DIALOG } from '../../components/ui/Dialog/Utils';
import Template from '../../components/ui/Template/Template';

export interface SinglePageProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    deeplink: string;
    data: Dictionary<iData>;
    navData: iNavData[];
}

const INIT_STATE: SinglePageState = {};

export interface SinglePageState {}

export class SinglePage extends React.Component<SinglePageProps, SinglePageState> {
    constructor(props: SinglePageProps) {
        super(props);
        this.state = INIT_STATE;
    }

    componentDidMount() {
        configureAnchors({ offset: -100, scrollDuration: 600 });
    }

    scrollToAnchor = (id: string) => {
        if (id !== this.props.match.params.key) {
            goToAnchor(id, true);
        } else {
            //added this to scroll to top of section
            removeHash();
            goToAnchor(id, true);
        }

        if (DP.dialogEl) {
            DP.hide();
        }
    };

    openBurgerMenu = () => {
        SHOW_MENU_DIALOG(this.props.navData, this.props.match.params.key, this.scrollToAnchor);
    };

    render() {
        const { props, state } = this;
        const cls = this.props.className || '';

        return (
            <div className={'single-page ' + cls}>
                <Template />
            </div>
        );
    }
}

const mapStateToProps = (state: IStoreState, ownProps): Partial<SinglePageProps> => {
    return {
        deeplink: state.app.deeplinkHtml,
        data: state.app.data,
        navData: state.app.navData,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SinglePage);
