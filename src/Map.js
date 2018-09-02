import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import * as Data from './Data';

export class MapContainer extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        selectedMarker: '',
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        markerObjects: []
      }

      this.onMarkerMounted = element => {
        this.setState(prevState => ({
          markerObjects: [...prevState.markerObjects, element.marker]
        }))
      };

      this.getMarker = this.getMarker.bind(this);
      this.getMarkerObject = this.getMarkerObject.bind(this);
    }

    getMarker(id){
      let filteredMarkers = Data.markers.filter((marker) => {
        return marker.id === Number(id);
      });

      return (filteredMarkers === undefined || filteredMarkers.length === 0 ? undefined : filteredMarkers[0]);
    }

    getMarkerObject(name){
      let filteredMarkers = this.state.markerObjects.filter((marker) => {
        return marker.name === name;
      });

      return (filteredMarkers === undefined || filteredMarkers.length === 0 ? undefined : filteredMarkers[0]);
    }

    onMarkerClick = (props, marker, e) => {
      var currentMarker = this.getMarker(marker.id);
      var address = '';

      this.getFourSquareVenueDetails(currentMarker.foursquareid)
      .then(item => {
        var venue = item.response.venue;
        address = venue.location.address;
      })
      .catch(error => {
        address = Data.addressNotAvailableMessage;
      })
      .finally(() => {
        this.setState({
          selectedPlace: {name: props.name, lat: currentMarker.lat, lng: currentMarker.lng, address: address},
          activeMarker: marker,
          selectedMarker: currentMarker.id,
          showingInfoWindow: true
        });
      });
    };

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null,
          selectedMarker: 0,
        })
      }
    };

    componentWillReceiveProps(props){
      var currentMarker = this.getMarker(props.selectedMarker);
      var currentMarkerObject = this.getMarkerObject(currentMarker.name);
      var address = '';

      this.getFourSquareVenueDetails(currentMarker.foursquareid)
      .then(item => {
        var venue = item.response.venue;
        address = venue.location.address;
      })
      .catch(error => {
        address = Data.addressNotAvailableMessage;
      })
      .finally(() => {
        this.setState({
          selectedMarker: currentMarker.id,
          selectedPlace: {name: currentMarker.name, lat: currentMarker.lat, lng: currentMarker.lng, address: address},
          activeMarker: currentMarkerObject,
          showingInfoWindow: true
        });
      });
    }

    getFourSquareVenueDetails(venueID){
      return fetch('https://api.foursquare.com/v2/venues/' + venueID + '?client_id=4LAFMCX0K4YV1VVJHPOIVDJKB0QHIZ2AFC1UHMBLN0H3FXIL&client_secret=CYDR4WDTUW4WQ0XG0ZDYTNH0GH4A5YAI0BRUBVVQRAYA5HZ5&v=20180725')
      .then(function(response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .catch(function(error) {
          return Promise.reject({
      				message: error
      			});
        });
    }

    render() {
      return (
      <Map  google={this.props.google} ref="map"
            style={{width: '100%', height: '100%', position: 'relative'}}
            className={'map'}
          initialCenter={{
            lat: 47.6051,
            lng: -122.1655
          }}
          zoom={13}
          onClick={this.onMapClicked}>

        {Data.markers.map((item, i) =>
          <Marker ref={this.onMarkerMounted}
                  onClick={this.onMarkerClick}
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  name={item.name}
                  position={{lat: item.lat, lng: item.lng}}
                  animation={(this.state.selectedMarker === item.id) ? this.props.google.maps.Animation.DROP : null} />
        )}

        <InfoWindow
          position={{lat: parseFloat(this.state.selectedPlace.lat), lng: parseFloat(this.state.selectedPlace.lng)}}
          pixelOffset={{height: -40, width: 0}}
          visible={this.state.showingInfoWindow}>
            <div className="infowindow">
              <p><b>{this.state.selectedPlace.name}</b></p>
              <p>{this.state.selectedPlace.address}</p>
            </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDbZWOCkFfYw6UOJE6OTy1B87GxwbhWvH8'
})(MapContainer)
