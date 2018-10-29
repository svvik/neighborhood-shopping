import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap'

class ListView extends Component {

    render() {
        return (
            <div className="listview">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">Filter</span>
                    <input type="text" className="form-control" placeholder="Neighborhood Shopping"
                           onChange={(e) => this.props.onFilter(e.target.value)}>
                    </input>
                </div>
                <ListGroup>
                    {
                        this.props.places.map(item => item.venue)
                            .map(item => <ListGroupItem key={item.id} onClick={() => this.props.onPlaceSelect(item.id)}>{item.name}</ListGroupItem>)
                    }
                </ListGroup>
            </div>
        );
    }

}

export default ListView;