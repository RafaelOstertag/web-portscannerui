import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery'

const nmapProxyBaseUrl = "http://gizmo.kruemel.home:40002/v1/scan/"

class ScanTarget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            host: '',
            ports: '',
            scanRunning: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.requestUrl = this.requestUrl.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({scanRunning: true})

        let url = this.requestUrl()
        $
            .get(url)
            .done(scanResult => this.props.success && this.props.success(scanResult))
            .fail((jqXHR,errorTextStatus, error) => this.props.failure && this.props.failure(jqXHR, errorTextStatus, error))
            .always( () => {
                this.setState({scanRunning: false})})
    }

    requestUrl() {
        let url = nmapProxyBaseUrl + encodeURIComponent(this.state.host)
        let queryParams = $.param({ports: this.state.ports})

        return url + "?" + queryParams
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        })
    }

    render() {
        return (<form onSubmit={this.handleSubmit}>
            <section className="form-group">
                <label>Host</label>
                <input className="form-control" type="text" value={this.state.host} placeholder="Host to scan" name="host" onChange={this.handleChange}/>
                <small className="form-text text-muted">The host name or IP address to scan</small>
            </section>
            <section className="form-group">
                <label>Ports</label>
                <input className="form-control" type="text" value={this.state.ports} placeholder="Ports to test" name="ports" onChange={this.handleChange}/>
                <small className="form-text text-muted">Enter port(s) to scan or leave empty. Multiple ports separated by comma. Port ranges can be specfied with dash. Example: 80,443,8080-8090</small>
            </section>
                { this.state.scanRunning ? 
                (<button className="btn btn-primary" disabled>
                <FontAwesomeIcon icon={faSpinner} spin /> Scanning
                </button>)
                : 
                <input className="btn btn-primary" type="submit" value="Scan!"/>
                }
        </form>);
    }
}

export default ScanTarget;