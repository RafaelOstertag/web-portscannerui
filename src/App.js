import React, { Component } from "react";
import ScanTarget from "./scantarget/ScanTarget";
import ScanResult from "./scanresult/ScanResult";
import Error from "./error/Error";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanFailure: null
        };

        this.handleScanSuccess = this.handleScanSuccess.bind(this);
        this.handleScanFailure = this.handleScanFailure.bind(this);
    }

    handleScanSuccess(result) {
        this.setState({ scanResult: result, scanFailure: null });
    }

    handleScanFailure(jqXHR, errorTextStatus, error) {
        let errorMessage = '"Unknown event"';
        if (jqXHR.responseJSON) {
            errorMessage = jqXHR.responseJSON.reason;
        }
        this.setState({ scanResult: null, scanFailure: errorMessage });
    }

    render() {
        return (
            <section>
                <ScanTarget
                    successHandler={this.handleScanSuccess}
                    failureHandler={this.handleScanFailure}
                />
                {this.state.scanResult && (
                    <ScanResult scanResult={this.state.scanResult} />
                )}
                {this.state.scanFailure && (
                    <Error errorMessage={this.state.scanFailure} />
                )}
            </section>
        );
    }
}

export default App;
