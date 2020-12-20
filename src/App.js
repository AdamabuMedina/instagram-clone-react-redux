import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ImagesPage from "./components/images/ImagesPage";
import ImageModal from "./components/images/ImageModal";
import NotFoundPage from "./components/images/NotFoundPage";
import Header from "./components/header/Header";

class App extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    return (
      <React.Fragment>
        <ToastContainer />
        <Header />
        <main className="container py-5">
          <Switch location={isModal ? this.previousLocation : location}>
            <Route path="/" exact component={ImagesPage} />
            <Route path="/not-found" component={NotFoundPage} />
            <Redirect to="/not-found" />
          </Switch>
          {isModal ? <Route path="/image/:id" component={ImageModal} /> : null}
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
