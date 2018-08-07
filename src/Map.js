import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//import Marker from "./Marker";
import './App.css'

var markers = [{id: 1, name: 'Downtown park', lat: 47.6127, lng: -122.2042},
               {id: 2, name: 'Robinswood park', lat:47.587, lng: -122.1391},
               {id: 3, name: 'Crossroads park', lat:47.6175, lng: -122.1229},
               {id: 4, name: 'Lake Hills park', lat:47.5987, lng: -122.1222},
               {id: 5, name: 'Bellevue Botanical Garden', lat:47.6081, lng: -122.1785}];

export class MapContainer extends React.Component {
  state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };

    render() {
      return (

      <Map  google={this.props.google}
      style={{width: '100%', height: '100%', position: 'relative'}}

          initialCenter={{
            lat: 47.610378,
            lng: -122.200676
          }}
          zoom={15}
          onClick={this.onMapClicked}>

        {markers.map((item, i) =>
          <Marker onClick={this.onMarkerClick}
          name={item.name}
          position={{lat: item.lat, lng: item.lng}} />
        )}

        <InfoWindow  marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>

        <InfoWindow position={{ lat: 47.610378,
        lng: -122.200676}} visible>
         <small>
           Click on any of the markers to display an additional info.
         </small>
       </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDbZWOCkFfYw6UOJE6OTy1B87GxwbhWvH8'
})(MapContainer)
