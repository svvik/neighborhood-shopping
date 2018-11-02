import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"

const GMap = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={props.location}>
        {props.places.map(place => place.venue)
            .map(place => (
                <Marker
                    key={place.id}
                    name={place.name}
                    position={{lat: place.location.lat, lng: place.location.lng}}
                    title={place.name}
                    onClick={() => props.makerClick(place.id)}
                    animation={2}
                    visible={props.isVisible(place.id)}>
                    {
                        props.isInfoVisible(place.id) && (
                            <InfoWindow>
                                <div className='info-window'>
                                    <h4>{place.name}</h4>
                                    <span>Location: {place.location.address}</span>
                                </div>
                            </InfoWindow>
                        )
                    }
                </Marker>
            ))}
    </GoogleMap>
))

class Map extends Component {

    visible(id, vPlaces) {
        for (const vpl of vPlaces) {
            if (vpl.venue.id == id) return true;
        }
        return false;
    }

    componentDidCatch(error, info) {
        this.props.onErrorAction();
    }

    gm_authFailure() {
        console.log("Authentication failed");
        document.getElementById('map').innerHTML = "Authentication failed";
    }

    render() {
        return <GMap
            location={this.props.location}
            isVisible={(id) => {
                return this.visible(id, this.props.visiblePlaces)
            }}
            places={this.props.places}
            makerClick={this.props.onPlaceSelect}
            isInfoVisible={this.props.isInfoVisible}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyALDsIyMq2lob4RYYwMHS_Ou68iFVp7fLA&v=3.exp&libraries=geometry,drawing,places"
            // googleMapURL="https://maps.googleapis.com/maps/api/js?key=QWWQE&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div className='map-loading'/>}
            containerElement={<div className='map-container'/>}
            mapElement={<div className='map' role="application" aria-label="Map with locations"/>}
        />;
    }
}

export default Map;