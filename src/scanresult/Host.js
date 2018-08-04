import React from 'react';

class Host extends React.Component {

    explodeListToListItems(list) {
        if (!list) {
            return null
        }
        return list.map(item => <li key={item}>{item}</li>)
    }

    render() {
        return (
            <section>
                <h3>Host Information</h3>
                <div className="row">
                    <div className="col-sm-4">State</div>
                    <div className="col-sm-8">{this.props.state}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Addresses</div>
                    <ul className="col-sm-8">
                        {this.explodeListToListItems(this.props.addresses)}
                    </ul>
                </div>
                <div className="row">
                    <div className="col-sm-4">Host names</div>
                    <ul className="col-sm-8">
                        {this.explodeListToListItems(this.props.hosts)}
                    </ul>
                </div>
            </section>
        );
    }
}

export default Host;