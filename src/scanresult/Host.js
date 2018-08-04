import React from 'react';

class Host extends React.Component {

    explodeListToListItems(list) {
        if (!list) {
            return null
        }
        return list.map(item => <li className="list-group-item" key={item}>{item}</li>)
    }

    render() {
        return (
            <section>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div class="card-header">Addresses</div>
                            <ul className="list-group list-group-flush">
                                {this.explodeListToListItems(this.props.addresses)}
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                                <div className="card-header">Host names</div>
                                <ul className="list-group list-group-flush">
                                    {this.explodeListToListItems(this.props.hosts)}
                                </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Host;