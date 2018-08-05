import React from "react";
import Host from "./Host.js";
import Ports from "./Ports.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimesCircle,
    faCheckCircle
} from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

class ScanResult extends React.Component {
    hostState(hostState) {
        if (hostState === "up") {
            return (
                <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="ml-3 text-success"
                />
            );
        }

        return (
            <FontAwesomeIcon
                icon={faTimesCircle}
                className="ml-3 text-danger"
            />
        );
    }

    render() {
        return (
            <section className="mt-3">
                <h2>
                    Scan Result {this.hostState(this.props.scanResult.state)}
                </h2>
                <Ports ports={this.props.scanResult.ports} />
                <Host
                    state={this.props.scanResult.state}
                    addresses={this.props.scanResult.addresses}
                    hosts={this.props.scanResult.hostnames}
                />
            </section>
        );
    }
}

ScanResult.propTypes = {
    scanResult: PropTypes.shape({
        state: PropTypes.string.isRequired,
        ports: PropTypes.array.isRequired,
        addresses: PropTypes.array.isRequired,
        hostnames: PropTypes.array.isRequired
    })
};

export default ScanResult;
