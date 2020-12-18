import React, {Component} from "react";
import {ToastContainer} from "react-toastify";
import Header from "./components/header/Header";
import Images from "./components/pages/Images";
import PageNotFound from "./components/pages/PageNotFound";
import ImagesDetail from "./components/pages/ImagesDetail";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";

class App extends Component {
    previousLocation = this.props.location;

    componentWillUpdate(nextProps) {
        const {location} = this.props;
        if (
            nextProps.history.action !== "POP" &&
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location;
        }
    }

    render() {
        const {location} = this.props
        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        )
        return (
            <React.Fragment>
                <ToastContainer/>
                <Header/>
                <main className="container py-5">
                    <Switch location={isModal ? this.previousLocation : location}>
                        <Route path="/" exact component={Images}/>
                        <Route path="/not-found" component={PageNotFound}/>
                        <Redirect to="/not-found"/>
                    </Switch>
                    {isModal ? <Route path="/image/:id" component={ImagesDetail} /> : null}
                </main>
            </React.Fragment>
        )
    }
}

export default withRouter(App)
