import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap'

class ListView extends Component {

    render() {
        return (
            <div className="listview">
                <div className="input-group">
                    <span className="input-group-addon" aria-label="">Filter</span>
                    <input type="text" className="form-control" role="search" tabIndex={0} autoFocus={true} placeholder="Neighborhood Shopping"
                           onChange={(e) => this.props.onFilter(e.target.value)}>
                    </input>
                </div>
                <ListGroup role="menu">
                    {
                        this.props.places.map(item =>
                            <ListGroupItem key={item.venue.id}
                                           role="menuitem"
                                           onClick={() => this.props.onPlaceSelect(item.venue.id)}>
                                {item.venue.name}
                            </ListGroupItem>)
                    }
                </ListGroup>
            </div>
        );
    }

}

export default ListView;