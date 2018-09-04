import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import * as Data from './Data';

export class MapContainer extends React.Component {

    constructor(props) {
      super(props);

      //selectedMarker is the id of marker of interest on the maps
      //showingInfoWindow is a boolean flag to decide whether to display infoWindow or not
      //activeMarker is the object describing marker of interest (native google-maps-react object)
      //selectedPlace is the object describing selected marker (its name, latitude, longitude and address)
      //markerObjects is the collection of marker objects (native google-maps-react object collection)
      this.state = {
        selectedMarker: '',
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        markerObjects: []
      }

      //Capture markerObject collection of native marker objects for the map
      //Later we can use native marker objects when the user chooses to click on a marker from the search bar
      this.onMarkerMounted = element => {
        this.setState(prevState => ({
          markerObjects: [...prevState.markerObjects, element.marker]
        }))
      };

      this.getMarker = this.getMarker.bind(this);
      this.getMarkerObject = this.getMarkerObject.bind(this);
    }

    //Get marker by its id from the predefined data
    getMarker(id){
      let filteredMarkers = Data.markers.filter((marker) => {
        return marker.id === Number(id);
      });

      return (filteredMarkers === undefined || filteredMarkers.length === 0 ? undefined : filteredMarkers[0]);
    }

    //Get the native marker object based on its name
    //This is important when the user clicks on a marker from the search bar and we need to identify the right marker clicked
    //The assumption is that marker names are unique in the predefined data
    getMarkerObject(name){
      let filteredMarkers = this.state.markerObjects.filter((marker) => {
        return marker.name === name;
      });

      return (filteredMarkers === undefined || filteredMarkers.length === 0 ? undefined : filteredMarkers[0]);
    }

    //The user clicks on a marker on the map
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

    //Global function for Google Maps error handling
    gm_authFailure(){
        window.alert("Google Maps error!")
    }

    //Hide infoWindow in case the user simply clicks on the map
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null,
          selectedMarker: 0,
        })
      }
    };

    //Display appropriate error message when there's a problem with Google Maps
    componentDidMount(){
        window.gm_authFailure = this.gm_authFailure;
    }

    //The user clicks on a marker from the search bar
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

    //Get venue details for the selected marker from FourSquare
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
