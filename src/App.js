import React from 'react'
import Map from './Map'
import ListView from './ListView'
import * as FSQR from './Foursquare'
import escapeRegExp from 'escape-string-regexp'
import {Grid, Row, Col} from 'react-bootstrap'

class App extends React.Component {

    location = {
        lat: 41.8840886,
        lng: -87.6309299
    }

    state = {
        places: [],
        visiblePlaces: [],
        filter: '',
        openedPlace: null
    }

    componentDidMount() {
        FSQR.getItems(this.location, 'shopping')
            .then((items) => this.handleItems(items));
    }

    handleItems(items) {
        let receivedItems = [];
        let visibleItems = [];
        items.forEach(item => receivedItems.push(item))
        items.forEach(item => visibleItems.push(item))
        this.setState({places: receivedItems, visiblePlaces: visibleItems})
    }

    onFilter = (filter) => {
        this.handleFilter(filter)
    }

    isInfoVisible = (id) => {
        return this.state.openedPlace == id
    }

    onPlaceSelect = (id) => {
        this.setState({openedPlace: id})
    }

    handleFilter(filter) {
        let visiblePlaces = [];
        if (!filter || filter.length === 0) {
            this.state.places.forEach(item => visiblePlaces.push(item))
        } else {
            const regexp = new RegExp(escapeRegExp(filter), 'i')
            visiblePlaces = this.state.places.filter((item) => regexp.test(item.venue.name))
        }
        let openedPlace = this.state.openedPlace
        if (openedPlace != null) {
            let openedInList = false
            for (let i = 0; i < visiblePlaces.length; i++) {
                if (visiblePlaces[i].venue.id == openedPlace) {
                    openedInList = true;
                    break;
                }
            }
            if (!openedInList) {
                openedPlace = null;
            }
        }
        this.setState({visiblePlaces, filter, openedPlace})
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} xsPull={0} sm={9} smPush={3} >
                        <Map visiblePlaces={this.state.visiblePlaces}
                             places={this.state.places}
                             location={this.location}
                             onPlaceSelect={this.onPlaceSelect}
                             isInfoVisible={this.isInfoVisible}
                        />
                    </Col>
                    <Col xs={12} xsPush={0} sm={3} smPull={9}>
                        <ListView places={this.state.visiblePlaces}
                                  onFilter={this.onFilter}
                                  onPlaceSelect={this.onPlaceSelect}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default App;
