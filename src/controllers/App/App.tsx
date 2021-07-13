import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, } from 'react-router-dom';
import * as throttle from 'lodash.throttle';

import { ACTIONS } from './Actions';
import { AppProps, inAppState, inAppInitialState } from './StateAndProps';
import Splash from '../../pages/Splash/Splash';
import SinglePage from '../../pages/SinglePage/SinglePage';
import DATA_SERVICE from '../../services/DataService';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import MobLandScreen from '../../components/ui/MobLandScreen/MobLandScreen';
import { IS_MOB_LANDSCAPE } from '../../config';

export const STATE_KEY = 'app';

class App extends React.Component<AppProps, inAppState>{
    constructor(props: AppProps) {
        super(props);
        this.state = inAppInitialState;
    }

    componentDidMount() {
        /*******************************************************
        * Grabs Deeplink element and stores it in Redux state as string
        ********************************************************/
        const el = document.getElementById('SiteDeeplink');
        (el.firstElementChild as HTMLElement).style.width = null;
        this.props.getDeeplinkEl(el.outerHTML);
        el.parentNode.removeChild(el);

        /*******************************************************
        * Update Firebase credentials and uncomment to load data
        ********************************************************/
        // if (DATA_SERVICE.isDataLoaded) {

        //     this.props.loadData(DATA_SERVICE.getData());
        // } else {
        //     DATA_SERVICE.load().then((e) => {
        //         this.props.loadData(e);
        //     })
        // }

        window.addEventListener('resize', throttle(this.resize, 300));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', throttle(this.resize, 300));
    }

    resize = () => {
        this.forceUpdate();
    };

    render() {
        // if (!DATA_SERVICE.isDataLoaded) {
        //     return <Spinner />
        // }
        if (IS_MOB_LANDSCAPE()) {
            return <MobLandScreen />;
        }
        return (
            <div className={`app`}>
                <Router hashType="noslash">
                    <Switch>
                        <Route exact path="/" component={Splash} />
                        <Route exact path="/:key?" component={SinglePage} />
                    </Switch>
                </Router>
            </div>
        );
    }
};

function mapStateToProps(state: any, ownProps) {
    return {
        appState: state.app
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ loadData: ACTIONS.DATA_LOADED, getDeeplinkEl: ACTIONS.GET_DEEPLINK }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
